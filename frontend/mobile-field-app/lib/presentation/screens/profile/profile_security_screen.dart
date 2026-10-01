import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';
import '../../providers/auth_provider.dart';
import '../auth/welcome_splash_screen.dart';

class _RoleInfo {
  final String rawRole;
  final Color badgeColor;
  final String shortCode;

  const _RoleInfo({
    required this.rawRole,
    required this.badgeColor,
    required this.shortCode,
  });

  static _RoleInfo fromRaw(String raw) {
    switch (raw) {
      case 'SuperAdmin':
        return const _RoleInfo(
          rawRole: 'SuperAdmin',
          badgeColor: Color(0xFF6B21A8),
          shortCode: 'SA',
        );
      case 'FarmManager':
        return const _RoleInfo(
          rawRole: 'FarmManager',
          badgeColor: Color(0xFF166534),
          shortCode: 'FM',
        );
      case 'Agronomist':
        return const _RoleInfo(
          rawRole: 'Agronomist',
          badgeColor: Color(0xFF0369A1),
          shortCode: 'AG',
        );
      case 'FieldOfficer':
        return const _RoleInfo(
          rawRole: 'FieldOfficer',
          badgeColor: Color(0xFF92400E),
          shortCode: 'FO',
        );
      default:
        return _RoleInfo(
          rawRole: raw,
          badgeColor: const Color(0xFF374151),
          shortCode: raw.length >= 2 ? raw.substring(0, 2).toUpperCase() : raw.toUpperCase(),
        );
    }
  }
}

class ProfileSecurityScreen extends ConsumerWidget {
  const ProfileSecurityScreen({super.key});

  String _getInitials(String? name) {
    if (name == null || name.trim().isEmpty) return 'FO';
    final parts = name.trim().split(RegExp(r'\s+'));
    if (parts.length >= 2) {
      return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    }
    return parts[0].substring(0, parts[0].length >= 2 ? 2 : 1).toUpperCase();
  }

