import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class InputCreditRequisitionScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const InputCreditRequisitionScreen({super.key, this.onBack});

  @override
  State<InputCreditRequisitionScreen> createState() => _InputCreditRequisitionScreenState();
}

class _InputCreditRequisitionScreenState extends State<InputCreditRequisitionScreen> {
  final _boardResController = TextEditingController(text: 'RES-AW-2024-19');
  bool _isSubmitted = false;

  final List<Map<String, String>> _requisitionItems = [
    {'item': 'Certified Seed: Red Teff (Quncho)', 'qty': '4,800 kg (96 Bags)', 'amount': '201,600.00 ETB'},
    {'item': 'DAP Fertilizer (Basal Application)', 'qty': '9,600 kg (192 Bags)', 'amount': '153,600.00 ETB'},
    {'item': 'Urea Fertilizer (Top Dressing)', 'qty': '4,800 kg (96 Bags)', 'amount': '76,800.00 ETB'},
  ];

  @override
  void dispose() {
    _boardResController.dispose();
    super.dispose();
  }

  void _submitRequisition() {
    setState(() => _isSubmitted = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Bulk Seasonal Requisition submitted to Regional Operations Hub.'),
        backgroundColor: AppColors.secondary,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        titleSpacing: widget.onBack != null ? 0 : 16,
        leading: widget.onBack != null
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: widget.onBack,
              )
            : (Navigator.canPop(context)
                ? IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () => Navigator.pop(context),
                  )
                : null),
        title: const Text('Input Credit Requisition'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Union Scope Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Awash Farmers Cooperative Union', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  SizedBox(height: 2),
                  Text('Aggregation Cluster: 48 Registered Outgrowers • Mana Hub', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                  SizedBox(height: 10),
                  Text('Seasonal Credit Limit: 500,000.00 ETB (Available: 68,000 ETB)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.secondary)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Itemized Package
            const Text(
              'Aggregate Input Order',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _requisitionItems.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.borderClean),
                itemBuilder: (context, index) {
                  final item = _requisitionItems[index];
                  return Material(
                    type: MaterialType.transparency,
                    child: ListTile(
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                      leading: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppColors.primaryContainer.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(Icons.shopping_basket, color: AppColors.primaryContainer, size: 20),
                      ),
                      title: Text(item['item']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      subtitle: Text(item['qty']!, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      trailing: Text(item['amount']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),

            // Total Summary
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerLow,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Total Requisition Loan Exposure:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  Text('432,000.00 ETB', style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Board Authorization
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Cooperative Board Endorsement', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 10),
                  TextField(
                    controller: _boardResController,
                    decoration: const InputDecoration(labelText: 'Union Board Resolution Reference Number'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Submit Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _submitRequisition,
                icon: Icon(_isSubmitted ? Icons.check_circle : Icons.send),
                label: Text(
                  _isSubmitted ? 'Requisition #REQ-432 Submitted' : 'Submit Requisition to Regional Hub',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isSubmitted ? AppColors.secondary : AppColors.primaryContainer,
                  foregroundColor: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
