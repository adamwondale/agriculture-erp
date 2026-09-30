# GSD Phase Plan: Full Role-Based Screen Implementation

## Objective
Implement high-fidelity, production-grade Flutter screens for all 7 roles in `frontend/mobile-field-app`. Adhere strictly to the Modern Agritech Enterprise color palette (`AppColors`, `AppTheme`), realistic agricultural enterprise data (Ethiopian farming context: Jimma, Mana, Bilida, Telebirr, Fayda, Teff, Maize), strictly ZERO emojis, and ZERO AI slop buzzwords.

## Design Standards & Constraints
1. **Color Scheme**: Strict alignment with `AppColors`:
   - Primary: `#00261B`
   - Primary Container: `#0B3D2E`
   - Secondary: `#146B45`
   - Secondary Container: `#A3F4C3`
   - Surface: `#EFFDF3`
   - Low Surface: `#E9F7ED`
   - Text: `#17231D`
   - Border: `#DDE4DE`
   - Error: `#BA1A1A`
2. **Text Guidelines**: Pragmatic, concrete, domain-accurate agricultural ERP terminology. No generic AI fluff.
3. **Icons**: Material Design icons (`Icons.*`) only. NO emojis.

## Execution Waves

### Wave 1: Field Agronomist Suite (`FIELD_AGRONOMIST`)
- `farmer_directory_screen.dart` (Farmer 360° Directory & Reliability Scoring)
- `input_distribution_receipt_screen.dart` (Input distribution & voucher slip)
- Upgrade `farmer_registration_screen.dart` (4-step multi-stage registration wizard)
- Upgrade `field_inspection_screen.dart` (Pest & disease agronomic scoring)
- Upgrade `parcel_mapping_screen.dart` (Polygon GPS boundary walking)

### Wave 2: Operations Manager Suite (`FARM_OPS_MANAGER`)
- `manager_approval_inbox_screen.dart` (Multi-workflow approvals deck)
- `team_schedule_dispatch_screen.dart` (Agronomist team dispatch & routes)
- `sync_conflict_resolution_screen.dart` (Side-by-side offline sync conflict resolver)

### Wave 3: Warehouse & Logistics Suites (`WAREHOUSE_OFFICER` & `LOGISTICS_DRIVER`)
- `weighbridge_ticket_screen.dart` (Gross/Tare weighbridge ticket generator)
- `rapid_qc_grading_screen.dart` (Grain moisture, foreign matter, aflatoxin lab test)
- `grn_silo_allocation_screen.dart` (GRN lot tag & silo bin allocation)
- `driver_waybill_manifest_screen.dart` (Cargo manifest & checkpoint logs)
- `transit_delay_incident_screen.dart` (Delay and breakdown incident form)
- `proof_of_delivery_pod_screen.dart` (Consignee POD sign-off)

### Wave 4: Commercial Partner, Contract Farmer & Executive Suites
- `cluster_member_roster_screen.dart` (Cooperative member quota tracker)
- `input_credit_requisition_screen.dart` (Bulk seed & fertilizer requisition)
- `village_depot_intake_screen.dart` (Depot grain intake slip)
- `farmer_farm_overview_screen.dart` (Smallholder crop stage tracker)
- `farmer_ledger_settlement_screen.dart` (Telebirr payout & loan deduction ledger)
- `farmer_weather_advisory_screen.dart` (Hyper-local weather & audio advisory)
- `executive_approval_deck_screen.dart` (High-threshold slide-to-approve)
- `executive_pulse_analytics_screen.dart` (Regional intake analytics)

### Wave 5: Wire Navigation, Routing & Full Verification
- Wire all screens into `main_nav_screen.dart` for all 7 roles.
- Update routes in `lib/main.dart`.
- Verify with `dart analyze lib` (0 issues).
- Run `flutter test test/role_navigation_test.dart --no-pub`.
- Run CodeRabbit Quality Gate review.
