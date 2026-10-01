import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class InputDistributionReceiptScreen extends StatefulWidget {
  const InputDistributionReceiptScreen({super.key});

  @override
  State<InputDistributionReceiptScreen> createState() => _InputDistributionReceiptScreenState();
}

class _InputDistributionReceiptScreenState extends State<InputDistributionReceiptScreen> {
  String _selectedFarmer = 'Tadesse Gemechu (Mana Woreda)';
  final TextEditingController _otpController = TextEditingController(text: '839201');
  bool _thumbprintVerified = true;
  bool _isIssued = false;

  final List<Map<String, String>> _allocatedInputs = [
    {
      'name': 'Certified Seed: Red Teff (Quncho)',
      'qty': '50 kg (2 Bags)',
      'lot': 'Lot #SD-2024-Q81',
      'cost': '2,100 ETB',
    },
    {
      'name': 'DAP Fertilizer (Basal Application)',
      'qty': '100 kg (2 Bags)',
      'lot': 'Lot #FT-DAP-019',
      'cost': '1,600 ETB',
    },
    {
      'name': 'Urea Fertilizer (Top Dressing)',
      'qty': '50 kg (1 Bag)',
      'lot': 'Lot #FT-UREA-044',
      'cost': '800 ETB',
    },
  ];

  @override
  void dispose() {
    _otpController.dispose();
    super.dispose();
  }

  void _issueReceipt() {
    setState(() {
      _isIssued = true;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Input Distribution Receipt generated & queued for local sync.'),
        backgroundColor: AppColors.primaryContainer,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: const Text('Input Distribution Receipt'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Farmer Selection Card
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
                  const Text(
                    'Beneficiary Smallholder',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.outline),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    initialValue: _selectedFarmer,
                    decoration: const InputDecoration(
                      contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                    ),
                    items: const [
                      DropdownMenuItem(
                        value: 'Tadesse Gemechu (Mana Woreda)',
                        child: Text('Tadesse Gemechu (Mana Woreda)'),
                      ),
                      DropdownMenuItem(
                        value: 'Almaz Ayana (Mana Woreda)',
                        child: Text('Almaz Ayana (Mana Woreda)'),
                      ),
                      DropdownMenuItem(
                        value: 'Bekele Desta (Jimma Woreda)',
                        child: Text('Bekele Desta (Jimma Woreda)'),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedFarmer = val);
                    },
                  ),
                  const SizedBox(height: 10),
                  const Row(
                    children: [
                      Icon(Icons.badge, size: 16, color: AppColors.secondary),
                      SizedBox(width: 6),
                      Text('Fayda ID: ET-9401-2291-8840 • Telebirr: 0911428831', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Allocated Package
            const Text(
              'Allocated Season Inputs',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.onSurface),
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
                itemCount: _allocatedInputs.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.borderClean),
                itemBuilder: (context, index) {
                  final item = _allocatedInputs[index];
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
                        child: const Icon(Icons.inventory_2, color: AppColors.primaryContainer, size: 20),
                      ),
                      title: Text(item['name']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                      subtitle: Text('${item['qty']} • ${item['lot']}', style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      trailing: Text(item['cost']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
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
                  Text('Total Input Credit Value:', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  Text('4,500.00 ETB', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Beneficiary Verification Gate
            const Text(
              'Handover Verification & Consent',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.onSurface),
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
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Checkbox(
                        value: _thumbprintVerified,
                        activeColor: AppColors.secondary,
                        onChanged: (val) => setState(() => _thumbprintVerified = val ?? false),
                      ),
                      const Expanded(
                        child: Text(
                          'Beneficiary physical thumbprint / signature confirmed on physical roster slip',
                          style: TextStyle(fontSize: 12, color: AppColors.onSurface),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: _otpController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      labelText: 'Farmer SMS OTP Verification Code',
                      hintText: 'Enter 6-digit code sent to farmer phone',
                      prefixIcon: Icon(Icons.pin, size: 20),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Issue Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _thumbprintVerified && !_isIssued ? _issueReceipt : null,
                icon: Icon(_isIssued ? Icons.check_circle : Icons.receipt_long),
                label: Text(
                  _isIssued ? 'Voucher #VCH-2024-940 Issued' : 'Issue Input Voucher & Sign Digital Slip',
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
