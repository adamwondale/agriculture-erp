import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import '../auth/welcome_splash_screen.dart';

class ProfileSecurityScreen extends StatelessWidget {
  const ProfileSecurityScreen({super.key});

  @override
  Widget build(BuildContext context) {
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
          const Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: AppColors.primaryContainer,
              child: Icon(Icons.person, color: Colors.white, size: 18),
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
                              decoration: const BoxDecoration(
                                color: AppColors.primaryContainer,
                                shape: BoxShape.circle,
                              ),
                              child: const Center(
                                child: Text(
                                  'AT',
                                  style: TextStyle(
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
                              const Text(
                                'Abebe Tesfaye',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.onSurface,
                                ),
                              ),
                              const Text(
                                'abebe.tesfaye@zorisis.com',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: AppColors.onSurfaceVariant,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(
                                  color: AppColors.secondaryContainer,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.grass, size: 12, color: AppColors.onSecondaryContainer),
                                    SizedBox(width: 4),
                                    Text(
                                      'Active Role: Farm Manager',
                                      style: TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.onSecondaryContainer,
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
                          _buildTelemetryItem('12', 'Assigned Parcels', AppColors.primaryContainer),
                          Container(width: 1, height: 30, color: AppColors.borderClean),
                          _buildTelemetryItem('99.4%', 'Sync Health', AppColors.secondary),
                          Container(width: 1, height: 30, color: AppColors.borderClean),
                          _buildTelemetryItem('Level 4', 'Clearance', AppColors.primaryContainer),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),

                    // Switch Role Button
                    SizedBox(
                      width: double.infinity,
                      height: 44,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Agronomic role selector opened.')),
                          );
                        },
                        icon: const Icon(Icons.swap_horiz, size: 18),
                        label: const Text(
                          'Switch Role / Context',
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primary,
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
                      subtitle: 'Abebe Tesfaye • Phone: +251 91 234 5678',
                      trailing: const Icon(Icons.chevron_right, color: AppColors.onSurfaceVariant),
                      onTap: () {},
                    ),
                    const Divider(height: 1, indent: 56, endIndent: 16, color: AppColors.surfaceContainer),
                    _buildSettingsTile(
                      icon: Icons.translate,
                      title: 'Preferred Language',
                      subtitle: 'English (US) / Amharic',
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
                              'EN/AM',
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
                      subtitle: 'Farm Manager',
                      trailing: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.secondaryContainer,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'Primary Scope',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: AppColors.onSecondaryContainer,
                          ),
                        ),
                      ),
                    ),
                    const Divider(height: 1, indent: 56, endIndent: 16, color: AppColors.surfaceContainer),
                    _buildSettingsTile(
                      icon: Icons.apartment,
                      title: 'Organization',
                      subtitle: 'Z•ORISIS Holding',
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
                      subtitle: 'Oromia HQ • Central Region',
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
              const SizedBox(height: 24),

              // Sign Out Button
              SizedBox(
                width: double.infinity,
                height: 48,
                child: OutlinedButton.icon(
                  onPressed: () {
                    Navigator.pushAndRemoveUntil(
                      context,
                      MaterialPageRoute(builder: (_) => const WelcomeSplashScreen()),
                      (route) => false,
                    );
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
}
