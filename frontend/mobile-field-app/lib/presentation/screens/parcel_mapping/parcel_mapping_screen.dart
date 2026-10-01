import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ParcelMappingScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const ParcelMappingScreen({super.key, this.onBack});

  @override
  State<ParcelMappingScreen> createState() => _ParcelMappingScreenState();
}

class _ParcelMappingScreenState extends State<ParcelMappingScreen> {
  final List<Map<String, dynamic>> _waypoints = [
    {'id': 1, 'lat': '7.67382', 'lng': '36.83441', 'elevation': '1,742m', 'accuracy': '±1.8m'},
    {'id': 2, 'lat': '7.67491', 'lng': '36.83515', 'elevation': '1,745m', 'accuracy': '±2.1m'},
    {'id': 3, 'lat': '7.67530', 'lng': '36.83380', 'elevation': '1,740m', 'accuracy': '±1.9m'},
    {'id': 4, 'lat': '7.67410', 'lng': '36.83310', 'elevation': '1,738m', 'accuracy': '±2.4m'},
  ];

  double _calculatedArea = 2.42;
  double _perimeterMeters = 642.0;

  void _addPoint() {
    setState(() {
      final nextId = _waypoints.length + 1;
      _waypoints.add({
        'id': nextId,
        'lat': '7.67${380 + nextId * 15}',
        'lng': '36.83${440 + nextId * 20}',
        'elevation': '1,741m',
        'accuracy': '±2.0m',
      });
      _calculatedArea += 0.28;
      _perimeterMeters += 85.0;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('GPS vertex pinned & polygon recalculating...'),
        duration: Duration(milliseconds: 900),
      ),
    );
  }

  void _deletePoint(int index) {
    if (_waypoints.length <= 3) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('A polygon requires a minimum of 3 boundary vertices.')),
      );
      return;
    }
    setState(() {
      _waypoints.removeAt(index);
      _calculatedArea = (_calculatedArea - 0.25).clamp(1.0, 50.0);
      _perimeterMeters = (_perimeterMeters - 70.0).clamp(200.0, 5000.0);
    });
  }

  void _savePolygon() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Polygon sealed: ${_calculatedArea.toStringAsFixed(2)} ha saved to parcel record.'),
        backgroundColor: AppColors.secondary,
      ),
    );
    if (widget.onBack != null) {
      widget.onBack!();
    } else if (Navigator.canPop(context)) {
      Navigator.pop(context);
    }
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
        title: const Text('GPS Boundary Walk & Survey'),
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
                Icon(Icons.satellite_alt, size: 14, color: AppColors.secondary),
                SizedBox(width: 4),
                Text('14 Sats Locked', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary)),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Simulated Polygon Graphic View
          Container(
            height: 180,
            width: double.infinity,
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.primaryContainer,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.secondary.withValues(alpha: 0.4)),
            ),
            child: Stack(
              children: [
                CustomPaint(
                  size: const Size(double.infinity, 180),
                  painter: _PolygonCanvasPainter(pointCount: _waypoints.length),
                ),
                Positioned(
                  top: 12,
                  left: 12,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.5),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.radar, size: 14, color: AppColors.secondaryContainer),
                        SizedBox(width: 6),
                        Text(
                          'Parcel #P-JIM-042 • Boundary Tracking',
                          style: TextStyle(fontSize: 11, color: Colors.white, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned(
                  bottom: 12,
                  right: 12,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.secondaryContainer,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      '${_calculatedArea.toStringAsFixed(2)} Hectares',
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: AppColors.onSecondaryContainer,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Telemetry Strip
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Row(
                children: [
                  _buildTelemetryItem('${_waypoints.length}', 'Corner Vertices', AppColors.primaryContainer),
                  Container(width: 1, height: 28, color: AppColors.borderClean),
                  _buildTelemetryItem('${_perimeterMeters.toInt()} m', 'Perimeter Walked', AppColors.secondary),
                  Container(width: 1, height: 28, color: AppColors.borderClean),
                  _buildTelemetryItem('±1.9 m', 'GPS Precision', AppColors.primaryContainer),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Waypoints Table Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Recorded Corner Waypoints',
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface),
                ),
                TextButton.icon(
                  onPressed: _addPoint,
                  icon: const Icon(Icons.add_location_alt, size: 16),
                  label: const Text('Pin Current GPS', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),

          // Waypoints List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              itemCount: _waypoints.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (context, index) {
                final pt = _waypoints[index];
                return Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: AppColors.borderClean),
                  ),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 14,
                        backgroundColor: AppColors.surfaceContainerLow,
                        child: Text(
                          '${pt['id']}',
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.primaryContainer),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${pt['lat']}° N, ${pt['lng']}° E',
                              style: const TextStyle(fontSize: 13, fontFamily: 'monospace', fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              'Elevation: ${pt['elevation']} • Accuracy: ${pt['accuracy']}',
                              style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete_outline, size: 18, color: AppColors.error),
                        onPressed: () => _deletePoint(index),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),

          // Bottom Action Dock
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: AppColors.borderClean, width: 0.5)),
            ),
            child: SafeArea(
              top: false,
              child: SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton.icon(
                  onPressed: _savePolygon,
                  icon: const Icon(Icons.check_circle_outline),
                  label: const Text('Seal Boundary & Save Polygon', style: TextStyle(fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.secondary,
                    foregroundColor: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTelemetryItem(String value, String label, Color color) {
    return Expanded(
      child: Column(
        children: [
          Text(value, style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(height: 2),
          Text(label, style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
        ],
      ),
    );
  }
}

class _PolygonCanvasPainter extends CustomPainter {
  final int pointCount;

  _PolygonCanvasPainter({required this.pointCount});

  @override
  void paint(Canvas canvas, Size size) {
    final linePaint = Paint()
      ..color = const Color(0xFFA3F4C3)
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    final fillPaint = Paint()
      ..color = const Color(0xFFA3F4C3).withValues(alpha: 0.2)
      ..style = PaintingStyle.fill;

    final dotPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;

    final path = Path();
    final w = size.width;
    final h = size.height;

    final points = [
      Offset(w * 0.2, h * 0.3),
      Offset(w * 0.7, h * 0.2),
      Offset(w * 0.85, h * 0.7),
      Offset(w * 0.45, h * 0.85),
      if (pointCount > 4) Offset(w * 0.15, h * 0.6),
    ];

    path.moveTo(points[0].dx, points[0].dy);
    for (int i = 1; i < points.length; i++) {
      path.lineTo(points[i].dx, points[i].dy);
    }
    path.close();

    canvas.drawPath(path, fillPaint);
    canvas.drawPath(path, linePaint);

    for (final p in points) {
      canvas.drawCircle(p, 4.5, dotPaint);
    }
  }

  @override
  bool shouldRepaint(covariant _PolygonCanvasPainter oldDelegate) {
    return oldDelegate.pointCount != pointCount;
  }
}
