#![no_std]
use soroban_sdk::{contract, contracterror, contractimpl, contracttype, panic_with_error, symbol_short, Address, Env, String, Vec, Map};

#[contracterror]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Error {
    NotAuthorized = 1,
    ProjectNotFound = 2,
    InvalidArgument = 3,
    StringTooLong = 4,
}

// MVP: We keep human-readable fields but enforce strict length limits to control cost.
#[contracttype]
#[derive(Clone)]
pub struct Milestone {
    pub title: String,
    pub description: String,
    pub amount_budget: i128,
    pub completed: bool,
}

// MVP: Keep title/body on-chain for usability, with strict limits to avoid bloat.
#[contracttype]
#[derive(Clone)]
pub struct Update {
    pub title: String,
    pub body: String,
    pub timestamp: i64,
}

#[contracttype]
#[derive(Clone)]
pub struct Location {
    pub latitude: i32,
    pub longitude: i32,
    pub country: String,
    pub province: String,
    pub city: String,
}

#[contracttype]
#[derive(Clone)]
pub struct Project {
    pub id: u64,
    pub owner: Address,
    pub name: String,
    pub deadline_ts: i64,
    pub current_amount: i128,
    pub target_amount: i128,
    pub problem_statement: String,
    pub impact_area: String,
    pub location: Location,
    pub milestones: Map<u32, Milestone>,
    pub updates: Map<u32, Update>,
}

#[contracttype]
#[derive(Clone)]
pub struct Donation {
    pub seq: u64,
    pub project_id: u64,
    pub donor: Address,
    pub amount: i128,
    pub timestamp: i64,
}

#[contracttype]
#[derive(Clone)]
pub struct Stats {
    pub current_amount: i128,
    pub target_amount: i128,
    pub percent_bp: i128,
    pub donations_count: u64,
    pub milestones_completed: u32,
    pub milestones_total: u32,
    pub last_update_ts: i64,
}

// Typed storage keys to avoid ad-hoc tuples and enable clearer, future-proof layout
#[contracttype]
#[derive(Clone)]
enum DataKey {
    NextProj,
    Proj(u64),
    DonSeq(u64),
    Don(u64, u64),
    Imp(u64),
    Dpm(Address, u64),
}

fn read_next_project_id(e: &Env) -> u64 {
    e.storage().persistent().get::<_, u64>(&DataKey::NextProj).unwrap_or(0)
}
fn write_next_project_id(e: &Env, v: u64) {
    e.storage().persistent().set(&DataKey::NextProj, &v);
}

fn read_project_don_seq(e: &Env, project_id: u64) -> u64 {
    e.storage().persistent().get::<_, u64>(&DataKey::DonSeq(project_id)).unwrap_or(0)
}
fn write_project_don_seq(e: &Env, project_id: u64, v: u64) {
    e.storage().persistent().set(&DataKey::DonSeq(project_id), &v);
}

// Replaced ad-hoc tuple keys with DataKey enum
fn project_key(id: u64) -> DataKey { DataKey::Proj(id) }
fn donation_key(project_id: u64, seq: u64) -> DataKey { DataKey::Don(project_id, seq) }
fn impacted_key(project_id: u64) -> DataKey { DataKey::Imp(project_id) }
fn donor_project_mark_key(donor: Address, project_id: u64) -> DataKey { DataKey::Dpm(donor, project_id) }

#[contract]
pub struct MarketplaceContract;

#[contractimpl]
impl MarketplaceContract {
    // MVP: Admin creates a project
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn create_project(
        e: Env,
        owner: Address,
        name: String,
        deadline_ts: i64,
        target_amount: i128,
        problem_statement: String,
        impact_area: String,
        location: Location,
        milestones: Vec<Milestone>,
    ) -> u64 {
        owner.require_auth();
        
        // MVP: String length limits for gas optimization
        // TODO: Move validation to backend, use proper content validation
        if target_amount <= 0 || name.len() == 0 { panic_with_error!(&e, Error::InvalidArgument); }
        if name.len() > 100 { panic_with_error!(&e, Error::StringTooLong); }
        if problem_statement.len() > 500 { panic_with_error!(&e, Error::StringTooLong); }
        if impact_area.len() > 50 { panic_with_error!(&e, Error::StringTooLong); }
        let mut id = read_next_project_id(&e);
        id += 1;
        // Convert incoming Vec<Milestone> into Map<u32, Milestone> to enable keyed access
        let mut ms_map: Map<u32, Milestone> = Map::from_array(&e, []);
        for i in 0..milestones.len() {
            ms_map.set(i, milestones.get(i).unwrap());
        }

        let project = Project {
            id,
            owner: owner.clone(),
            name: name.clone(),
            deadline_ts,
            current_amount: 0,
            target_amount,
            problem_statement,
            impact_area: impact_area.clone(),
            location,
            milestones: ms_map,
            updates: Map::from_array(&e, []),
        };
        e.storage().persistent().set(&project_key(id), &project);
        write_next_project_id(&e, id);
        // Emit event: ProjectCreated
        e.events().publish(
            (symbol_short!("v1"), symbol_short!("PrjCreate")),
            (id, owner.clone(), name.clone(), deadline_ts, target_amount, impact_area.clone()),
        );
        id
    }

