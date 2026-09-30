import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class DriverWaybillManifestScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const DriverWaybillManifestScreen({super.key, this.onBack});

  @override
  State<DriverWaybillManifestScreen> createState() => _DriverWaybillManifestScreenState();
}

class _DriverWaybillManifestScreenState extends State<DriverWaybillManifestScreen> {
  final List<Map<String, dynamic>> _checkpoints = [
    {
      'title': '1. Jimma Terminal Scale Exit Gate',
      'location': 'Jimma Hub Terminal',
      'time': '06:45 AM',
      'status': 'Cleared',
      'cleared': true,
    },
    {
      'title': '2. Welkite Transit Weigh Post',
      'location': 'Welkite Checkpoint • Oromia Border',
      'time': '09:30 AM',
      'status': 'Cleared (Gross: 28,450 kg)',
      'cleared': true,
    },
    {
      'title': '3. Woliso Regional Inspection Post',
      'location': 'Woliso Main Corridor',
      'time': '12:15 PM',
      'status': 'Cleared (Seal Verified)',
      'cleared': true,
    },
    {
      'title': '4. Sebeta Agricultural Quarantine Gate',
      'location': 'Sebeta Toll Entry',
      'time': 'Est. 02:45 PM',
      'status': 'Next Checkpoint',
      'cleared': false,
    },
    {
      'title': '5. Addis Central Silo Terminal Hub',
      'location': 'Kality Grain Terminal Gate B',
      'time': 'Est. 04:30 PM',
      'status': 'Final Destination',
      'cleared': false,
    },
  ];

  void _clearNextCheckpoint() {
    final nextIndex = _checkpoints.indexWhere((c) => !c['cleared']);
    if (nextIndex != -1) {
      setState(() {
        _checkpoints[nextIndex]['cleared'] = true;
        _checkpoints[nextIndex]['status'] = 'Cleared Just Now';
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Checkpoint "${_checkpoints[nextIndex]['title']}" stamped & cleared.'),
          backgroundColor: AppColors.secondary,
        ),
      );
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
        title: const Text('Trip Waybill & Manifest'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Waybill Header Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.primaryContainer,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'ELECTRONIC WAYBILL #WB-2024-991',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.secondaryContainer, letterSpacing: 0.5),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Text('IN TRANSIT', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text('Jimma Hub ➔ Addis Central Terminal', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 4),
                  const Text('18.0 MT Red Teff • 360 Sealed Sacks • Truck ET-3-89412', style: TextStyle(fontSize: 12, color: Colors.white70)),
                  const SizedBox(height: 12),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Driver: Mulugeta Tulu', style: TextStyle(fontSize: 11, color: Colors.white70)),
                      Text('ETA: Today, 04:30 PM', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondaryContainer)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Route Checkpoints Timeline
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Transit Route Checkpoints',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
                ),
                TextButton(
                  onPressed: _clearNextCheckpoint,
                  child: const Text('Stamp Checkpoint'),
                ),
              ],
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
                itemCount: _checkpoints.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.borderClean),
                itemBuilder: (context, index) {
                  final cp = _checkpoints[index];
                  final cleared = cp['cleared'] as bool;

                  return Material(
                    type: MaterialType.transparency,
                    child: ListTile(
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      leading: Container(
                        width: 32,
                        height: 32,
                        decoration: BoxDecoration(
                          color: cleared ? AppColors.secondary : AppColors.surfaceContainerLow,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          cleared ? Icons.check : Icons.lock_clock,
                          color: cleared ? Colors.white : AppColors.outline,
                          size: 16,
                        ),
                      ),
                      title: Text(
                        cp['title'] as String,
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: cleared ? AppColors.onSurface : AppColors.outline),
                      ),
                      subtitle: Text('${cp['location']} • ${cp['time']}', style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      trailing: Text(
                        cp['status'] as String,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: cleared ? AppColors.secondary : const Color(0xFFC05621),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),

            // Driver Actions
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Transit Delay & Incident Form opened')),
                      );
                    },
                    icon: const Icon(Icons.warning_amber_rounded, size: 16, color: Color(0xFFC05621)),
                    label: const Text('Report Delay', style: TextStyle(fontSize: 12, color: Color(0xFFC05621))),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Color(0xFFC05621)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Proof of Delivery (POD) Sign-off opened')),
                      );
                    },
                    icon: const Icon(Icons.draw, size: 16, color: Colors.white),
                    label: const Text('Consignee POD', style: TextStyle(fontSize: 12, color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.secondary,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
