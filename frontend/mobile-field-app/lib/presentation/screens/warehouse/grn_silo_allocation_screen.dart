import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class GrnSiloAllocationScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const GrnSiloAllocationScreen({super.key, this.onBack});

  @override
  State<GrnSiloAllocationScreen> createState() => _GrnSiloAllocationScreenState();
}

class _GrnSiloAllocationScreenState extends State<GrnSiloAllocationScreen> {
  String _selectedSilo = 'Silo Bin 3 (Red Teff Buffer • 35% Full)';
  final String _grnNumber = 'GRN-ETH-2024-0491';
  final String _lotTag = 'LOT-2024-TEFF-091-B3';
  bool _isAllocated = false;

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
        title: const Text('GRN & Silo Allocation'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // GRN Overview Card
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
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(_grnNumber, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.secondaryContainer.withValues(alpha: 0.3),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text('QC Grade 1', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text('Consignment: 18.00 MT Red Teff (Quncho)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppColors.onSurface)),
                  const SizedBox(height: 2),
                  const Text('Origin: Jimma Woreda Aggregation Hub • Truck: ET-3-89412', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                  const Divider(height: 20, color: AppColors.borderClean),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Assigned Lot Tag:', style: TextStyle(fontSize: 12, color: AppColors.outline)),
                      Text('LOT-2024-TEFF-091-B3', style: TextStyle(fontSize: 12, fontFamily: 'monospace', fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Target Silo Bin Selector
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
                  const Text('Destination Storage Bin', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _selectedSilo,
                    isExpanded: true,
                    decoration: const InputDecoration(labelText: 'Target Silo Storage Bin'),
                    items: const [
                      DropdownMenuItem(
                        value: 'Silo Bin 1 (Red Teff Primary • 92% Full)',
                        child: Text('Silo Bin 1 (Red Teff Primary • 92% Full - Warning)'),
                      ),
                      DropdownMenuItem(
                        value: 'Silo Bin 2 (White Maize • 65% Full)',
                        child: Text('Silo Bin 2 (White Maize • 65% Full)'),
                      ),
                      DropdownMenuItem(
                        value: 'Silo Bin 3 (Red Teff Buffer • 35% Full)',
                        child: Text('Silo Bin 3 (Red Teff Buffer • 35% Full - Recommended)'),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedSilo = val);
                    },
                  ),
                  const SizedBox(height: 16),

                  // Capacity Preview
                  const Text('Storage Bin Fill Projection:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurfaceVariant)),
                  const SizedBox(height: 6),
                  LinearProgressIndicator(
                    value: 0.35 + 0.018,
                    backgroundColor: AppColors.surfaceContainerLow,
                    valueColor: const AlwaysStoppedAnimation<Color>(AppColors.secondary),
                    minHeight: 8,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  const SizedBox(height: 6),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Current: 350 MT', style: TextStyle(fontSize: 11, color: AppColors.outline)),
                      Text('Post-Intake: 368 MT (36.8% of 1,000 MT)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Seal and Allocate Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: () {
                  setState(() => _isAllocated = true);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Consignment allocated to $_selectedSilo with Lot Tag: $_lotTag'),
                      backgroundColor: AppColors.secondary,
                    ),
                  );
                },
                icon: Icon(_isAllocated ? Icons.check_circle : Icons.inventory),
                label: Text(
                  _isAllocated ? 'Lot Allocated & Tag Printed' : 'Allocate to Silo & Generate Lot Tag',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isAllocated ? AppColors.secondary : AppColors.primaryContainer,
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