    // Get a project by id
    pub fn get_project(e: Env, id: u64) -> Project {
        e.storage().persistent().get::<_, Project>(&project_key(id)).unwrap_or_else(|| panic_with_error!(&e, Error::ProjectNotFound))
    }

    // List projects with simple pagination
    pub fn list_projects(e: Env, start_after: u64, limit: u32) -> Vec<Project> {
        let mut results = Vec::new(&e);
        let mut i = start_after;
        let max = read_next_project_id(&e);
        let mut count: u32 = 0;
        while i < max && count < limit {
            i += 1;
            if let Some(p) = e.storage().persistent().get::<_, Project>(&project_key(i)) {
                results.push_back(p);
                count += 1;
            }
        }
        results
    }

    // MVP: Donate to a project (native balance movements handled in app layer; this records metadata)
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn donate(e: Env, project_id: u64, donor: Address, amount: i128, timestamp: i64) -> u64 {
        donor.require_auth();
        if amount <= 0 { panic_with_error!(&e, Error::InvalidArgument); }
        let mut project = Self::get_project(e.clone(), project_id);
        project.current_amount += amount;
        let seq = read_project_don_seq(&e, project_id) + 1;
        let d = Donation { seq, project_id, donor: donor.clone(), amount, timestamp };
        e.storage().persistent().set(&project_key(project_id), &project);
        e.storage().persistent().set(&donation_key(project_id, seq), &d);
        // Mark (donor, project) relation for impact aggregation
        e.storage().persistent().set(&donor_project_mark_key(donor, project_id), &true);
        write_project_don_seq(&e, project_id, seq);
        // Emit event: DonationRecorded
        e.events().publish(
            (symbol_short!("v1"), symbol_short!("Donate")),
            (project_id, seq, d.donor.clone(), amount, timestamp, project.current_amount),
        );
        seq
    }

    // MVP: Append an update; only owner
    // Keep human-readable fields but enforce limits for cost control.
    // TODO: For production, large bodies should move off-chain; keep references/hashes on-chain.
    pub fn add_update(e: Env, project_id: u64, owner: Address, title: String, body: String, timestamp: i64) {
        owner.require_auth();
        // String length limits to avoid bloat
        if title.len() > 100 { panic_with_error!(&e, Error::StringTooLong); }
        if body.len() > 1000 { panic_with_error!(&e, Error::StringTooLong); }
        let mut project = Self::get_project(e.clone(), project_id);
        if project.owner != owner { panic_with_error!(&e, Error::NotAuthorized); }
        let mut updates = project.updates.clone();
        let idx: u32 = updates.len();
        updates.set(idx, Update { title: title.clone(), body, timestamp });
        project.updates = updates;
        e.storage().persistent().set(&project_key(project_id), &project);
        // Emit event: UpdateAdded
        e.events().publish(
            (symbol_short!("v1"), symbol_short!("UpdAdded")),
            (project_id, idx, timestamp, title.clone()),
        );
    }

    // MVP: Mark milestone completed; only owner
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn complete_milestone(e: Env, project_id: u64, owner: Address, milestone_index: u32) {
        owner.require_auth();
        let mut project = Self::get_project(e.clone(), project_id);
        if project.owner != owner { panic_with_error!(&e, Error::NotAuthorized); }
        let len: u32 = project.milestones.len();
        if milestone_index >= len { panic_with_error!(&e, Error::InvalidArgument); }
        let mut milestones = project.milestones.clone();
        let mut m = milestones.get(milestone_index).unwrap();
        m.completed = true;
        milestones.set(milestone_index, m);
        project.milestones = milestones;
        e.storage().persistent().set(&project_key(project_id), &project);
        // Emit event: MilestoneCompleted (includes title for convenience; keep titles short)
        e.events().publish(
            (symbol_short!("v1"), symbol_short!("MsDone")),
            (project_id, milestone_index, project.milestones.get(milestone_index).unwrap().title.clone(), e.ledger().timestamp()),
        );
    }

    // MVP: Reporting getters for dashboards
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn get_summary(e: Env, project_id: u64) -> (String, i128, i128, i128) {
        let p = Self::get_project(e, project_id);
        let percent_bp = if p.target_amount > 0 { (p.current_amount * 10_000) / p.target_amount } else { 0 };
        (p.name, p.current_amount, p.target_amount, percent_bp)
    }

    pub fn get_location(e: Env, project_id: u64) -> Location {
        let p = Self::get_project(e, project_id);
        p.location
    }

    pub fn get_impact_area(e: Env, project_id: u64) -> String {
        let p = Self::get_project(e, project_id);
        p.impact_area
    }

