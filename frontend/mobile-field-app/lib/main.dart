import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'presentation/screens/auth/welcome_splash_screen.dart';
import 'presentation/screens/auth/login_screen.dart';
import 'presentation/screens/auth/mfa_verification_screen.dart';
import 'presentation/screens/home/main_nav_screen.dart';
import 'presentation/screens/profile/profile_security_screen.dart';
import 'presentation/screens/farmer_registration/farmer_registration_screen.dart';
import 'presentation/screens/field_inspection/field_inspection_screen.dart';
import 'presentation/screens/parcel_mapping/parcel_mapping_screen.dart';
import 'presentation/screens/agronomist/farmer_directory_screen.dart';
import 'presentation/screens/agronomist/input_distribution_receipt_screen.dart';
import 'presentation/screens/ops_manager/manager_approval_inbox_screen.dart';
import 'presentation/screens/ops_manager/team_schedule_dispatch_screen.dart';
import 'presentation/screens/ops_manager/sync_conflict_resolution_screen.dart';
import 'presentation/screens/warehouse/weighbridge_ticket_screen.dart';
import 'presentation/screens/warehouse/rapid_qc_grading_screen.dart';
import 'presentation/screens/warehouse/grn_silo_allocation_screen.dart';
import 'presentation/screens/logistics/driver_waybill_manifest_screen.dart';
import 'presentation/screens/logistics/transit_delay_incident_screen.dart';
import 'presentation/screens/logistics/proof_of_delivery_pod_screen.dart';
import 'presentation/screens/partner/cluster_member_roster_screen.dart';
import 'presentation/screens/partner/input_credit_requisition_screen.dart';
import 'presentation/screens/partner/village_depot_intake_screen.dart';
import 'presentation/screens/farmer/farmer_farm_overview_screen.dart';
import 'presentation/screens/farmer/farmer_ledger_settlement_screen.dart';
import 'presentation/screens/farmer/farmer_weather_advisory_screen.dart';
import 'presentation/screens/executive/executive_approval_deck_screen.dart';
import 'presentation/screens/executive/executive_pulse_analytics_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: AgriFieldApp()));
}

class AgriFieldApp extends StatelessWidget {
  const AgriFieldApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Z•ORISIS Mobile Field App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (_) => const WelcomeSplashScreen(),
        '/login': (_) => const LoginScreen(),
        '/mfa': (_) => const MfaVerificationScreen(),
        '/home': (_) => const MainNavScreen(),
        '/profile': (_) => const ProfileSecurityScreen(),
        '/farmer-registration': (_) => const FarmerRegistrationScreen(),
        '/field-inspection': (_) => const FieldInspectionScreen(),
        '/parcel-mapping': (_) => const ParcelMappingScreen(),
        '/farmer-directory': (_) => const FarmerDirectoryScreen(),
        '/input-distribution': (_) => const InputDistributionReceiptScreen(),
        '/manager-approvals': (_) => const ManagerApprovalInboxScreen(),
        '/team-dispatch': (_) => const TeamScheduleDispatchScreen(),
        '/sync-conflicts': (_) => const SyncConflictResolutionScreen(),
        '/weighbridge-ticket': (_) => const WeighbridgeTicketScreen(),
        '/rapid-qc': (_) => const RapidQcGradingScreen(),
        '/silo-allocation': (_) => const GrnSiloAllocationScreen(),
        '/waybill-manifest': (_) => const DriverWaybillManifestScreen(),
        '/transit-delay': (_) => const TransitDelayIncidentScreen(),
        '/pod-delivery': (_) => const ProofOfDeliveryPodScreen(),
        '/cluster-roster': (_) => const ClusterMemberRosterScreen(),
        '/credit-requisition': (_) => const InputCreditRequisitionScreen(),
        '/depot-intake': (_) => const VillageDepotIntakeScreen(),
        '/farm-overview': (_) => const FarmerFarmOverviewScreen(),
        '/farmer-ledger': (_) => const FarmerLedgerSettlementScreen(),
        '/weather-advisory': (_) => const FarmerWeatherAdvisoryScreen(),
        '/executive-approvals': (_) => const ExecutiveApprovalDeckScreen(),
        '/executive-pulse': (_) => const ExecutivePulseAnalyticsScreen(),
      },
    );
  }
}
