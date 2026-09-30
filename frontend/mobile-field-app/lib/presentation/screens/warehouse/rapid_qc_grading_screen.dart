import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class RapidQcGradingScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const RapidQcGradingScreen({super.key, this.onBack});

  @override
  State<RapidQcGradingScreen> createState() => _RapidQcGradingScreenState();
}

class _RapidQcGradingScreenState extends State<RapidQcGradingScreen> {
  final String _sampleId = 'QC-SMP-2024-891';
  double _moisture = 12.8;
  double _foreignMatter = 1.2;
  double _brokenGrains = 2.4;
  String _aflatoxin = '< 10 ppb (Export Safe)';
  bool _isApproved = false;

  String get _calculatedGrade {
    if (_moisture > 14.0 || _aflatoxin.contains('> 20 ppb')) {
      return 'REJECTED (Wet / Contaminated)';
    }
    if (_moisture <= 13.0 && _foreignMatter <= 1.5 && _brokenGrains <= 3.0 && _aflatoxin.contains('< 10 ppb')) {
      return 'Grade 1 (Premium Export Quality)';
    }
    return 'Grade 2 (Commercial Milling Standard)';
  }

  Color get _gradeColor {
    final grade = _calculatedGrade;
    if (grade.startsWith('Grade 1')) return AppColors.secondary;
    if (grade.startsWith('Grade 2')) return const Color(0xFFC05621);
    return AppColors.error;
  }

  void _submitQc() {
    setState(() => _isApproved = true);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('QC Analysis for $_sampleId recorded. Assigned: $_calculatedGrade'),
        backgroundColor: _gradeColor,
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
        title: const Text('Rapid QC Lab & Grading'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Sample Header
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Sample ID: $_sampleId', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                      const SizedBox(height: 2),
                      const Text('Red Teff • Truck ET-3-89412 (18.0 MT)', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: _gradeColor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      _calculatedGrade.split(' ')[0],
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: _gradeColor),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // QC Test Sliders & Inputs
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
                  const Text('Laboratory Rapid Metrics', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 14),

                  // Moisture Content
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Grain Moisture Content % (Threshold < 13.5%)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      Text('${_moisture.toStringAsFixed(1)}%', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _moisture <= 13.5 ? AppColors.secondary : AppColors.error)),
                    ],
                  ),
                  Slider(
                    value: _moisture,
                    min: 10.0,
                    max: 18.0,
                    divisions: 80,
                    activeColor: _moisture <= 13.5 ? AppColors.secondary : AppColors.error,
                    onChanged: (val) => setState(() => _moisture = val),
                  ),
                  const SizedBox(height: 12),

                  // Foreign Matter
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Foreign Matter / Chaff % (Threshold < 2.0%)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      Text('${_foreignMatter.toStringAsFixed(1)}%', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _foreignMatter <= 2.0 ? AppColors.secondary : AppColors.error)),
                    ],
                  ),
                  Slider(
                    value: _foreignMatter,
                    min: 0.0,
                    max: 5.0,
                    divisions: 50,
                    activeColor: _foreignMatter <= 2.0 ? AppColors.secondary : AppColors.error,
                    onChanged: (val) => setState(() => _foreignMatter = val),
                  ),
                  const SizedBox(height: 12),

                  // Broken Grains
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Broken & Immature Grains % (Threshold < 3.5%)', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      Text('${_brokenGrains.toStringAsFixed(1)}%', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _brokenGrains <= 3.5 ? AppColors.secondary : const Color(0xFFC05621))),
                    ],
                  ),
                  Slider(
                    value: _brokenGrains,
                    min: 0.0,
                    max: 8.0,
                    divisions: 80,
                    activeColor: _brokenGrains <= 3.5 ? AppColors.secondary : const Color(0xFFC05621),
                    onChanged: (val) => setState(() => _brokenGrains = val),
                  ),
                  const SizedBox(height: 14),

                  // Aflatoxin Strip
                  DropdownButtonFormField<String>(
                    initialValue: _aflatoxin,
                    decoration: const InputDecoration(labelText: 'Rapid Aflatoxin Strip Test (B1/B2/G1/G2)'),
                    items: const [
                      DropdownMenuItem(value: '< 10 ppb (Export Safe)', child: Text('< 10 ppb (Complies with EU & Ethiopian Export Standard)')),
                      DropdownMenuItem(value: '10 - 20 ppb (Domestic Standard)', child: Text('10 - 20 ppb (Domestic Commercial Milling Only)')),
                      DropdownMenuItem(value: '> 20 ppb (Reject Hazard)', child: Text('> 20 ppb (Contaminated - Hazardous Reject)')),
                    ],
                    onChanged: (val) {
                      if (val != null) setState(() => _aflatoxin = val);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Grade Summary Verdict Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: _gradeColor.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: _gradeColor.withValues(alpha: 0.3)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('OFFICIAL QC VERDICT', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.outline)),
                  const SizedBox(height: 4),
                  Text(
                    _calculatedGrade,
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: _gradeColor),
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Moisture compliant. Certified for direct silo intake ingestion and lot assignment.',
                    style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Approve Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: _submitQc,
                icon: Icon(_isApproved ? Icons.check_circle : Icons.fact_check),
                label: Text(
                  _isApproved ? 'QC Certified & Released' : 'Approve QC Grade & Release to Silo',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isApproved ? AppColors.secondary : AppColors.primaryContainer,
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
