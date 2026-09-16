import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ParcelMappingScreen extends StatefulWidget {
  const ParcelMappingScreen({super.key});

  @override
  State<ParcelMappingScreen> createState() => _ParcelMappingScreenState();
}

class _ParcelMappingScreenState extends State<ParcelMappingScreen> {
  final List<String> _recordedPoints = [
    'Pt 1: 9.0124° N, 38.7521° E (Elevation 2,355m)',
    'Pt 2: 9.0140° N, 38.7548° E (Elevation 2,352m)',
    'Pt 3: 9.0118° N, 38.7562° E (Elevation 2,350m)',
  ];

  void _capturePoint() {
    setState(() {
      final id = _recordedPoints.length + 1;
      _recordedPoints.add('Pt $id: 9.01${20 + id}° N, 38.75${30 + id}° E (Survey GPS Accurate)');
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Polygon vertex saved to local survey buffer.'),
        duration: Duration(seconds: 1),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: const Text('GPS Parcel Boundary Survey'),
        leading: Navigator.canPop(context)
            ? IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () => Navigator.pop(context),
              )
            : null,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              // Survey Status Header
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.borderClean),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: AppColors.secondaryContainer,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.satellite_alt, color: AppColors.onSecondaryContainer),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'GNSS High-Precision Active',
                            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface),
                          ),
                          Text(
                            'Estimated Accuracy: ±0.4m • 14 Satellites',
                            style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Text('FIXED', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Recorded Points List
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.borderClean),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Perimeter Coordinates',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppColors.onSurface),
                          ),
                          Text(
                            '${_recordedPoints.length} vertices',
                            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.secondary),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Expanded(
                        child: ListView.separated(
                          itemCount: _recordedPoints.length,
                          separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.surfaceContainer),
                          itemBuilder: (context, i) {
                            return Padding(
                              padding: const EdgeInsets.symmetric(vertical: 8.0),
                              child: Row(
                                children: [
                                  const Icon(Icons.location_on, color: AppColors.secondary, size: 18),
                                  const SizedBox(width: 8),
                                  Expanded(
                                    child: Text(
                                      _recordedPoints[i],
                                      style: const TextStyle(fontSize: 12, color: AppColors.onSurface),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Bottom Actions
              Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 50,
                      child: ElevatedButton.icon(
                        onPressed: _capturePoint,
                        icon: const Icon(Icons.add_location_alt, size: 20),
                        label: const Text('Capture Point'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.primaryContainer,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  SizedBox(
                    height: 50,
                    child: OutlinedButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Polygon with ${_recordedPoints.length} points saved to offline parcel layer.'),
                            backgroundColor: AppColors.primaryContainer,
                          ),
                        );
                      },
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.primary,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        side: const BorderSide(color: AppColors.borderClean),
                      ),
                      child: const Text('Complete Parcel'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
