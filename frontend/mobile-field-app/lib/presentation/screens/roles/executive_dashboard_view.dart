import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_theme.dart';
import '../../providers/auth_provider.dart';

class ExecutiveDashboardView extends ConsumerWidget {
  final VoidCallback? onNavigateToApprovals;
  final VoidCallback? onNavigateToAnalytics;
  final VoidCallback? onNavigateToProfile;

  const ExecutiveDashboardView({
    super.key,
    this.onNavigateToApprovals,
    this.onNavigateToAnalytics,
    this.onNavigateToProfile,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authNotifierProvider);
    final user = authState is AuthAuthenticated ? authState.user : null;
    final userName = user?.displayName.isNotEmpty == true ? user!.displayName : 'Dr. Girma Bekele';

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
              child: const Icon(Icons.insights, color: AppColors.primaryContainer, size: 22),
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
                  'Enterprise Macro Cockpit • HQ',
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
            // KPI Grid
            Row(
              children: [
                Expanded(
                  child: _buildMetricTile(
                    title: 'Planted Area',
                    value: '14,280 ha',
                    subtitle: '+12% YoY growth',
                    icon: Icons.terrain,
                    color: AppColors.primaryContainer,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildMetricTile(
                    title: 'Active Farmers',
                    value: '6,420',
                    subtitle: '98% contracted',
                    icon: Icons.groups,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildMetricTile(
                    title: 'Export Quota',
                    value: '88.5%',
                    subtitle: '4,425 / 5,000 MT',
                    icon: Icons.flight_takeoff,
                    color: AppColors.primaryContainer,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildMetricTile(
                    title: 'Loan Recovery',
                    value: '94.1%',
                    subtitle: 'Strong performance',
                    icon: Icons.account_balance,
                    color: AppColors.secondary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // High Value Approvals Deck
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Executive Approvals Deck',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.onSurface),
                ),
                TextButton(
                  onPressed: onNavigateToApprovals,
                  child: const Text('View Deck (3)'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            _buildExecutiveApprovalCard(
              context: context,
              title: 'Awash Agricultural Union Master Contract',
              scope: 'Commercial Agreement > 500 Hectares',
              exposure: '3,200,000 ETB',
              auditStatus: 'Legal Reviewed • Finance Audited',
            ),
            const SizedBox(height: 24),

            // Regional Intake Comparison
            const Text(
              'Regional Intake Distribution',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 10),
            _buildRegionalBar('Oromia Hub (Jimma & Bale)', 0.52, '52% • 2,300 MT'),
            const SizedBox(height: 10),
            _buildRegionalBar('Amhara Hub (Bahar Dar)', 0.31, '31% • 1,370 MT'),
            const SizedBox(height: 10),
            _buildRegionalBar('Sidama Hub (Hawassa)', 0.17, '17% • 755 MT'),
          ],
        ),
      ),
    );
  }

  Widget _buildMetricTile({
    required String title,
    required String value,
    required String subtitle,
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
                style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant, fontWeight: FontWeight.w500),
              ),
              Icon(icon, size: 18, color: color),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.onSurface),
          ),
          const SizedBox(height: 4),
          Text(subtitle, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: color)),
        ],
      ),
    );
  }

  Widget _buildExecutiveApprovalCard({
    required BuildContext context,
    required String title,
    required String scope,
    required String exposure,
    required String auditStatus,
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
          Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
          const SizedBox(height: 4),
          Text(scope, style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Exposure: $exposure', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
              Text(auditStatus, style: const TextStyle(fontSize: 11, color: AppColors.secondary, fontWeight: FontWeight.w600)),
            ],
          ),
          const SizedBox(height: 14),
          SizedBox(
            width: double.infinity,
            height: 42,
            child: ElevatedButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Executive Slide-to-Approve modal triggered')),
                );
              },
              icon: const Icon(Icons.fingerprint, size: 20),
              label: const Text('Review & Sign-Off (Biometric)', style: TextStyle(fontWeight: FontWeight.bold)),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryContainer,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRegionalBar(String hubName, double ratio, String detail) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppColors.borderClean),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(hubName, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
              Text(detail, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
            ],
          ),
          const SizedBox(height: 8),
          LinearProgressIndicator(
            value: ratio,
            backgroundColor: AppColors.surfaceContainerLow,
            valueColor: const AlwaysStoppedAnimation<Color>(AppColors.primaryContainer),
            minHeight: 6,
            borderRadius: BorderRadius.circular(3),
          ),
        ],
      ),
    );
  }
}
