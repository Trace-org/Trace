# Trace Soroban Contracts 

Este directorio contiene el contrato Soroban del MVP de crowdfunding on-chain. Cómo instalar, compilar, desplegar y ejecutar funciones con la CLI (v23).

Enlaces:
- Setup oficial (Rust, target, CLI): https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup

## 1) Variables de entorno (.env)
Cambiar `.env.example` a `.env`

```
# Red
STELLAR_NETWORK=testnet

# Identidad/llaves
STELLAR_ACCOUNT=trace-dev          # identidad local (recomendado)
ADMIN_PUBLIC_KEY=GD...             # opcional: clave pública
ADMIN_SECRET_KEY=SC...             # opcional: clave secreta

# ID del contrato desplegado
CONTRACT_ID=CADY6CZACBOKGQ26ZS7JDTL23H4FNQZLN5TQYJOP2GJQP3JFSPTJ7FYQ
```

Cargar en shell:

```
cd contracts
set -a; source .env; set +a
```

Notas:
- La CLI entiende `STELLAR_NETWORK`, `STELLAR_ACCOUNT`, `STELLAR_CONTRACT_ID`.
- Podés usar `--id "$CONTRACT_ID"` explícito si preferís.

## 2) Identidad en testnet (si no la tenés)

```
stellar keys generate --global trace-dev --network testnet --fund
stellar keys address trace-dev   # muestra Address...
```

## 3) Compilar

```
cd contracts/marketplace
cargo build --target wasm32v1-none --release
```

Artefacto: `contracts/target/wasm32v1-none/release/marketplace.wasm`

## 4) Desplegar (opcional, si creás uno nuevo)

```
stellar contract deploy \
  --network testnet \
  --source trace-dev \
  --wasm /Users/user/oss-contributions/Trace/contracts/target/wasm32v1-none/release/marketplace.wasm
```

## 5) Invocar funciones (CLI v23)
Regla: después de `--` va el nombre de la función y luego flags con nombre.

Lecturas: `--send=no` (simula). Escrituras: firmar con `trace-dev` o `SC...`.

### 5.1 Crear proyecto

```
cat > /tmp/location.json << 'JSON'
{ "latitude": "-34000000", "longitude": "-58000000", "country": "AR", "province": "Buenos Aires", "city": "La Plata" }
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

### 5.2 Listar / Detalle

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- list_projects --start_after 0 --limit 20
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- get_project --id 1
```
Example output (get_project):
```
{"id":"1","owner":"GD...","name":"Comedor Escolar","deadline_ts":"1726000000","current_amount":"0","target_amount":"30000000","problem_statement":"Crear un comedor escolar","impact_area":"Educacion","location":{"latitude":"-34000000","longitude":"-58000000","country":"AR","province":"Buenos Aires","city":"La Plata"},"milestones":[],"updates":[]}
```

### 5.3 Donación (metadatos)

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" -- \
  donate --project_id 1 --donor $(stellar keys address trace-dev) --amount 10000000 --timestamp 1736200000
```
Example output:
```
"1"   # donation sequence
```

### 5.4 Updates

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
[{"title":"Avance 1","body":"Se compraron materiales","timestamp":"1736201000"}]
```

### 5.5 Milestones

```
# Completar índice 0 (solo si el proyecto tiene hitos)
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

### 5.6 Stats (dashboard)

```
stellar contract invoke --id "$CONTRACT_ID" -n "$STELLAR_NETWORK" -s "$STELLAR_ACCOUNT" --send=no -- \
  get_dashboard_stats --project_id 1
```
Example output:
```
{"current_amount":"10000000","target_amount":"30000000","percent_bp":"3333","donations_count":"1","milestones_completed":0,"milestones_total":0,"last_update_ts":"1736201000"}
```

## 5.7 Basic events (English)
Emitted for indexers/dashboards:
- PrjCreate(project_id, owner, name, deadline_ts, target_amount, impact_area)
- Donate(project_id, seq, donor, amount, timestamp, current_amount)
- UpdAdded(project_id, update_index, timestamp, title)
- MsDone(project_id, milestone_index, title, ledger_timestamp)

## 6) Errores comunes
- `Error(Contract, #2)` ProjectNotFound: el `project_id` no existe.
- `Error(Contract, #3)` InvalidArgument: índice de milestone inválido / datos faltantes.
- Escrituras con `--source` G...: no firma. Usar `trace-dev` o `SC...`.
- JSON inline mal escapado: preferí `--<arg>-file-path`.

## 7) Código
- Workspace: `contracts/Cargo.toml`
- Crate: `contracts/marketplace`
- Main: `contracts/marketplace/src/lib.rs`
