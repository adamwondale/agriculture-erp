import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class TransitDelayIncidentScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const TransitDelayIncidentScreen({super.key, this.onBack});

  @override
  State<TransitDelayIncidentScreen> createState() => _TransitDelayIncidentScreenState();
}

class _TransitDelayIncidentScreenState extends State<TransitDelayIncidentScreen> {
  String _incidentCategory = 'Mechanical Breakdown (Tire Puncture / Engine)';
  String _delayDuration = '2 to 3 Hours Delay';
  final _locationController = TextEditingController(text: '8.2140° N, 37.6890° E (12 km past Welkite)');
  final _notesController = TextEditingController(text: 'Front right dual tire punctured on gravel detour. Replacement tire being fitted from mobile service van.');
  final bool _photoAttached = true;
  bool _isReported = false;

  @override
  void dispose() {
    _locationController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  void _submitIncident() {
    setState(() => _isReported = true);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Transit Delay Incident broadcasted to Fleet Operations & Dispatch.'),
        backgroundColor: Color(0xFFC05621),
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
        title: const Text('Transit Delay Incident Log'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Warning Banner
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFFFF9F5),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFFC05621).withValues(alpha: 0.3)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.warning_amber_rounded, color: Color(0xFFC05621), size: 24),
                  SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Report road blocks, mechanical stoppages, or security holds to adjust silo receiving slots.',
                      style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Incident Details Form
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
                  const Text('Incident Categorization', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _incidentCategory,
                    isExpanded: true,
                    decoration: const InputDecoration(labelText: 'Primary Cause of Delay'),
                    items: const [
                      DropdownMenuItem(
                        value: 'Mechanical Breakdown (Tire Puncture / Engine)',
                        child: Text('Mechanical Breakdown (Tire / Engine)'),
                      ),
                      DropdownMenuItem(
                        value: 'Road Closure / Flooding (Bridge Transit Hold)',
                        child: Text('Road Closure / Flooding (River Transit)'),
                      ),
                      DropdownMenuItem(
                        value: 'Police Weigh Station Quarantine Hold',
                        child: Text('Police / Agricultural Inspection Hold'),
                      ),
                      DropdownMenuItem(
                        value: 'Severe Weather Disruption',
                        child: Text('Severe Weather Disruption'),
                      ),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _incidentCategory = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  DropdownButtonFormField<String>(
                    initialValue: _delayDuration,
                    decoration: const InputDecoration(labelText: 'Estimated Trip Delay'),
                    items: const [
                      DropdownMenuItem(value: 'Less than 1 Hour Delay', child: Text('Less than 1 Hour Delay')),
                      DropdownMenuItem(value: '2 to 3 Hours Delay', child: Text('2 to 3 Hours Delay')),
                      DropdownMenuItem(value: '4 to 6 Hours Delay', child: Text('4 to 6 Hours Delay')),
                      DropdownMenuItem(value: 'Overnight Stoppage', child: Text('Overnight Stoppage')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _delayDuration = val);
                    },
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _locationController,
                    decoration: const InputDecoration(
                      labelText: 'Current Location & Kilometer Mark',
                      prefixIcon: Icon(Icons.location_on_outlined, size: 20),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _notesController,
                    maxLines: 3,
                    decoration: const InputDecoration(labelText: 'Driver Incident Description'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Photographic Attachment
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Row(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      color: AppColors.surfaceContainerLow,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppColors.borderClean),
                    ),
                    child: const Icon(Icons.camera_alt, color: AppColors.primaryContainer, size: 26),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(_photoAttached ? 'Incident Photo #INC-881.jpg Attached' : 'No photo attached', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                        const SizedBox(height: 2),
                        const Text('Geotagged with current truck GPS', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Broadcast Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _submitIncident,
                icon: Icon(_isReported ? Icons.check_circle : Icons.send),
                label: Text(
                  _isReported ? 'Incident Logged & Broadcasted' : 'Broadcast Emergency Incident to Dispatch',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isReported ? AppColors.secondary : const Color(0xFFC05621),
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
