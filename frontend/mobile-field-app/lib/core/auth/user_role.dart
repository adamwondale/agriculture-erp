import 'package:flutter/material.dart';

/// Supported enterprise roles matching `services/core-admin-service`
enum AgriRole {
  fieldAgronomist(
    code: 'FIELD_AGRONOMIST',
    title: 'Field Agronomist',
    shortCode: 'AGRO',
    description: 'Extension agent & parcel inspection specialist',
    icon: Icons.agriculture_outlined,
    activeIcon: Icons.agriculture,
    badgeColor: Color(0xFF156C46),
  ),
  farmOpsManager(
    code: 'FARM_OPS_MANAGER',
    title: 'Operations Manager',
    shortCode: 'MGR',
    description: 'Regional hub supervisor & approvals authority',
    icon: Icons.supervised_user_circle_outlined,
    activeIcon: Icons.supervised_user_circle,
    badgeColor: Color(0xFF0B3D2E),
  ),
  partnerSupervisor(
    code: 'PARTNER_SUPERVISOR',
    title: 'Partner Supervisor',
    shortCode: 'COOP',
    description: 'Cooperative union aggregator & quota manager',
    icon: Icons.groups_outlined,
    activeIcon: Icons.groups,
    badgeColor: Color(0xFF2E6F40),
  ),
  warehouseOfficer(
    code: 'WAREHOUSE_OFFICER',
    title: 'Warehouse Officer',
    shortCode: 'WH',
    description: 'Silo intake, weighbridge & rapid QC technician',
    icon: Icons.warehouse_outlined,
    activeIcon: Icons.warehouse,
    badgeColor: Color(0xFF355E3B),
  ),
  logisticsDriver(
    code: 'LOGISTICS_DRIVER',
    title: 'Logistics Driver',
    shortCode: 'LOG',
    description: 'Fleet transport, digital waybill & POD sign-off',
    icon: Icons.local_shipping_outlined,
    activeIcon: Icons.local_shipping,
    badgeColor: Color(0xFF285430),
  ),
  contractFarmer(
    code: 'CONTRACT_FARMER',
    title: 'Contract Farmer',
    shortCode: 'FARM',
    description: 'Smallholder outgrower with loan & payout ledger',
    icon: Icons.eco_outlined,
    activeIcon: Icons.eco,
    badgeColor: Color(0xFF38761D),
  ),
  executive(
    code: 'EXECUTIVE',
    title: 'Executive Leadership',
    shortCode: 'EXEC',
    description: 'Macro portfolio cockpit & high-value approver',
    icon: Icons.insights_outlined,
    activeIcon: Icons.insights,
    badgeColor: Color(0xFF1A382B),
  );

  final String code;
  final String title;
  final String shortCode;
  final String description;
  final IconData icon;
  final IconData activeIcon;
  final Color badgeColor;

  const AgriRole({
    required this.code,
    required this.title,
    required this.shortCode,
    required this.description,
    required this.icon,
    required this.activeIcon,
    required this.badgeColor,
  });

  /// Parse role string returned from core-admin-service JWT or /api/auth/me
  static AgriRole fromCode(String? raw) {
    if (raw == null || raw.trim().isEmpty) {
      return AgriRole.fieldAgronomist;
    }

    final normalized = raw.trim().toUpperCase().replaceAll(' ', '_').replaceAll('-', '_');

    for (final role in AgriRole.values) {
      if (role.code == normalized) return role;
    }

    // Role aliases and common administrative mappings
    if (normalized.contains('AGRONOMIST') || normalized.contains('AGENT')) {
      return AgriRole.fieldAgronomist;
    }
    if (normalized.contains('MANAGER') || normalized.contains('OPS')) {
      return AgriRole.farmOpsManager;
    }
    if (normalized.contains('PARTNER') || normalized.contains('COOP') || normalized.contains('UNION')) {
      return AgriRole.partnerSupervisor;
    }
    if (normalized.contains('WAREHOUSE') || normalized.contains('SILO') || normalized.contains('QC')) {
      return AgriRole.warehouseOfficer;
    }
    if (normalized.contains('DRIVER') || normalized.contains('LOGISTICS') || normalized.contains('FLEET')) {
      return AgriRole.logisticsDriver;
    }
    if (normalized.contains('FARMER') || normalized.contains('GROWER')) {
      return AgriRole.contractFarmer;
    }
    if (normalized.contains('EXEC') ||
        normalized.contains('ADMIN') ||
        normalized.contains('CEO') ||
        normalized.contains('COO') ||
        normalized.contains('DIRECTOR')) {
      return AgriRole.executive;
    }

    return AgriRole.fieldAgronomist;
  }
}

