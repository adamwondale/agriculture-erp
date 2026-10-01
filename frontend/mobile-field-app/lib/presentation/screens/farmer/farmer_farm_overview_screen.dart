import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FarmerFarmOverviewScreen extends StatelessWidget {
  final VoidCallback? onBack;

  const FarmerFarmOverviewScreen({super.key, this.onBack});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        titleSpacing: onBack != null ? 0 : 16,
        leading: onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: onBack,
              )
            : (Navigator.canPop(context)
                ? IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () => Navigator.pop(context),
                  )
                : null),
        title: const Text('My Farm Parcels & Crops'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Farmer Hero Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppColors.secondaryContainer.withValues(alpha: 0.4),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.eco, color: AppColors.secondary, size: 24),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Tadesse Gemechu', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                        SizedBox(height: 2),
                        Text('Mana Woreda • Bilida Kebele • Outgrower Grade A', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Parcel 1 Card
            _buildParcelCard(
              context: context,
              parcelName: 'Parcel 1 • Red Teff (Quncho)',
              area: '2.4 Hectares',
              stage: 'Flowering Stage (Heading)',
              progress: 0.65,
              healthStatus: 'Grade A Healthy',
              statusColor: AppColors.secondary,
              agronomistNote: 'Next scheduled visit: Thursday, 12 Oct (Dawit Kebede)',
            ),
            const SizedBox(height: 12),

            // Parcel 2 Card
            _buildParcelCard(
              context: context,
              parcelName: 'Parcel 2 • Haricot Bean (Awash-1)',
              area: '1.1 Hectares',
              stage: 'Pod Formation Stage',
              progress: 0.80,
              healthStatus: 'Optimal Vigour',
              statusColor: AppColors.secondary,
              agronomistNote: 'Next scheduled visit: Monday, 16 Oct (Dawit Kebede)',
            ),
            const SizedBox(height: 20),

            // Action Assistance
            SizedBox(
              width: double.infinity,
              height: 46,
              child: OutlinedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Agronomist advisory request sent to Jimma Woreda Hub.')),
                  );
                },
                icon: const Icon(Icons.support_agent, size: 18),
                label: const Text('Request Extension Officer Field Visit', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildParcelCard({
    required BuildContext context,
    required String parcelName,
    required String area,
    required String stage,
    required double progress,
    required String healthStatus,
    required Color statusColor,
    required String agronomistNote,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.borderClean),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(parcelName, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(healthStatus, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: statusColor)),
              ),
            ],
          ),
          const SizedBox(height: 2),
          Text(area, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(stage, style: const TextStyle(fontSize: 11, color: AppColors.outline)),
              Text('${(progress * 100).toInt()}% towards harvest', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary)),
            ],
          ),
          const SizedBox(height: 6),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: AppColors.surfaceContainerLow,
            valueColor: AlwaysStoppedAnimation<Color>(statusColor),
            minHeight: 6,
            borderRadius: BorderRadius.circular(3),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainerLow,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                const Icon(Icons.event_note, size: 14, color: AppColors.primaryContainer),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(agronomistNote, style: const TextStyle(fontSize: 11, color: AppColors.primaryContainer, fontWeight: FontWeight.w600)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
