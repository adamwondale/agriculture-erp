import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/auth/user_role.dart';
import '../../../core/theme/app_theme.dart';
import '../../providers/role_provider.dart';
import '../agronomist/farmer_directory_screen.dart';
import '../field_inspection/field_inspection_screen.dart';
import '../profile/profile_security_screen.dart';
import '../roles/agronomist_dashboard_view.dart';
import '../roles/ops_manager_dashboard_view.dart';
import '../roles/partner_dashboard_view.dart';
import '../roles/warehouse_dashboard_view.dart';
import '../roles/logistics_dashboard_view.dart';
import '../roles/farmer_dashboard_view.dart';
import '../roles/executive_dashboard_view.dart';
import '../ops_manager/manager_approval_inbox_screen.dart';
import '../ops_manager/team_schedule_dispatch_screen.dart';
import '../ops_manager/sync_conflict_resolution_screen.dart';
import '../partner/cluster_member_roster_screen.dart';
import '../partner/input_credit_requisition_screen.dart';
import '../partner/village_depot_intake_screen.dart';
import '../warehouse/weighbridge_ticket_screen.dart';
import '../warehouse/rapid_qc_grading_screen.dart';
import '../warehouse/grn_silo_allocation_screen.dart';
import '../logistics/driver_waybill_manifest_screen.dart';
import '../logistics/proof_of_delivery_pod_screen.dart';
import '../farmer/farmer_farm_overview_screen.dart';
import '../farmer/farmer_ledger_settlement_screen.dart';
import '../farmer/farmer_weather_advisory_screen.dart';
import '../executive/executive_approval_deck_screen.dart';
import '../executive/executive_pulse_analytics_screen.dart';

class MainNavScreen extends ConsumerStatefulWidget {
  final int initialIndex;

  const MainNavScreen({super.key, this.initialIndex = 0});

  @override
  ConsumerState<MainNavScreen> createState() => _MainNavScreenState();
}

class _MainNavScreenState extends ConsumerState<MainNavScreen> {
  late int _currentIndex;
  AgriRole? _lastRole;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
  }

  void _onTabSelected(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  List<Widget> _buildScreensForRole(AgriRole role) {
    switch (role) {
      case AgriRole.fieldAgronomist:
        return [
          AgronomistDashboardView(
            onNavigateToFarmers: () => _onTabSelected(1),
            onNavigateToInspections: () => _onTabSelected(2),
            onNavigateToProfile: () => _onTabSelected(3),
          ),
          FarmerDirectoryScreen(onBack: () => _onTabSelected(0)),
          FieldInspectionScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];

      case AgriRole.farmOpsManager:
        return [
          OpsManagerDashboardView(
            onNavigateToApprovals: () => _onTabSelected(1),
            onNavigateToTeam: () => _onTabSelected(2),
            onNavigateToConflicts: () => _onTabSelected(3),
            onNavigateToProfile: () => _onTabSelected(4),
          ),
          ManagerApprovalInboxScreen(onBack: () => _onTabSelected(0)),
          TeamScheduleDispatchScreen(onBack: () => _onTabSelected(0)),
          SyncConflictResolutionScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];

      case AgriRole.partnerSupervisor:
        return [
          PartnerDashboardView(
            onNavigateToMembers: () => _onTabSelected(1),
            onNavigateToRequests: () => _onTabSelected(2),
            onNavigateToHarvest: () => _onTabSelected(3),
            onNavigateToProfile: () => _onTabSelected(4),
          ),
          ClusterMemberRosterScreen(onBack: () => _onTabSelected(0)),
          InputCreditRequisitionScreen(onBack: () => _onTabSelected(0)),
          VillageDepotIntakeScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];

      case AgriRole.warehouseOfficer:
        return [
          WarehouseDashboardView(
            onNavigateToScales: () => _onTabSelected(1),
            onNavigateToQc: () => _onTabSelected(2),
            onNavigateToSilos: () => _onTabSelected(3),
            onNavigateToProfile: () => _onTabSelected(4),
          ),
          WeighbridgeTicketScreen(onBack: () => _onTabSelected(0)),
          RapidQcGradingScreen(onBack: () => _onTabSelected(0)),
          GrnSiloAllocationScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];

      case AgriRole.logisticsDriver:
        return [
          LogisticsDashboardView(
            onNavigateToWaybill: () => _onTabSelected(1),
            onNavigateToPod: () => _onTabSelected(2),
            onNavigateToProfile: () => _onTabSelected(3),
          ),
          DriverWaybillManifestScreen(onBack: () => _onTabSelected(0)),
          ProofOfDeliveryPodScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];

      case AgriRole.contractFarmer:
        return [
          FarmerDashboardView(
            onNavigateToHarvest: () => _onTabSelected(1),
            onNavigateToPayments: () => _onTabSelected(2),
            onNavigateToAdvisory: () => _onTabSelected(3),
            onNavigateToProfile: () => _onTabSelected(4),
          ),
          FarmerFarmOverviewScreen(onBack: () => _onTabSelected(0)),
          FarmerLedgerSettlementScreen(onBack: () => _onTabSelected(0)),
          FarmerWeatherAdvisoryScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];

      case AgriRole.executive:
        return [
          ExecutiveDashboardView(
            onNavigateToApprovals: () => _onTabSelected(1),
            onNavigateToAnalytics: () => _onTabSelected(2),
            onNavigateToProfile: () => _onTabSelected(3),
          ),
          ExecutiveApprovalDeckScreen(onBack: () => _onTabSelected(0)),
          ExecutivePulseAnalyticsScreen(onBack: () => _onTabSelected(0)),
          const ProfileSecurityScreen(),
        ];
    }
  }

  @override
  Widget build(BuildContext context) {
    final activeRole = ref.watch(activeRoleProvider);
    final navTabs = ref.watch(activeRoleNavTabsProvider);

    // If role changed externally, clamp tab index safely
    if (_lastRole != activeRole) {
      _lastRole = activeRole;
      if (_currentIndex >= navTabs.length) {
        _currentIndex = 0;
      }
    }

    final screens = _buildScreensForRole(activeRole);

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex < screens.length ? _currentIndex : 0,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.98),
          boxShadow: [
            BoxShadow(
              color: AppColors.primaryContainer.withValues(alpha: 0.08),
              blurRadius: 12,
              offset: const Offset(0, -2),
            ),
          ],
          border: const Border(
            top: BorderSide(color: AppColors.borderClean, width: 0.5),
          ),
        ),
        child: SafeArea(
          top: false,
          child: SizedBox(
            height: 62,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: List.generate(navTabs.length, (index) {
                final tab = navTabs[index];
                return _buildNavItem(
                  index: index,
                  tab: tab,
                  roleColor: activeRole.badgeColor,
                );
              }),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required int index,
    required RoleNavTab tab,
    required Color roleColor,
  }) {
    final isSelected = _currentIndex == index;
    final color = isSelected ? roleColor : AppColors.onSurfaceVariant;

    return Expanded(
      child: InkWell(
        onTap: () => _onTabSelected(index),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 6.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              tab.badgeCount > 0
                  ? Badge(
                      label: Text(
                        '${tab.badgeCount}',
                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                      ),
                      backgroundColor: AppColors.error,
                      child: Icon(
                        isSelected ? tab.activeIcon : tab.icon,
                        color: color,
                        size: 22,
                      ),
                    )
                  : Icon(
                      isSelected ? tab.activeIcon : tab.icon,
                      color: color,
                      size: 22,
                    ),
              const SizedBox(height: 3),
              Text(
                tab.label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                  color: color,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