/// Metadata representation for a role-specific navigation tab
class RoleNavTab {
  final String label;
  final IconData icon;
  final IconData activeIcon;
  final int badgeCount;

  const RoleNavTab({
    required this.label,
    required this.icon,
    required this.activeIcon,
    this.badgeCount = 0,
  });
}

/// Navigation tabs definition per role conforming to DESIGN.md
extension AgriRoleTabs on AgriRole {
  List<RoleNavTab> get navTabs {
    switch (this) {
      case AgriRole.fieldAgronomist:
        return const [
          RoleNavTab(label: 'Home', icon: Icons.dashboard_outlined, activeIcon: Icons.dashboard),
          RoleNavTab(label: 'Farmers', icon: Icons.people_outline, activeIcon: Icons.people),
          RoleNavTab(label: 'Inspect', icon: Icons.fact_check_outlined, activeIcon: Icons.fact_check),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];

      case AgriRole.farmOpsManager:
        return const [
          RoleNavTab(label: 'Overview', icon: Icons.dashboard_outlined, activeIcon: Icons.dashboard),
          RoleNavTab(label: 'Approvals', icon: Icons.task_alt_outlined, activeIcon: Icons.task_alt, badgeCount: 4),
          RoleNavTab(label: 'Team', icon: Icons.badge_outlined, activeIcon: Icons.badge),
          RoleNavTab(label: 'Conflicts', icon: Icons.sync_problem_outlined, activeIcon: Icons.sync_problem, badgeCount: 2),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];

      case AgriRole.partnerSupervisor:
        return const [
          RoleNavTab(label: 'Cluster', icon: Icons.hub_outlined, activeIcon: Icons.hub),
          RoleNavTab(label: 'Members', icon: Icons.group_outlined, activeIcon: Icons.group),
          RoleNavTab(label: 'Requests', icon: Icons.shopping_basket_outlined, activeIcon: Icons.shopping_basket),
          RoleNavTab(label: 'Harvest', icon: Icons.inventory_2_outlined, activeIcon: Icons.inventory_2),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];

      case AgriRole.warehouseOfficer:
        return const [
          RoleNavTab(label: 'Intake', icon: Icons.warehouse_outlined, activeIcon: Icons.warehouse),
          RoleNavTab(label: 'Scales', icon: Icons.scale_outlined, activeIcon: Icons.scale),
          RoleNavTab(label: 'QC Lab', icon: Icons.biotech_outlined, activeIcon: Icons.biotech),
          RoleNavTab(label: 'Silos', icon: Icons.inventory_outlined, activeIcon: Icons.inventory),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];

      case AgriRole.logisticsDriver:
        return const [
          RoleNavTab(label: 'Mission', icon: Icons.alt_route_outlined, activeIcon: Icons.alt_route),
          RoleNavTab(label: 'Waybill', icon: Icons.receipt_long_outlined, activeIcon: Icons.receipt_long),
          RoleNavTab(label: 'POD', icon: Icons.draw_outlined, activeIcon: Icons.draw),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];

      case AgriRole.contractFarmer:
        return const [
          RoleNavTab(label: 'My Farm', icon: Icons.yard_outlined, activeIcon: Icons.yard),
          RoleNavTab(label: 'Harvest', icon: Icons.scale_outlined, activeIcon: Icons.scale),
          RoleNavTab(label: 'Ledger', icon: Icons.account_balance_wallet_outlined, activeIcon: Icons.account_balance_wallet),
          RoleNavTab(label: 'Advisory', icon: Icons.wb_sunny_outlined, activeIcon: Icons.wb_sunny),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];

      case AgriRole.executive:
        return const [
          RoleNavTab(label: 'Pulse', icon: Icons.insights_outlined, activeIcon: Icons.insights),
          RoleNavTab(label: 'Approvals', icon: Icons.verified_user_outlined, activeIcon: Icons.verified_user, badgeCount: 3),
          RoleNavTab(label: 'Analytics', icon: Icons.analytics_outlined, activeIcon: Icons.analytics),
          RoleNavTab(label: 'Profile', icon: Icons.account_circle_outlined, activeIcon: Icons.account_circle),
        ];
    }
  }
}
