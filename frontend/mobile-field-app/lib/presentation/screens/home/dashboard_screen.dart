import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import '../farmer_registration/farmer_registration_screen.dart';
import '../field_inspection/field_inspection_screen.dart';
import '../parcel_mapping/parcel_mapping_screen.dart';

class DashboardScreen extends StatelessWidget {
  final VoidCallback? onSwitchToProfile;
  final VoidCallback? onSwitchToTasks;
  final VoidCallback? onSwitchToFarms;

  const DashboardScreen({
    super.key,
    this.onSwitchToProfile,
    this.onSwitchToTasks,
    this.onSwitchToFarms,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Top Section: User Header & Notifications
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'FIELD OPERATIONS',
                          style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                letterSpacing: 1.5,
                                color: AppColors.textMuted,
                              ),
                        ),
                        Text(
                          'Abebe Tesfaye',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: AppColors.onSurface,
                              ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                  Row(
                    children: [
                      // Notification Bell
                      Stack(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.04),
                                  blurRadius: 8,
                                ),
                              ],
                            ),
                            child: IconButton(
                              icon: const Icon(
                                Icons.notifications_none,
                                size: 22,
                                color: AppColors.primaryContainer,
                              ),
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text('Notifications: 2 urgent field alerts.')),
                                );
                              },
                            ),
                          ),
                          Positioned(
                            top: 8,
                            right: 8,
                            child: Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                color: AppColors.secondary,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(width: 10),

                      // Avatar AT with Online Status
                      GestureDetector(
                        onTap: onSwitchToProfile,
                        child: Stack(
                          children: [
                            Container(
                              width: 40,
                              height: 40,
                              decoration: const BoxDecoration(
                                color: AppColors.primaryContainer,
                                shape: BoxShape.circle,
                              ),
                              child: const Center(
                                child: Text(
                                  'AT',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: Container(
                                width: 10,
                                height: 10,
                                decoration: BoxDecoration(
                                  color: AppColors.secondary,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.white, width: 2),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // 2. Active Scope Card
              Container(
                padding: const EdgeInsets.all(14),
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
                child: Row(
                  children: [
                    Container(
                      width: 42,
                      height: 42,
                      decoration: BoxDecoration(
                        color: AppColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(
                        Icons.business,
                        color: AppColors.secondary,
                        size: 24,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Text(
                                'Farm Manager',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                  color: AppColors.primaryContainer,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppColors.secondaryContainer,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Text(
                                  'Active Scope',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.onSecondaryContainer,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'Oromia HQ • Central Region',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      width: 32,
                      height: 32,
                      decoration: const BoxDecoration(
                        color: AppColors.surfaceContainer,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.expand_more,
                        color: AppColors.primaryContainer,
                        size: 20,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // 3. 2x2 Metric Cards Grid
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 1.25,
                children: [
                  _buildMetricCard(
                    icon: Icons.landscape,
                    iconBg: AppColors.surfaceContainerLow,
                    iconColor: AppColors.secondary,
                    badgeText: 'Active',
                    badgeBg: AppColors.surfaceContainer,
                    badgeColor: AppColors.onSurfaceVariant,
                    metricValue: '12',
                    label: 'Farms',
                    subtext: 'All Active • 4,280 ha',
                    onTap: onSwitchToFarms,
                  ),
                  _buildMetricCard(
                    icon: Icons.grass,
                    iconBg: AppColors.surfaceContainerLow,
                    iconColor: AppColors.secondary,
                    badgeText: '94%',
                    badgeBg: AppColors.secondaryContainer,
                    badgeColor: AppColors.onSecondaryContainer,
                    metricValue: '6',
                    label: 'Crops',
                    subtext: '3 Harvesting • Prime',
                  ),
                  _buildMetricCard(
                    icon: Icons.checklist,
                    iconBg: AppColors.surfaceContainerLow,
                    iconColor: AppColors.secondary,
                    badgeText: '4 Due',
                    badgeBg: AppColors.errorContainer,
                    badgeColor: AppColors.onErrorContainer,
                    metricValue: '18',
                    label: 'Tasks',
                    subtext: '4 Due Today',
                    onTap: onSwitchToTasks,
                  ),
                  _buildMetricCard(
                    icon: Icons.warning_amber_rounded,
                    iconBg: AppColors.errorContainer,
                    iconColor: AppColors.onErrorContainer,
                    badgeText: 'Pending',
                    badgeBg: AppColors.error,
                    badgeColor: Colors.white,
                    metricValue: '2',
                    label: 'Alerts',
                    subtext: '1 Irrigation • 1 Pest',
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // 4. Quick Action Pills (Horizontal Scroll)
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    // New Field Log
                    _buildPillAction(
                      icon: Icons.add_circle,
                      label: '+ New Field Log',
                      isPrimary: true,
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Field log quick recorder active.')),
                        );
                      },
                    ),
                    const SizedBox(width: 8),

                    // Log Inspection (links to field inspection screen)
                    _buildPillAction(
                      icon: Icons.fact_check,
                      label: 'Log Inspection',
                      isPrimary: false,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const FieldInspectionScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(width: 8),

                    // Register Farmer (links to offline farmer registration)
                    _buildPillAction(
                      icon: Icons.person_add,
                      label: 'Register Farmer',
                      isPrimary: false,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const FarmerRegistrationScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(width: 8),

                    // Map Parcel (links to parcel mapping)
                    _buildPillAction(
                      icon: Icons.map,
                      label: 'Map Parcel',
                      isPrimary: false,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => const ParcelMappingScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(width: 8),

                    // Request Stock
                    _buildPillAction(
                      icon: Icons.inventory_2,
                      label: 'Request Stock',
                      isPrimary: false,
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Stock requisition form opened.')),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // 5. Crop Operations - Harvest Pipeline Card
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
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'CROP OPERATIONS',
                              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                    color: AppColors.secondary,
                                    fontWeight: FontWeight.bold,
                                    letterSpacing: 1.0,
                                  ),
                            ),
                            const Text(
                              'Harvest Pipeline',
                              style: TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.bold,
                                color: AppColors.onSurface,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceContainerLow,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text(
                            'Yield Peak',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: AppColors.secondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Banner Image with Progress Overlay
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: SizedBox(
                        height: 140,
                        width: double.infinity,
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            Image.asset(
                              'assets/images/harvest_banner.png',
                              fit: BoxFit.cover,
                              errorBuilder: (_, __, ___) => Container(
                                color: AppColors.primaryContainer,
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [
                                    Colors.transparent,
                                    AppColors.primaryContainer.withValues(alpha: 0.4),
                                    AppColors.primaryContainer.withValues(alpha: 0.92),
                                  ],
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 14,
                              left: 14,
                              right: 14,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  const Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Harar Block 3 Harvest',
                                        style: TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 15,
                                        ),
                                      ),
                                      Text(
                                        '68% of 540 MT gathered',
                                        style: TextStyle(
                                          color: Colors.white70,
                                          fontSize: 12,
                                        ),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    width: 36,
                                    height: 36,
                                    decoration: BoxDecoration(
                                      color: Colors.white.withValues(alpha: 0.25),
                                      shape: BoxShape.circle,
                                    ),
                                    child: const Icon(
                                      Icons.arrow_forward,
                                      color: Colors.white,
                                      size: 18,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // 6. Recent Activity List
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Recent Activity',
                    style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: AppColors.onSurface,
                    ),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'View All',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: AppColors.secondary,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // Activity Cards
              _buildActivityItem(
                icon: Icons.calendar_month,
                iconColor: AppColors.secondary,
                iconBg: AppColors.surfaceContainerLow,
                title: 'Farm Inspection Scheduled',
                subtitle: 'Block 4B Teff & Maize • Dr. Kebede',
                time: '10 mins ago',
                status: 'Scheduled',
                statusBg: AppColors.surfaceContainerHigh,
                statusColor: AppColors.primaryContainer,
              ),
              const SizedBox(height: 10),
              _buildActivityItem(
                icon: Icons.inventory_2,
                iconColor: AppColors.onSecondaryContainer,
                iconBg: AppColors.secondaryContainer,
                title: 'Inventory Updated',
                subtitle: 'Fertilizer NPK replenished (+120 bags)',
                time: '1 hour ago',
                status: 'Stocked',
                statusBg: AppColors.secondaryContainer,
                statusColor: AppColors.onSecondaryContainer,
              ),
              const SizedBox(height: 10),
              _buildActivityItem(
                icon: Icons.engineering,
                iconColor: AppColors.secondary,
                iconBg: AppColors.surfaceContainerLow,
                title: 'Task Assigned',
                subtitle: 'Drip line pressure check assigned to Dawit M.',
                time: '3 hours ago',
                status: 'In Progress',
                statusBg: AppColors.surfaceContainerHigh,
                statusColor: AppColors.onSurfaceVariant,
              ),
              const SizedBox(height: 10),
              _buildActivityItem(
                icon: Icons.verified,
                iconColor: AppColors.secondary,
                iconBg: AppColors.surfaceContainerLow,
                title: 'Approval Completed',
                subtitle: 'Diesel requisition for harvesting fleet approved',
                time: 'Yesterday',
                status: 'Approved',
                statusBg: AppColors.secondaryContainer,
                statusColor: AppColors.onSecondaryContainer,
              ),
              const SizedBox(height: 80), // Extra spacing for FAB & bottom nav
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const FieldInspectionScreen()),
          );
        },
        backgroundColor: AppColors.primaryContainer,
        foregroundColor: Colors.white,
        elevation: 6,
        shape: const CircleBorder(),
        child: const Icon(Icons.add, size: 28),
      ),
    );
  }

  Widget _buildMetricCard({
    required IconData icon,
    required Color iconBg,
    required Color iconColor,
    required String badgeText,
    required Color badgeBg,
    required Color badgeColor,
    required String metricValue,
    required String label,
    required String subtext,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.03),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: iconBg,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(icon, size: 18, color: iconColor),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                  decoration: BoxDecoration(
                    color: badgeBg,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    badgeText,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                      color: badgeColor,
                    ),
                  ),
                ),
              ],
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  metricValue,
                  style: const TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primaryContainer,
                    height: 1.1,
                  ),
                ),
                Text(
                  label,
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppColors.onSurface,
                  ),
                ),
                Text(
                  subtext,
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.onSurfaceVariant,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPillAction({
    required IconData icon,
    required String label,
    required bool isPrimary,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isPrimary ? AppColors.primaryContainer : Colors.white,
          borderRadius: BorderRadius.circular(999),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.04),
              blurRadius: 6,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 16,
              color: isPrimary ? Colors.white : AppColors.secondary,
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: isPrimary ? Colors.white : AppColors.primaryContainer,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem({
    required IconData icon,
    required Color iconColor,
    required Color iconBg,
    required String title,
    required String subtitle,
    required String time,
    required String status,
    required Color statusBg,
    required Color statusColor,
  }) {
    return Container(
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
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: iconBg,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, size: 20, color: iconColor),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.onSurface,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                      decoration: BoxDecoration(
                        color: statusBg,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        status,
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: statusColor,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 3),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.onSurfaceVariant,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  time,
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.outline,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
