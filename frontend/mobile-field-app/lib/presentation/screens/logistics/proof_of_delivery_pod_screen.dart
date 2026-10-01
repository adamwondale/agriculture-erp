import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ProofOfDeliveryPodScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const ProofOfDeliveryPodScreen({super.key, this.onBack});

  @override
  State<ProofOfDeliveryPodScreen> createState() => _ProofOfDeliveryPodScreenState();
}

class _ProofOfDeliveryPodScreenState extends State<ProofOfDeliveryPodScreen> {
  final _consigneeNameController = TextEditingController(text: 'Alemayehu Tadesse');
  final _consigneeTitleController = TextEditingController(text: 'ECX Terminal Receiving Officer');
  bool _bagsCounted = true;
  bool _sealsIntact = true;
  bool _noMoistureDamage = true;
  bool _isSigned = true;
  bool _isDelivered = false;

  @override
  void dispose() {
    _consigneeNameController.dispose();
    _consigneeTitleController.dispose();
    super.dispose();
  }

  void _confirmPod() {
    setState(() => _isDelivered = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Consignee Proof of Delivery (POD) signed and completed.'),
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
        title: const Text('Proof of Delivery (POD)'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Consignment Overview Card
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('WAYBILL #WB-2024-991', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                      Text('18.00 MT Net Grain', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                    ],
                  ),
                  SizedBox(height: 6),
                  Text('Destination: Addis Central Silo Terminal • Gate B', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                  Text('Consignee: Ethiopian Commodity Exchange (ECX)', style: TextStyle(fontSize: 12, color: AppColors.outline)),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Seal & Condition Verification Checklist
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
                  const Text('Consignment Verification Checklist', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 10),
                  Material(
                    type: MaterialType.transparency,
                    child: CheckboxListTile(
                      value: _bagsCounted,
                      contentPadding: EdgeInsets.zero,
                      activeColor: AppColors.secondary,
                      title: const Text('360 Bags Physically Unloaded & Counted', style: TextStyle(fontSize: 13)),
                      onChanged: (val) => setState(() => _bagsCounted = val ?? false),
                    ),
                  ),
                  Material(
                    type: MaterialType.transparency,
                    child: CheckboxListTile(
                      value: _sealsIntact,
                      contentPadding: EdgeInsets.zero,
                      activeColor: AppColors.secondary,
                      title: const Text('Tamper Wire Seals #ST-991A to #ST-991F Verified Unbroken', style: TextStyle(fontSize: 13)),
                      onChanged: (val) => setState(() => _sealsIntact = val ?? false),
                    ),
                  ),
                  Material(
                    type: MaterialType.transparency,
                    child: CheckboxListTile(
                      value: _noMoistureDamage,
                      contentPadding: EdgeInsets.zero,
                      activeColor: AppColors.secondary,
                      title: const Text('No Transit Rain Ingress or Bag Tearing', style: TextStyle(fontSize: 13)),
                      onChanged: (val) => setState(() => _noMoistureDamage = val ?? false),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Consignee Sign-off Form
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
                  const Text('Consignee Receiving Sign-Off', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _consigneeNameController,
                    decoration: const InputDecoration(labelText: 'Receiving Officer Full Name'),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _consigneeTitleController,
                    decoration: const InputDecoration(labelText: 'Official Organization Position / Title'),
                  ),
                  const SizedBox(height: 16),

                  // Digital Signature Pad Simulation
                  const Text('Digital Signature Capture', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.outline)),
                  const SizedBox(height: 8),
                  Container(
                    height: 100,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: AppColors.surfaceContainerLow,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppColors.borderClean),
                    ),
                    child: Stack(
                      children: [
                        Center(
                          child: Text(
                            _isSigned ? 'Alemayehu Tadesse (ECX Digital Seal Verified)' : 'Touch here to draw signature',
                            style: TextStyle(
                              fontFamily: _isSigned ? 'serif' : 'sans-serif',
                              fontSize: _isSigned ? 18 : 13,
                              fontStyle: _isSigned ? FontStyle.italic : FontStyle.normal,
                              color: _isSigned ? AppColors.primaryContainer : AppColors.outline,
                              fontWeight: _isSigned ? FontWeight.bold : FontWeight.normal,
                            ),
                          ),
                        ),
                        Positioned(
                          right: 8,
                          bottom: 8,
                          child: TextButton(
                            onPressed: () => setState(() => _isSigned = !_isSigned),
                            child: Text(_isSigned ? 'Clear' : 'Sign'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Complete Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _bagsCounted && _sealsIntact && _noMoistureDamage && !_isDelivered ? _confirmPod : null,
                icon: Icon(_isDelivered ? Icons.check_circle : Icons.verified),
                label: Text(
                  _isDelivered ? 'POD Certificate Issued' : 'Confirm Delivery & Issue POD Certificate',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isDelivered ? AppColors.secondary : AppColors.primaryContainer,
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
