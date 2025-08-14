import type { ClientOptions, Address } from "@stellar/stellar-sdk/contract";

export interface ILocation {
    latitude: string;
    longitude: string;
    country: string;
    province: string;
    city: string;
  }

export interface IMilestone {
    title: string;
    description: string;
    amount_budget: string;
    completed: boolean;
}

export interface IUpdate {
    title: string;
    body: string;
    timestamp: string;
}

export interface IProject {
    id: string;
    owner: Address;
    name: string;
    deadline_ts: string;
    current_amount: string;
    target_amount: string;
    problem_statement: string;
    impact_area: string;
    location: ILocation;
    milestones: IMilestone[];
    updates: IUpdate[];
  }
  
  export interface IDonation {
    seq: string;
    project_id: string;
    donor: Address;
    amount: string;
    timestamp: string;
  }
  
  export interface IStats {
    current_amount: string;
    target_amount: string;
    percent_bp: string;
    donations_count: string;
    milestones_completed: number;
    milestones_total: number;
    last_update_ts: string;
  }

  export interface IBaseContractClient {
    readonly options: ClientOptions;
    toXDR(): string;
  }

  export interface IMarketplaceContract extends IBaseContractClient {
    create_project: (params: {
      owner: Address;
      name: string;
      deadline_ts: string;
      target_amount: string;
      problem_statement: string;
      impact_area: string;
      location: ILocation;
      milestones: IMilestone[];
    }) => Promise<string>;
  
    get_project: (params: { id: string }) => Promise<IProject>;
  
    list_projects: (params: {
      start_after: string;
      limit: number;
    }) => Promise<IProject[]>;
  
    donate: (params: {
      project_id: string;
      donor: Address;
      amount: string;
      timestamp: string;
    }) => Promise<string>;
  
    add_update: (params: {
      project_id: string;
      owner: Address;
      title: string;
      body: string;
      timestamp: string;
    }) => Promise<void>;
  
    complete_milestone: (params: {
      project_id: string;
      owner: Address;
      milestone_index: number;
    }) => Promise<void>;
  
    get_summary: (params: {
      project_id: string;
    }) => Promise<[string, string, string, string]>;
  
    get_dashboard_stats: (params: {
      project_id: string;
    }) => Promise<IStats>;
  }