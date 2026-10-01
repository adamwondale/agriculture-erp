import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ExecutivePulseAnalyticsScreen extends StatelessWidget {
  final VoidCallback? onBack;

  const ExecutivePulseAnalyticsScreen({super.key, this.onBack});

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
        title: const Text('Regional Portfolio Analytics'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Macro KPI 2x2 Grid
            Row(
              children: [
                Expanded(
                  child: _buildKpiBox('Total Planted Area', '14,280 ha', '+12% YoY', AppColors.primaryContainer),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildKpiBox('Contracted Smallholders', '6,420', '98% verified', AppColors.secondary),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildKpiBox('Export Quota Fulfilled', '88.5%', '4,425 / 5,000 MT', AppColors.primaryContainer),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildKpiBox('Seasonal Loan Recovery', '94.1%', 'High compliance', AppColors.secondary),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Regional Intake Comparison
            const Text(
              'Regional Terminal Intake Volume',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Column(
                children: [
                  _buildBarItem('Oromia Hub (Jimma & Bale)', 0.52, '2,300 MT (52%)', AppColors.primaryContainer),
                  const SizedBox(height: 12),
                  _buildBarItem('Amhara Hub (Bahar Dar Terminal)', 0.31, '1,370 MT (31%)', AppColors.secondary),
                  const SizedBox(height: 12),
                  _buildBarItem('Sidama Hub (Hawassa Terminal)', 0.17, '755 MT (17%)', const Color(0xFFC05621)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Commodity Portfolio Breakdown
            const Text(
              'Commodity Portfolio Aggregation',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Column(
                children: [
                  _buildCommodityRow('Red Teff (Quncho)', '2,124 MT', '48%', AppColors.primaryContainer),
                  const Divider(height: 16, color: AppColors.borderClean),
                  _buildCommodityRow('White Maize (BH-661)', '1,416 MT', '32%', AppColors.secondary),
                  const Divider(height: 16, color: AppColors.borderClean),
                  _buildCommodityRow('Haricot Bean (Awash-1)', '619 MT', '14%', const Color(0xFFC05621)),
                  const Divider(height: 16, color: AppColors.borderClean),
                  _buildCommodityRow('Specialty Arabica Coffee', '266 MT', '6%', const Color(0xFF4A3E72)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Strategic Operational Alerts
            const Text(
              'Enterprise Logistics & Storage Alerts',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF9F5),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFC05621).withValues(alpha: 0.3)),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Corridor Transit Delay • Welkite Post', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFFC05621))),
                  SizedBox(height: 2),
                  Text('2 freight trucks holding due to gravel detour past Welkite. Silo receiving slots rescheduled by 2 hours.', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildKpiBox(String title, String val, String trend, Color color) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.borderClean),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant, fontWeight: FontWeight.w500)),
          const SizedBox(height: 6),
          Text(val, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
          const SizedBox(height: 2),
          Text(trend, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color)),
        ],
      ),
    );
  }

  Widget _buildBarItem(String label, double ratio, String amount, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
            Text(amount, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.onSurfaceVariant)),
          ],
        ),
        const SizedBox(height: 6),
        LinearProgressIndicator(
          value: ratio,
          backgroundColor: AppColors.surfaceContainerLow,
          valueColor: AlwaysStoppedAnimation<Color>(color),
          minHeight: 7,
          borderRadius: BorderRadius.circular(3.5),
        ),
      ],
    );
  }

  Widget _buildCommodityRow(String name, String volume, String share, Color color) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(width: 8, height: 8, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
            const SizedBox(width: 8),
            Text(name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
          ],
        ),
        Row(
          children: [
            Text(volume, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
            const SizedBox(width: 8),
            Text('($share)', style: const TextStyle(fontSize: 11, color: AppColors.outline)),
          ],
        ),
      ],
    );
  }
}