    pub fn get_problem_statement(e: Env, project_id: u64) -> String {
        let p = Self::get_project(e, project_id);
        p.problem_statement
    }

    pub fn list_updates(e: Env, project_id: u64) -> Vec<Update> {
        let p = Self::get_project(e.clone(), project_id);
        let mut out = Vec::new(&e);
        let len: u32 = p.updates.len();
        for i in 0..len { out.push_back(p.updates.get(i).unwrap()); }
        out
    }

    pub fn list_milestones(e: Env, project_id: u64) -> Vec<Milestone> {
        let p = Self::get_project(e.clone(), project_id);
        let mut out = Vec::new(&e);
        let len: u32 = p.milestones.len();
        for i in 0..len { out.push_back(p.milestones.get(i).unwrap()); }
        out
    }

    pub fn list_donations(e: Env, project_id: u64, start_after_seq: u64, limit: u32) -> Vec<Donation> {
        let mut results = Vec::new(&e);
        let mut seq = start_after_seq;
        let max_seq = read_project_don_seq(&e, project_id);
        let mut count: u32 = 0;
        while seq < max_seq && count < limit {
            seq += 1;
            if let Some(d) = e.storage().persistent().get::<_, Donation>(&donation_key(project_id, seq)) {
                results.push_back(d);
                count += 1;
            }
        }
        results
    }

    // MVP: Impact metrics
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn set_impacted_people(e: Env, project_id: u64, owner: Address, impacted_people: i128) {
        owner.require_auth();
        let p = Self::get_project(e.clone(), project_id);
        if p.owner != owner { panic_with_error!(&e, Error::NotAuthorized); }
        if impacted_people < 0 { panic_with_error!(&e, Error::InvalidArgument); }
        e.storage().persistent().set(&impacted_key(project_id), &impacted_people);
        e.events().publish(
            (symbol_short!("v1"), symbol_short!("ImpSet")),
            (project_id, impacted_people),
        );
    }

    // MVP: Get impacted people for a project
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn get_impacted_people(e: Env, project_id: u64) -> i128 {
        e.storage().persistent().get::<_, i128>(&impacted_key(project_id)).unwrap_or(0)
    }

    // MVP: Get total impacted people across all projects where donor donated
    // TODO: Move to backend for production - this is for rapid MVP iteration
    // WARNING: This function iterates over ALL projects - expensive operation
    pub fn get_donor_impacted_people(e: Env, donor: Address) -> i128 {
        let max = read_next_project_id(&e);
        let mut sum: i128 = 0;
        let mut pid: u64 = 0;
        while pid < max {
            pid += 1;
            if e.storage().persistent().get::<_, bool>(&donor_project_mark_key(donor.clone(), pid)).is_some() {
                let imp = e.storage().persistent().get::<_, i128>(&impacted_key(pid)).unwrap_or(0);
                sum += imp;
            }
        }
        sum
    }

    // MVP: Aggregate stats for dashboards
    // TODO: Move to backend for production - this is for rapid MVP iteration
    pub fn get_dashboard_stats(e: Env, project_id: u64) -> Stats {
        let p = Self::get_project(e.clone(), project_id);
        let donations_count = read_project_don_seq(&e, project_id);
        let milestones_total: u32 = p.milestones.len();
        let mut milestones_completed: u32 = 0;
        for i in 0..milestones_total {
            if p.milestones.get(i).unwrap().completed { milestones_completed += 1; }
        }
        let last_update_ts = if p.updates.len() > 0 { p.updates.get(p.updates.len() - 1).unwrap().timestamp } else { 0 };
        let percent_bp = if p.target_amount > 0 { (p.current_amount * 10_000) / p.target_amount } else { 0 };
        Stats {
            current_amount: p.current_amount,
            target_amount: p.target_amount,
            percent_bp,
            donations_count,
            milestones_completed,
            milestones_total,
            last_update_ts,
        }
    }
}

// types are annotated above with #[contracttype]

// Test skeleton
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;

    #[test]
    fn create_and_get() {
        let e = Env::default();
        let contract_id = e.register_contract(None, MarketplaceContract);
        let client = MarketplaceContractClient::new(&e, &contract_id);
        let owner = Address::generate(&e);
        let loc = Location { 
            latitude: 0, 
            longitude: 0, 
            country: String::from_str(&e, "AR"), 
            province: String::from_str(&e, "Buenos Aires"), 
            city: String::from_str(&e, "La Plata") 
        };
        let milestones = Map::from_array(&e, &[]);
        let id = client.create_project(
            &owner, 
            &String::from_str(&e, "Comedor"), 
            &1_726_000_000i64, 
            &30_000i128, 
            &String::from_str(&e, "Crear comedor"), 
            &String::from_str(&e, "Educacion"), 
            &loc, 
            &milestones
        );
        let p = client.get_project(&id);
        assert_eq!(p.name, String::from_str(&e, "Comedor"));
    }
}