  String _formatRoleName(String rawRole) {
    switch (rawRole) {
      case 'Agronomist':
        return 'Agronomist';
      case 'FieldOfficer':
        return 'Field Officer';
      case 'FarmManager':
        return 'Farm Manager';
      case 'SuperAdmin':
        return 'Super Admin';
      default:
        return rawRole.replaceAllMapped(
          RegExp(r'([A-Z])'),
          (match) => ' ${match.group(0)}',
        ).trim();
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authNotifierProvider);
    final user = authState is AuthAuthenticated ? authState.user : null;

    final displayName = user != null && user.displayName.isNotEmpty
        ? user.displayName
        : 'Field Operator';
    final email = user != null && user.email.isNotEmpty
        ? user.email
        : 'operator@zorisis.com';
    final initials = _getInitials(displayName);
    final assignedRoles = user != null && user.roles.isNotEmpty
        ? user.roles.map(_RoleInfo.fromRaw).toList()
        : [_RoleInfo.fromRaw('FieldOfficer')];
    final activeRole = assignedRoles.first;
    final primaryRole = _formatRoleName(activeRole.rawRole);
    final allRolesFormatted = user != null && user.roles.isNotEmpty
        ? user.roles.map(_formatRoleName).join(', ')
        : 'Farm Manager';
    final department = user != null && user.department.isNotEmpty
        ? user.department
        : 'Agronomy Operations';
    final position = user != null && user.position.isNotEmpty
        ? user.position
        : 'Field Specialist';
    final branchScope = user != null && user.branchId != null
        ? '${user.branchId} • $department'
        : 'Oromia HQ • Central Region';
    final clearanceLevel = user != null && user.roles.contains('SuperAdmin')
        ? 'Level 5'
        : (user != null && user.roles.contains('FarmManager')
            ? 'Level 4'
            : 'Level 3');
    final permissions = user?.permissions ?? const <String>[];

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: AppColors.surfaceContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.eco, color: AppColors.secondary, size: 20),
            ),
            const SizedBox(width: 10),
            const Text(
              'Profile & Security',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: AppColors.primary,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.tune, color: AppColors.onSurfaceVariant),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Preferences opened.')),
              );
            },
          ),
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: activeRole.badgeColor,
              child: Text(
                initials,
                style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Hero Profile Card
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.03),
                      blurRadius: 10,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      children: [
                        // Avatar with Verified Ring
                        Stack(
                          children: [
                            Container(
                              width: 60,
                              height: 60,
                              decoration: BoxDecoration(
                                color: activeRole.badgeColor,
                                shape: BoxShape.circle,
                              ),
                              child: Center(
                                child: Text(
                                  initials,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: Container(
                                width: 16,
                                height: 16,
                                decoration: BoxDecoration(
                                  color: AppColors.secondary,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.white, width: 2),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                displayName,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.onSurface,
                                ),
                              ),
                              Text(
                                email,
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AppColors.onSurfaceVariant,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(
                                  color: activeRole.badgeColor.withValues(alpha: 0.12),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    const Icon(Icons.shield, size: 12, color: AppColors.onSecondaryContainer),
                                    const SizedBox(width: 4),
                                    Text(
                                      'Active Role: $primaryRole',
                                      style: TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.w600,
                                        color: activeRole.badgeColor,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),

                    // Agro Telemetry Bar (3 Stats)
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        children: [
                          _buildTelemetryItem('${assignedRoles.length}', 'Assigned Roles', activeRole.badgeColor),
                          Container(width: 1, height: 30, color: AppColors.borderClean),
                          _buildTelemetryItem('99.4%', 'Sync Health', AppColors.secondary),
                          Container(width: 1, height: 30, color: AppColors.borderClean),
                          _buildTelemetryItem(clearanceLevel, 'Clearance', AppColors.primaryContainer),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // Switch Role Button
                    SizedBox(
                      width: double.infinity,
                      height: 44,
                      child: ElevatedButton.icon(
                        onPressed: () => _showRoleSelectorModal(context, ref, activeRole, assignedRoles),
                        icon: const Icon(Icons.swap_horiz, size: 18),
                        label: const Text(
                          'Switch Role / Operational Context',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: activeRole.badgeColor,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Section 1: Account
              _buildSectionHeader('Account', 'Sync Active', AppColors.secondary),
              const SizedBox(height: 6),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.02),
                      blurRadius: 8,
                      offset: const Offset(0, 1),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    _buildSettingsTile(
                      icon: Icons.badge_outlined,
                      title: 'Personal Information',
                      subtitle: '$displayName • $position',
                      trailing: const Icon(Icons.chevron_right, color: AppColors.onSurfaceVariant),
                      onTap: () {},
                    ),
                    const Divider(height: 1, indent: 56, endIndent: 16, color: AppColors.surfaceContainer),
                    _buildSettingsTile(
                      icon: Icons.translate,
                      title: 'Preferred Language',
                      subtitle: 'English (US) / Amharic / Afaan Oromoo',
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceContainer,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Text(
                              'EN/AM/OM',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: AppColors.onSurfaceVariant,
                              ),
                            ),
                          ),
                          const SizedBox(width: 4),
                          const Icon(Icons.chevron_right, color: AppColors.onSurfaceVariant),
                        ],
                      ),
                      onTap: () {},
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Section 2: Access & Jurisdiction
              _buildSectionHeader('Access & Jurisdiction'),
              const SizedBox(height: 6),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.02),
                      blurRadius: 8,
                      offset: const Offset(0, 1),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    _buildSettingsTile(
                      icon: Icons.shield_outlined,
                      title: 'Active Role',
                      subtitle: allRolesFormatted,
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: activeRole.badgeColor.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          activeRole.shortCode,
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: activeRole.badgeColor,
                          ),
                        ),
                      ),
                    ),
                    const Divider(height: 1, indent: 56, endIndent: 16, color: AppColors.surfaceContainer),
                    _buildSettingsTile(
                      icon: Icons.apartment,
                      title: 'Organization',
                      subtitle: 'Z•ORISIS Holding • Agri-ERP',
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainer,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'HQ Agritech',
                          style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant),
                        ),
                      ),
                    ),
                    const Divider(height: 1, indent: 56, endIndent: 16, color: AppColors.surfaceContainer),
                    _buildSettingsTile(
                      icon: Icons.location_on_outlined,
                      title: 'Branch Scope',
                      subtitle: branchScope,
                      trailing: IconButton(
                        icon: const Icon(Icons.travel_explore, color: AppColors.secondary, size: 20),
                        onPressed: () {},
                      ),
                    ),
                    const Divider(height: 1, indent: 56, endIndent: 16, color: AppColors.surfaceContainer),
                    _buildSettingsTile(
                      icon: Icons.sync,
                      title: 'Offline Database',
                      subtitle: 'Drift SQLite Engine • All tables synced',
                      trailing: const Icon(Icons.check_circle, color: AppColors.secondary, size: 20),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Section 3: Granted Permissions (RBAC)
              _buildSectionHeader(
                'Granted Permissions',
                '${permissions.length} Active',
                AppColors.secondary,
              ),
              const SizedBox(height: 6),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.02),
                      blurRadius: 8,
                      offset: const Offset(0, 1),
                    ),
                  ],
                ),
                child: permissions.isEmpty
                    ? const Text(
                        'Standard field operator permissions active.',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.onSurfaceVariant,
                        ),
                      )
                    : Wrap(
                        spacing: 6,
                        runSpacing: 6,
                        children: permissions.map((perm) {
                          return Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.surfaceContainerLow,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: AppColors.borderClean,
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(
                                  Icons.check_circle_outline,
                                  size: 13,
                                  color: AppColors.secondary,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  perm,
                                  style: const TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.primary,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
              ),
              const SizedBox(height: 24),

              // Sign Out Button
              SizedBox(
                width: double.infinity,
                height: 48,
                child: OutlinedButton.icon(
                  onPressed: () async {
                    await ref.read(authNotifierProvider.notifier).logout();
                    if (context.mounted) {
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const WelcomeSplashScreen(),
                        ),
                        (route) => false,
                      );
                    }
                  },
                  icon: const Icon(Icons.logout, size: 18, color: AppColors.error),
                  label: const Text(
                    'Sign Out of Terminal',
                    style: TextStyle(
                      color: AppColors.error,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  style: OutlinedButton.styleFrom(
                    side: const BorderSide(color: AppColors.errorContainer),
                    backgroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTelemetryItem(String value, String label, Color valueColor) {
    return Expanded(
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: valueColor,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              color: AppColors.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, [String? status, Color? statusColor]) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title.toUpperCase(),
          style: const TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: AppColors.onSurfaceVariant,
            letterSpacing: 1.0,
          ),
        ),
        if (status != null && status.isNotEmpty)
          Text(
            status,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: statusColor ?? AppColors.onSurfaceVariant,
            ),
          ),
      ],
    );
  }

  Widget _buildSettingsTile({
    required IconData icon,
    required String title,
    required String subtitle,
    Widget? trailing,
    VoidCallback? onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 12.0),
        child: Row(
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: AppColors.surfaceContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(icon, color: AppColors.primary, size: 18),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.onSurface,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppColors.onSurfaceVariant,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            if (trailing != null) trailing,
          ],
        ),
      ),
    );
  }

  void _showRoleSelectorModal(
    BuildContext context,
    WidgetRef ref,
    _RoleInfo activeRole,
    List<_RoleInfo> assignedRoles,
  ) {
    showModalBottomSheet<void>(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: AppColors.borderClean,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Switch Operational Role',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.onSurface,
                ),
              ),
              const SizedBox(height: 12),
              ...assignedRoles.map((role) {
                final isActive = role.rawRole == activeRole.rawRole;
                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: CircleAvatar(
                    backgroundColor: role.badgeColor,
                    radius: 18,
                    child: Text(
                      role.shortCode,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  title: Text(
                    _formatRoleName(role.rawRole),
                    style: TextStyle(
                      fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                      color: AppColors.onSurface,
                    ),
                  ),
                  trailing: isActive
                      ? const Icon(Icons.check_circle, color: AppColors.secondary)
                      : null,
                  onTap: () {
                    Navigator.of(ctx).pop();
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Switched to ${_formatRoleName(role.rawRole)}'),
                      ),
                    );
                  },
                );
              }),
            ],
          ),
        );
      },
    );
  }
}
