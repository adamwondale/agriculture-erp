import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';
import '../../providers/auth_provider.dart';

class FarmerDashboardView extends ConsumerWidget {
  final VoidCallback? onNavigateToHarvest;
  final VoidCallback? onNavigateToPayments;
  final VoidCallback? onNavigateToAdvisory;
  final VoidCallback? onNavigateToProfile;

  const FarmerDashboardView({
    super.key,
    this.onNavigateToHarvest,
    this.onNavigateToPayments,
    this.onNavigateToAdvisory,
    this.onNavigateToProfile,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authNotifierProvider);
    final user = authState is AuthAuthenticated ? authState.user : null;
    final userName = user?.displayName.isNotEmpty == true ? user!.displayName : 'Tadesse Gemechu';

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        titleSpacing: 16,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppColors.secondaryContainer.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.eco, color: AppColors.secondary, size: 22),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  userName,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
                const Text(
                  'Mana Woreda • Bilida Kebele',
                  style: TextStyle(
                    fontSize: 12,
                    color: AppColors.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Crop Growth Status Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.04),
                    blurRadius: 10,
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
                      const Text(
                        'Parcel 1 • Red Teff',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: AppColors.primary,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.secondaryContainer.withValues(alpha: 0.4),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text(
                          'Healthy (Grade A)',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Growth: Flowering Stage', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                      Text('65% Towards Harvest', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  LinearProgressIndicator(
                    value: 0.65,
                    backgroundColor: AppColors.surfaceContainerLow,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.secondary),
                    minHeight: 8,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  const SizedBox(height: 14),
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceContainerLow,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.event, size: 16, color: AppColors.primaryContainer),
                        SizedBox(width: 8),
                        Text(
                          'Next Agronomist Visit: Thursday, 12 Oct (Dawit)',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.primaryContainer),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Financial Settlement Overview
            const Text(
              'Earnings & Input Credit',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: const Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Total Harvest Delivered', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                      Text('18 Quintals', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                    ],
                  ),
                  Divider(height: 20, color: AppColors.borderClean),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Input Credit Deducted', style: TextStyle(fontSize: 13, color: AppColors.onSurfaceVariant)),
                      Text('-4,500 ETB', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.error)),
                    ],
                  ),
                  Divider(height: 20, color: AppColors.borderClean),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Net Telebirr Payout', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primary)),
                      Text('34,000 ETB', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Weather & Voice Advisory
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerLow,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Row(
                children: [
                  const Icon(Icons.wb_sunny, color: Color(0xFFC05621), size: 28),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Jimma Weather: 24°C', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                        Text('85% Rain Expected Friday - Postpone fertilizer', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.volume_up, color: AppColors.secondary),
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Playing voice advisory in Amharic...')),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
