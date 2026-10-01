import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FieldInspectionScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const FieldInspectionScreen({super.key, this.onBack});

  @override
  State<FieldInspectionScreen> createState() => _FieldInspectionScreenState();
}

class _FieldInspectionScreenState extends State<FieldInspectionScreen> {
  String _selectedParcel = 'Parcel #P-JIM-042 • Tadesse Gemechu (Red Teff)';
  String _growthStage = 'Vegetative / Tillering';
  double _vigourScore = 88.0;
  String _fallArmyworm = 'Mild';
  String _leafRust = 'None';
  String _soilMoisture = 'Optimal (45-55% FC)';
  String _weedPressure = 'Low';
  String _recommendation = 'Routine Monitoring • No chemical action needed';
  final _notesController = TextEditingController(text: 'Canopy closure at 75%. Soil moisture optimal. Mild aphid presence on outer border, predatory ladybugs present.');
  bool _photoCaptured = true;

  @override
  void dispose() {
    _notesController.dispose();
    super.dispose();
  }

  void _saveInspection() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Field Inspection scored & saved offline. Will auto-sync when online.'),
        backgroundColor: AppColors.secondary,
      ),
    );
    if (widget.onBack != null) {
      widget.onBack!();
    } else if (Navigator.canPop(context)) {
      Navigator.pop(context);
    }
  }

  Color _getScoreColor(double score) {
    if (score >= 80) return AppColors.secondary;
    if (score >= 60) return const Color(0xFFC05621);
    return AppColors.error;
  }

  @override
  Widget build(BuildContext context) {
    final scoreColor = _getScoreColor(_vigourScore);

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
        title: const Text('Agronomic Field Inspection'),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 12),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: AppColors.secondaryContainer.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.offline_pin, size: 14, color: AppColors.secondary),
                SizedBox(width: 4),
                Text('Offline Ready', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary)),
              ],
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Target Parcel Header Card
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
                  const Text('Selected Farm Parcel', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.outline)),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<String>(
                    initialValue: _selectedParcel,
                    isExpanded: true,
                    decoration: const InputDecoration(contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10)),
                    items: const [
                      DropdownMenuItem(
                        value: 'Parcel #P-JIM-042 • Tadesse Gemechu (Red Teff)',
                        child: Text('Parcel #P-JIM-042 • Tadesse Gemechu (Red Teff)'),
                      ),
                      DropdownMenuItem(
                        value: 'Parcel #P-JIM-089 • Almaz Ayana (White Maize)',
                        child: Text('Parcel #P-JIM-089 • Almaz Ayana (White Maize)'),
                      ),
                      DropdownMenuItem(
                        value: 'Parcel #P-JIM-115 • Bekele Desta (Haricot Bean)',
                        child: Text('Parcel #P-JIM-115 • Bekele Desta (Haricot Bean)'),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedParcel = val);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Growth Stage & Vigour Score
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
                  const Text('Crop Phenology & Health Vigour', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _growthStage,
                    decoration: const InputDecoration(labelText: 'Phenological Growth Stage'),
                    items: const [
                      DropdownMenuItem(value: 'Seedling / Emergence', child: Text('Seedling / Emergence')),
                      DropdownMenuItem(value: 'Vegetative / Tillering', child: Text('Vegetative / Tillering')),
                      DropdownMenuItem(value: 'Flowering / Heading', child: Text('Flowering / Heading')),
                      DropdownMenuItem(value: 'Grain Filling', child: Text('Grain Filling')),
                      DropdownMenuItem(value: 'Maturity / Ready for Harvest', child: Text('Maturity / Ready for Harvest')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _growthStage = val);
                    },
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Overall Crop Vigour Score', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                      Text(
                        '${_vigourScore.toInt()}%',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: scoreColor),
                      ),
                    ],
                  ),
                  Slider(
                    value: _vigourScore,
                    min: 0,
                    max: 100,
                    divisions: 20,
                    activeColor: scoreColor,
                    inactiveColor: AppColors.surfaceContainerLow,
                    onChanged: (val) => setState(() => _vigourScore = val),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Pest & Disease Scouting
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
                  const Text('Pest & Disease Scouting Severity', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  _buildSeverityRow('Fall Armyworm (Spodoptera frugiperda)', _fallArmyworm, (val) => setState(() => _fallArmyworm = val)),
                  const Divider(height: 16, color: AppColors.borderClean),
                  _buildSeverityRow('Leaf Rust (Puccinia triticina)', _leafRust, (val) => setState(() => _leafRust = val)),
                  const Divider(height: 16, color: AppColors.borderClean),
                  _buildSeverityRow('Soil Moisture Level', _soilMoisture, (val) => setState(() => _soilMoisture = val), options: ['Deficit (<35%)', 'Optimal (45-55% FC)', 'Waterlogged (>70%)']),
                  const Divider(height: 16, color: AppColors.borderClean),
                  _buildSeverityRow('Weed Density Pressure', _weedPressure, (val) => setState(() => _weedPressure = val), options: ['Low', 'Moderate', 'Critical']),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Photo Evidence Slot
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
                  const Text('Field Photographic Evidence', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainerLow,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: AppColors.secondary.withValues(alpha: 0.4)),
                        ),
                        child: _photoCaptured
                            ? const Center(child: Icon(Icons.image, size: 36, color: AppColors.secondary))
                            : const Center(child: Icon(Icons.camera_alt, size: 32, color: AppColors.outlineVariant)),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _photoCaptured ? 'Photo #IMG-042-A.jpg Captured' : 'No photo captured',
                              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            const Text('GPS Geotagged • 7.6738° N, 36.8344° E', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                            const SizedBox(height: 8),
                            OutlinedButton.icon(
                              onPressed: () {
                                setState(() => _photoCaptured = true);
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text('Field camera triggered & geotag captured.')),
                                );
                              },
                              icon: const Icon(Icons.camera_alt, size: 16),
                              label: const Text('Retake Geotagged Photo', style: TextStyle(fontSize: 11)),
                              style: OutlinedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                minimumSize: Size.zero,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Agronomic Notes & Recommendation
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
                  const Text('Field Observations & Prescription', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _recommendation,
                    isExpanded: true,
                    decoration: const InputDecoration(labelText: 'Prescribed Field Action'),
                    items: const [
                      DropdownMenuItem(
                        value: 'Routine Monitoring • No chemical action needed',
                        child: Text('Routine Monitoring • No chemical action needed'),
                      ),
                      DropdownMenuItem(
                        value: 'Apply Bio-Pesticide (Neem Extract) on Border Rows',
                        child: Text('Apply Bio-Pesticide (Neem Extract) on Border Rows'),
                      ),
                      DropdownMenuItem(
                        value: 'Top-Dress Urea Fertilizer (50kg/ha before rain)',
                        child: Text('Top-Dress Urea Fertilizer (50kg/ha before rain)'),
                      ),
                      DropdownMenuItem(
                        value: 'Emergency Drainage Channel Excavation',
                        child: Text('Emergency Drainage Channel Excavation'),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _recommendation = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _notesController,
                    maxLines: 3,
                    decoration: const InputDecoration(labelText: 'Agronomist Field Notes'),
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
                onPressed: _saveInspection,
                icon: const Icon(Icons.save_outlined),
                label: const Text('Save Offline Inspection Score', style: TextStyle(fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primaryContainer,
                  foregroundColor: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSeverityRow(
    String label,
    String currentValue,
    ValueChanged<String> onChanged, {
    List<String> options = const ['None', 'Mild', 'Severe'],
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurfaceVariant)),
        const SizedBox(height: 6),
        Row(
          children: options.map((opt) {
            final isSelected = opt == currentValue;
            Color optColor = AppColors.secondary;
            if (opt == 'Mild' || opt.contains('Moderate')) optColor = const Color(0xFFC05621);
            if (opt == 'Severe' || opt.contains('Critical') || opt.contains('Deficit')) optColor = AppColors.error;

            return Expanded(
              child: InkWell(
                onTap: () => onChanged(opt),
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  margin: const EdgeInsets.only(right: 6),
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  decoration: BoxDecoration(
                    color: isSelected ? optColor : AppColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: isSelected ? optColor : AppColors.borderClean),
                  ),
                  child: Center(
                    child: Text(
                      opt,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                        color: isSelected ? Colors.white : AppColors.onSurfaceVariant,
                      ),
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
