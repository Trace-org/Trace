# Trace Soroban Contracts

This directory contains the Soroban contract for the on-chain crowdfunding MVP. Instructions for installing, compiling, deploying, and executing functions using the CLI (v23).

Links:
- Official setup (Rust, target, CLI): https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup

## 1) Environment Variables (.env)
Rename `.env.example` to `.env`

```
# Network
STELLAR_NETWORK=testnet

# Identity / Keys
STELLAR_ACCOUNT=trace-dev          # local identity (recommended)
ADMIN_PUBLIC_KEY=GD...             # optional: public key
ADMIN_SECRET_KEY=SC...             # optional: secret key

# Deployed contract ID
CONTRACT_ID=CCG7MR5XZFYIOFVLPMQKTJULMQQNENKDUNHTMPUKPTDXWH2SRAGPN2MO
```

Load in shell:

```bash
cd contracts
set -a; source .env; set +a
```
### Notes:

The CLI recognizes `STELLAR_NETWORK`, `STELLAR_ACCOUNT`, `STELLAR_CONTRACT_ID`.  
You can use `--id "$CONTRACT_ID"` explicitly if you prefer.

### Types and Limits (MVP)
- IDs and counters: `u64`
- Timestamps: `i64` (Unix seconds)
- Amounts: `i128` (preserves precision)
- Geolocation: `latitude/longitude: i32` in microdegrees (e.g., −34° → −34000000)
- String limits: `name ≤ 100`, `impact_area ≤ 50`, `problem_statement ≤ 500`, `update.title ≤ 100`, `update.body ≤ 1000`
- Structures: `milestones` and `updates` are stored as `Map<u32, …>`; listings (`list_milestones`, `list_updates`) return `Vec<…>`.

## 2) Identity on Testnet (if you don’t have one)

```
stellar keys generate --global trace-dev --network testnet --fund
stellar keys address trace-dev   # muestra Address...
```

## 3) Compile

```
cd contracts/marketplace
cargo build --target wasm32v1-none --release
```

Artifact: `contracts/target/wasm32v1-none/release/marketplace.wasm`

## 4) Optimize WASM (recommended)

```
stellar contract optimize --wasm ../target/wasm32v1-none/release/marketplace.wasm
```

This significantly reduces the file size (e.g., from ~46KB to ~26KB) and is **required for production**.

## 5) Deploy (optional, if creating a new one)

```
stellar contract deploy \
  --network testnet \
  --source trace-dev \
  --wasm /Users/user/oss-contributions/Trace/contracts/target/wasm32v1-none/release/marketplace.wasm
```

## 6) Invoke Functions (CLI v23)
Rule: after `--` comes the function name, followed by named flags.

Reads: `--send=no` (simulate). Writes: sign with `trace-dev` or `SC...`.

### 6.1 Create Project

```
cat > /tmp/location.json << 'JSON'
{ "latitude": -34000000, "longitude": -58000000, "country": "AR", "province": "Buenos Aires", "city": "La Plata" }
JSON

stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" -- \
  create_project \
  --owner $(stellar keys address trace-dev) \
  --name '"Comedor Escolar"' \
  --deadline_ts 1726000000 \
  --target_amount 30000000 \
  --problem_statement '"Crear un comedor escolar"' \
  --impact_area '"Educacion"' \
  --location-file-path /tmp/location.json \
  --milestones '[]'
```
Example output:
```
"1"
```

### 6.2 List / Details

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- list_projects --start_after 0 --limit 20
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- get_project --id 1
```
Example output (get_project):
```
{"id":1,"owner":"GD...","name":"Comedor Escolar","deadline_ts":1726000000,"current_amount":"0","target_amount":"30000000","problem_statement":"Crear un comedor escolar","impact_area":"Educacion","location":{"latitude":-34000000,"longitude":-58000000,"country":"AR","province":"Buenos Aires","city":"La Plata"},"milestones":{},"updates":{}}
```

### 6.3 Donation (metadata)

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" -- \
  donate --project_id 1 --donor $(stellar keys address trace-dev) --amount 10000000 --timestamp 1736200000
```
Example output:
```
"1"   # donation sequence
```

### 6.4 Updates

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" -- \
  add_update --project_id 1 --owner $(stellar keys address trace-dev) \
  --title '"Avance 1"' --body '"Se compraron materiales"' --timestamp 1736201000

stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- \
  list_updates --project_id 1
```
Example output (add_update):
```
# no return value on success
```
Example output (list_updates):
```
[{"title":"Avance 1","body":"Se compraron materiales","timestamp":1736201000}]
```

### 6.5 Milestones

```
# Complete index 0 (only if the project has milestones)
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" -- \
  complete_milestone --project_id 1 --owner $(stellar keys address trace-dev) --milestone_index 0

stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- \
  list_milestones --project_id 1
```
Example output (complete_milestone):
```
# no return value on success
```
Example output (list_milestones):
```
[{"title":"H1","description":"D1","amount_budget":"1000","completed":true}]
```

### 6.6 Stats (dashboard)

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- \
  get_dashboard_stats --project_id 1
```
Example output:
```
{"current_amount":"10000000","target_amount":"30000000","percent_bp":"3333","donations_count":"1","milestones_completed":0,"milestones_total":0,"last_update_ts":"1736201000"}
```

### 6.7 Impact metrics

```
# Set impacted people (solo owner del proyecto)
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" -- \
  set_impacted_people --project_id 1 --owner $(stellar keys address trace-dev) --impacted_people 123

# Get impacted people for a project
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- \
  get_impacted_people --project_id 1

# Get total impacted people across all projects where donor donated
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- \
  get_donor_impacted_people --donor $(stellar keys address trace-dev)
```
Example output (get_impacted_people):
```
"123"
```
Example output (get_donor_impacted_people):
```
"123"   # suma de impacted_people de todos los proyectos donde donó
```

### 6.8 Basic events 
Emitted for indexers/dashboards:
- PrjCreate(project_id:u64, owner, name, deadline_ts:i64, target_amount:i128, impact_area)
- Donate(project_id:u64, seq:u64, donor, amount:i128, timestamp:i64, current_amount:i128)
- UpdAdded(project_id, update_index, timestamp, title)
- MsDone(project_id:u64, milestone_index:u32, title, ledger_timestamp:u64)
- ImpSet(project_id, impacted_people)

## 7) Common Errors
- `Error(Contract, #1)` NotAuthorized: no sos el owner del proyecto.
- `Error(Contract, #2)` ProjectNotFound: el `project_id` no existe.
- `Error(Contract, #3)` InvalidArgument: índice de milestone inválido / datos faltantes / impacted_people negativo.
- Escrituras con `--source` G...: no firma. Usar `trace-dev` o `SC...`.
- JSON inline mal escapado: preferí `--<arg>-file-path`.

## 8) Code
- Workspace: `contracts/Cargo.toml`
- Crate: `contracts/marketplace`
- Main: `contracts/marketplace/src/lib.rs`
