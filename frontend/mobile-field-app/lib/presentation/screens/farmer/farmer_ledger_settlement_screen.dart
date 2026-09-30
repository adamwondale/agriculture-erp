import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FarmerLedgerSettlementScreen extends StatelessWidget {
  final VoidCallback? onBack;

  const FarmerLedgerSettlementScreen({super.key, this.onBack});

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
        title: const Text('Harvest Earnings & Ledger'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Net Telebirr Payout Hero Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.borderClean),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.02),
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
                      const Text('NET HARVEST PAYOUT', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.outline)),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.secondaryContainer.withValues(alpha: 0.4),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text('Disbursed via Telebirr', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text('34,000.00 ETB', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                  const SizedBox(height: 4),
                  const Text('Telebirr Tx: TB-2024-88491290 • Sent 24 Sep 2026', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                  const Divider(height: 24, color: AppColors.borderClean),

                  // Breakdown
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Gross Harvest Delivery (18 Qtl):', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                      Text('+48,000.00 ETB', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Input Credit Repayment (Seed & DAP):', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                      Text('-12,400.00 ETB', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.error)),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Woreda Depot Handling & Logistics Fee:', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                      Text('-1,600.00 ETB', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.error)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Chronological Receipts
            const Text(
              'Delivery & Transaction History',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 10),
            _buildTransactionCard('Depot Intake #SLIP-BIL-19', '18 Quintals Red Teff Delivered', 'Mana Bilida Depot', '22 Sep 2026', '+48,000 ETB'),
            const SizedBox(height: 10),
            _buildTransactionCard('Seasonal Input Credit Voucher #VCH-88', '50kg Teff Seed + 150kg Fertilizers', 'Jimma Woreda Hub', '12 May 2026', '-12,400 ETB'),
            const SizedBox(height: 20),

            // Dispute Action
            SizedBox(
              width: double.infinity,
              height: 44,
              child: OutlinedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Settlement inquiry submitted to Cooperative Accounting.')),
                  );
                },
                child: const Text('Request Settlement Clarification', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTransactionCard(String ref, String desc, String location, String date, String amount) {
    final isCredit = amount.startsWith('+');
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderClean),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(ref, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                const SizedBox(height: 2),
                Text(desc, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                const SizedBox(height: 2),
                Text('$location • $date', style: const TextStyle(fontSize: 10, color: AppColors.outline)),
              ],
            ),
          ),
          Text(
            amount,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
              color: isCredit ? AppColors.secondary : AppColors.error,
            ),
          ),
        ],
      ),
    );
  }
}
