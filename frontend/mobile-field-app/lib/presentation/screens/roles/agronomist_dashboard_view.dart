import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';
import '../../providers/auth_provider.dart';

class AgronomistDashboardView extends ConsumerWidget {
  final VoidCallback? onNavigateToFarmers;
  final VoidCallback? onNavigateToInspections;
  final VoidCallback? onNavigateToProfile;

  const AgronomistDashboardView({
    super.key,
    this.onNavigateToFarmers,
    this.onNavigateToInspections,
    this.onNavigateToProfile,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authNotifierProvider);
    final user = authState is AuthAuthenticated ? authState.user : null;
    final userName = user?.displayName.isNotEmpty == true ? user!.displayName : 'Dawit Kebede';
    final branchName = user?.department.isNotEmpty == true ? user!.department : 'Jimma Woreda Hub';

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        titleSpacing: 16,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppColors.primaryContainer.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.eco, color: AppColors.secondary, size: 22),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Good morning, $userName',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
                Text(
                  '$branchName • Oromia',
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.secondaryContainer.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.secondary.withValues(alpha: 0.2)),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.cloud_done, size: 14, color: AppColors.secondary),
                SizedBox(width: 4),
                Text(
                  '12 Queued',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // KPI Metrics Grid (2x2)
            Row(
              children: [
                Expanded(
                  child: _buildKpiCard(
                    title: 'Active Farmers',
                    value: '142',
                    trend: '+4 this week',
                    icon: Icons.people,
                    color: AppColors.primaryContainer,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildKpiCard(
                    title: 'Mapped Area',
                    value: '320.5 ha',
                    trend: '94% verified',
                    icon: Icons.map,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildKpiCard(
                    title: 'Visits Due Today',
                    value: '6',
                    trend: '2 high priority',
                    icon: Icons.event_note,
                    color: const Color(0xFFC05621),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildKpiCard(
                    title: 'Cluster Vigour',
                    value: '88%',
                    trend: 'Optimal vegetative',
                    icon: Icons.grass,
                    color: AppColors.primaryContainer,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Quick Operations Strip
            const Text(
              'Field Actions',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppColors.onSurface,
              ),
            ),
            const SizedBox(height: 10),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildQuickAction(
                    context: context,
                    label: '+ Register Farmer',
                    icon: Icons.person_add_alt_1,
                    color: AppColors.primaryContainer,
                    onTap: () => Navigator.of(context).pushNamed('/farmer-registration'),
                  ),
                  const SizedBox(width: 10),
                  _buildQuickAction(
                    context: context,
                    label: '+ Walk Boundary',
                    icon: Icons.polyline,
                    color: AppColors.secondary,
                    onTap: () => Navigator.of(context).pushNamed('/parcel-mapping'),
                  ),
                  const SizedBox(width: 10),
                  _buildQuickAction(
                    context: context,
                    label: '+ Log Inspection',
                    icon: Icons.fact_check,
                    color: const Color(0xFF9C4221),
                    onTap: () => Navigator.of(context).pushNamed('/field-inspection'),
                  ),
                  const SizedBox(width: 10),
                  _buildQuickAction(
                    context: context,
                    label: '+ Issue Inputs',
                    icon: Icons.inventory,
                    color: const Color(0xFF4A3E72),
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Input Distribution Receipt modal')),
                      );
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Today's Itinerary
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Today's Itinerary",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSurface,
                  ),
                ),
                TextButton(
                  onPressed: onNavigateToInspections,
                  child: const Text('View All (6)'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            _buildItineraryCard(
              context: context,
              farmerName: 'Tadesse Gemechu',
              parcelId: 'Parcel #P-JIM-042',
              crop: 'Red Teff • 2.4 ha',
              time: '09:30 AM',
              status: 'Urgent: Aphid Check',
              statusColor: AppColors.error,
            ),
            const SizedBox(height: 10),
            _buildItineraryCard(
              context: context,
              farmerName: 'Almaz Ayana',
              parcelId: 'Parcel #P-JIM-089',
              crop: 'White Maize • 1.8 ha',
              time: '11:45 AM',
              status: 'Routine Scouting',
              statusColor: AppColors.secondary,
            ),
            const SizedBox(height: 10),
            _buildItineraryCard(
              context: context,
              farmerName: 'Bekele Desta',
              parcelId: 'Parcel #P-JIM-115',
              crop: 'Haricot Bean • 3.1 ha',
              time: '02:15 PM',
              status: 'Fertilizer Audit',
              statusColor: const Color(0xFFC05621),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildKpiCard({
    required String title,
    required String value,
    required String trend,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
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
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 12,
                  color: AppColors.onSurfaceVariant,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Icon(icon, size: 18, color: color),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppColors.onSurface,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            trend,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAction({
    required BuildContext context,
    required String label,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withValues(alpha: 0.3)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 18, color: color),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildItineraryCard({
    required BuildContext context,
    required String farmerName,
    required String parcelId,
    required String crop,
    required String time,
    required String status,
    required Color statusColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderClean),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 10),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainerLow,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              children: [
                const Icon(Icons.schedule, size: 16, color: AppColors.onSurfaceVariant),
                const SizedBox(height: 4),
                Text(
                  time,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSurface,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      farmerName,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: AppColors.onSurface,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: statusColor.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: Text(
                        status,
                        style: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: statusColor,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  '$parcelId • $crop',
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.phone_outlined, size: 20, color: AppColors.secondary),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Calling $farmerName...')),
              );
            },
          ),
        ],
      ),
    );
  }
}
