import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FieldInspectionScreen extends StatefulWidget {
  const FieldInspectionScreen({super.key});

  @override
  State<FieldInspectionScreen> createState() => _FieldInspectionScreenState();
}

class _FieldInspectionScreenState extends State<FieldInspectionScreen> {
  final _parcelController = TextEditingController(text: 'BL-4B-TEFF');
  final _healthController = TextEditingController(text: '88');
  final _notesController = TextEditingController(text: 'Moisture optimal, low pest pressure.');
  String _cropStage = 'Vegetative / Tillering';

  @override
  void dispose() {
    _parcelController.dispose();
    _healthController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  void _saveInspection() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Field Inspection for ${_parcelController.text} saved offline.'),
        backgroundColor: AppColors.primaryContainer,
      ),
    );
    if (Navigator.canPop(context)) {
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: const Text('Field Agronomy Inspection'),
        leading: Navigator.canPop(context)
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () => Navigator.pop(context),
              )
            : null,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.all(20.0),
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
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: AppColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.fact_check, color: AppColors.secondary),
                    ),
                    const SizedBox(width: 12),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Telemetry & Health Log',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: AppColors.onSurface,
                          ),
                        ),
                        Text(
                          'Queued for automatic background sync',
                          style: TextStyle(
                            fontSize: 12,
                            color: AppColors.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const Text('Parcel Identifier / Code', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _parcelController,
                  decoration: const InputDecoration(hintText: 'e.g. BL-4B-TEFF'),
                ),
                const SizedBox(height: 16),
                const Text('Crop Stage', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                DropdownButtonFormField<String>(
                  initialValue: _cropStage,
                  decoration: const InputDecoration(),
                  items: [
                    'Emergence / Seedling',
                    'Vegetative / Tillering',
                    'Flowering / Heading',
                    'Grain Filling / Ripening',
                    'Harvest Ready',
                  ].map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
                  onChanged: (val) {
                    if (val != null) setState(() => _cropStage = val);
                  },
                ),
                const SizedBox(height: 16),
                const Text('Canopy Health Score (1-100)', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _healthController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(hintText: 'e.g. 88'),
                ),
                const SizedBox(height: 16),
                const Text('Agronomist Field Observations', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _notesController,
                  maxLines: 3,
                  decoration: const InputDecoration(hintText: 'Notes on soil, pests, irrigation, moisture...'),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton.icon(
                    onPressed: _saveInspection,
                    icon: const Icon(Icons.cloud_upload_outlined, size: 20),
                    label: const Text('Record Offline Inspection'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryContainer,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
