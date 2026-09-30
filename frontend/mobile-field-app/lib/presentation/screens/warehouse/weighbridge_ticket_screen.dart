import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class WeighbridgeTicketScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const WeighbridgeTicketScreen({super.key, this.onBack});

  @override
  State<WeighbridgeTicketScreen> createState() => _WeighbridgeTicketScreenState();
}

class _WeighbridgeTicketScreenState extends State<WeighbridgeTicketScreen> {
  final _plateController = TextEditingController(text: 'ET-3-89412 (Oromia)');
  final _driverController = TextEditingController(text: 'Mulugeta Tulu');
  final _grossController = TextEditingController(text: '28450');
  final _tareController = TextEditingController(text: '10450');
  String _commodity = 'Red Teff (Quncho DZ-Cr-387)';
  bool _isPrinted = false;

  @override
  void dispose() {
    _plateController.dispose();
    _driverController.dispose();
    _grossController.dispose();
    _tareController.dispose();
    super.dispose();
  }

  double get _netWeightKg {
    final gross = double.tryParse(_grossController.text) ?? 0.0;
    final tare = double.tryParse(_tareController.text) ?? 0.0;
    return (gross - tare).clamp(0.0, 100000.0);
  }

  double get _netWeightMt => _netWeightKg / 1000.0;

  void _generateTicket() {
    setState(() => _isPrinted = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Weighbridge Ticket #WB-TKT-2024-419 generated & saved.'),
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
        title: const Text('Weighbridge Weight Ticket'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Scale Terminal Status Banner
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
                    child: const Icon(Icons.scale, color: AppColors.primaryContainer, size: 24),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Electronic Weighbridge #WB-01', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                        SizedBox(height: 2),
                        Text('Jimma Intake Terminal • Calibrated 28 Sep 2026', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.secondaryContainer.withValues(alpha: 0.4),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Text('Calibrated', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Vehicle & Consignment Info
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
                  const Text('Vehicle & Driver Manifest', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _plateController,
                    decoration: const InputDecoration(labelText: 'Truck Registration Plate Number', prefixIcon: Icon(Icons.local_shipping, size: 20)),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _driverController,
                    decoration: const InputDecoration(labelText: 'Fleet Transport Driver Name', prefixIcon: Icon(Icons.badge, size: 20)),
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _commodity,
                    decoration: const InputDecoration(labelText: 'Bulk Commodity Ingestion'),
                    items: const [
                      DropdownMenuItem(value: 'Red Teff (Quncho DZ-Cr-387)', child: Text('Red Teff (Quncho DZ-Cr-387)')),
                      DropdownMenuItem(value: 'White Maize (Hybrid BH-661)', child: Text('White Maize (Hybrid BH-661)')),
                      DropdownMenuItem(value: 'Soybean (Grade 1)', child: Text('Soybean (Grade 1)')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _commodity = val);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Weight Scale Measurement
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
                  const Text('Scale Weight Readings (kg)', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _grossController,
                          keyboardType: TextInputType.number,
                          onChanged: (_) => setState(() {}),
                          decoration: const InputDecoration(
                            labelText: 'Gross Weight (Loaded)',
                            suffixText: 'kg',
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextField(
                          controller: _tareController,
                          keyboardType: TextInputType.number,
                          onChanged: (_) => setState(() {}),
                          decoration: const InputDecoration(
                            labelText: 'Tare Weight (Empty)',
                            suffixText: 'kg',
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Net Weight Calculation Strip
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppColors.surfaceContainerLow,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.secondary.withValues(alpha: 0.3)),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('NET INTAKE GRAIN WEIGHT', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.outline)),
                            const SizedBox(height: 2),
                            Text(
                              '${_netWeightKg.toStringAsFixed(0)} kg',
                              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primaryContainer),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: AppColors.secondary,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            '${_netWeightMt.toStringAsFixed(2)} MT',
                            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Generate Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _generateTicket,
                icon: Icon(_isPrinted ? Icons.check_circle : Icons.print),
                label: Text(
                  _isPrinted ? 'Ticket #TKT-419 Printed & Stamped' : 'Generate & Print Weighbridge Ticket',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isPrinted ? AppColors.secondary : AppColors.primaryContainer,
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
