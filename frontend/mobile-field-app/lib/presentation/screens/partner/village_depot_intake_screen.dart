import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class VillageDepotIntakeScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const VillageDepotIntakeScreen({super.key, this.onBack});

  @override
  State<VillageDepotIntakeScreen> createState() => _VillageDepotIntakeScreenState();
}

class _VillageDepotIntakeScreenState extends State<VillageDepotIntakeScreen> {
  String _farmerName = 'Tadesse Gemechu';
  final _bagsController = TextEditingController(text: '18');
  final _weightController = TextEditingController(text: '1800');
  String _moisture = '12.5% (Safe)';
  bool _isIssued = false;

  @override
  void dispose() {
    _bagsController.dispose();
    _weightController.dispose();
    super.dispose();
  }

  void _issueSlip() {
    setState(() => _isIssued = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Village Depot Intake Slip #SLIP-BIL-19 generated & saved.'),
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
        title: const Text('Village Depot Intake Slip'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Depot Header
            Container(
              padding: const EdgeInsets.all(14),
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
                      color: AppColors.primaryContainer.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.inventory_2, color: AppColors.primaryContainer, size: 24),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Bilida Village Depot #1', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                        SizedBox(height: 2),
                        Text('Mana Woreda • Awash Union Aggregator', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Intake Slip Details Form
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
                  const Text('Smallholder Intake Parameters', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _farmerName,
                    decoration: const InputDecoration(labelText: 'Beneficiary Farmer'),
                    items: const [
                      DropdownMenuItem(value: 'Tadesse Gemechu', child: Text('Tadesse Gemechu (Bilida Kebele)')),
                      DropdownMenuItem(value: 'Almaz Ayana', child: Text('Almaz Ayana (Sombo Kebele)')),
                      DropdownMenuItem(value: 'Fatuma Abdi', child: Text('Fatuma Abdi (Bilida Kebele)')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _farmerName = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _bagsController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(labelText: 'Bags Delivered', suffixText: 'Bags'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextField(
                          controller: _weightController,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(labelText: 'Gross Weight', suffixText: 'kg'),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _moisture,
                    decoration: const InputDecoration(labelText: 'Field Moisture Check'),
                    items: const [
                      DropdownMenuItem(value: '12.5% (Safe)', child: Text('12.5% (Safe • Compliant)')),
                      DropdownMenuItem(value: '13.2% (Acceptable)', child: Text('13.2% (Acceptable for Warehouse)')),
                      DropdownMenuItem(value: '14.5% (High Moisture)', child: Text('14.5% (High Moisture • Aerate)')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _moisture = val);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Summary Card
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
                  Text('Estimated Value at Floor Price:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  Text('48,000.00 ETB', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Generate Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _issueSlip,
                icon: Icon(_isIssued ? Icons.check_circle : Icons.receipt_long),
                label: Text(
                  _isIssued ? 'Intake Slip #SLIP-19 Issued' : 'Issue Farmer Village Intake Slip',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isIssued ? AppColors.secondary : AppColors.primaryContainer,
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
