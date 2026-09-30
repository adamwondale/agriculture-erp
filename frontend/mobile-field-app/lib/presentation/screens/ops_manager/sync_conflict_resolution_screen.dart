import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class SyncConflictResolutionScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const SyncConflictResolutionScreen({super.key, this.onBack});

  @override
  State<SyncConflictResolutionScreen> createState() => _SyncConflictResolutionScreenState();
}

class _SyncConflictResolutionScreenState extends State<SyncConflictResolutionScreen> {
  int _activeConflictIndex = 0;

  final List<Map<String, dynamic>> _conflicts = [
    {
      'title': 'Parcel Polygon #P-JIM-042',
      'entity': 'Tadesse Gemechu • Mana Woreda',
      'device': 'Field Handheld (Dawit Kebede • 10:45 AM)',
      'remoteSource': 'Central ERP Server (GIS Ingest • 11:15 AM)',
      'diffs': [
        {'field': 'Measured Area', 'local': '2.42 ha (Boundary Walk)', 'remote': '2.15 ha (Sat Estimate)'},
        {'field': 'Crop Cultivar', 'local': 'Red Teff (Quncho)', 'remote': 'Red Teff (Unverified)'},
        {'field': 'Phenology Stage', 'local': 'Vegetative / Tillering', 'remote': 'Seedling (Outdated)'},
        {'field': 'Soil Type', 'local': 'Clay Loam (Vertisol)', 'remote': 'Nitisol'},
      ],
      'resolved': false,
    },
    {
      'title': 'Smallholder Contact #FRM-0812',
      'entity': 'Almaz Ayana • Sombo Kebele',
      'device': 'Field Handheld (Dawit Kebede • 09:30 AM)',
      'remoteSource': 'Branch Web Portal (Admin User • 09:45 AM)',
      'diffs': [
        {'field': 'Telebirr Phone', 'local': '0928401922', 'remote': '0911223344'},
        {'field': 'National ID Type', 'local': 'Fayda ID (ET-9401)', 'remote': 'Kebele Card (KBL-09)'},
      ],
      'resolved': false,
    },
    {
      'title': 'Input Voucher #VCH-2024-940',
      'entity': 'Bekele Desta • Seka Woreda',
      'device': 'Station Offline Terminal (08:20 AM)',
      'remoteSource': 'Central Billing Gateway (08:40 AM)',
      'diffs': [
        {'field': 'Urea Bag Count', 'local': '2 Bags (100 kg)', 'remote': '1 Bag (50 kg)'},
        {'field': 'Credit Total', 'local': '3,400.00 ETB', 'remote': '2,600.00 ETB'},
      ],
      'resolved': false,
    },
  ];

  void _resolveConflict(bool acceptLocal) {
    setState(() {
      _conflicts[_activeConflictIndex]['resolved'] = true;
      if (_activeConflictIndex < _conflicts.length - 1) {
        _activeConflictIndex++;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(acceptLocal ? 'Local field truth accepted & synced.' : 'Cloud HQ master accepted.'),
        backgroundColor: acceptLocal ? AppColors.secondary : AppColors.primaryContainer,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final conflict = _conflicts[_activeConflictIndex];
    final diffs = conflict['diffs'] as List<Map<String, String>>;
    final isResolved = conflict['resolved'] as bool;

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
        title: const Text('Offline Sync Conflict Resolver'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Conflict Selector Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Conflict ${_activeConflictIndex + 1} of ${_conflicts.length}',
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryContainer),
                ),
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.chevron_left),
                      onPressed: _activeConflictIndex > 0 ? () => setState(() => _activeConflictIndex--) : null,
                    ),
                    IconButton(
                      icon: const Icon(Icons.chevron_right),
                      onPressed: _activeConflictIndex < _conflicts.length - 1 ? () => setState(() => _activeConflictIndex++) : null,
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 4),

            // Conflict Info Card
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
                  Text(conflict['title'] as String, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                  const SizedBox(height: 2),
                  Text(conflict['entity'] as String, style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                  const Divider(height: 20, color: AppColors.borderClean),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Local Field Device', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                            const SizedBox(height: 2),
                            Text(conflict['device'] as String, style: const TextStyle(fontSize: 11, color: AppColors.outline)),
                          ],
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Central Cloud Master', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFC05621))),
                            const SizedBox(height: 2),
                            Text(conflict['remoteSource'] as String, style: const TextStyle(fontSize: 11, color: AppColors.outline)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Side-by-Side Diff Table
            const Text(
              'Attribute Field Discrepancies',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface),
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
                itemCount: diffs.length,
                separatorBuilder: (_, __) => const Divider(height: 1, color: AppColors.borderClean),
                itemBuilder: (context, index) {
                  final diff = diffs[index];
                  return Padding(
                    padding: const EdgeInsets.all(14.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(diff['field']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurfaceVariant)),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Expanded(
                              child: Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: AppColors.surfaceContainerLow,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: AppColors.secondary.withValues(alpha: 0.3)),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text('Local Value', style: TextStyle(fontSize: 10, color: AppColors.outline)),
                                    const SizedBox(height: 2),
                                    Text(diff['local']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                                  ],
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFFFF9F5),
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(color: const Color(0xFFC05621).withValues(alpha: 0.3)),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text('Cloud Value', style: TextStyle(fontSize: 10, color: AppColors.outline)),
                                    const SizedBox(height: 2),
                                    Text(diff['remote']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFFC05621))),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),

            // Resolution Actions
            if (!isResolved)
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => _resolveConflict(false),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        side: const BorderSide(color: Color(0xFFC05621)),
                      ),
                      child: const Text('Accept Cloud Master', style: TextStyle(fontSize: 12, color: Color(0xFFC05621), fontWeight: FontWeight.bold)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => _resolveConflict(true),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.secondary,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: const Text('Accept Local Field Truth', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                  ),
                ],
              )
            else
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.secondaryContainer.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Center(
                  child: Text(
                    'Conflict Resolved & Marked for Cloud Re-sync',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.secondary),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
