import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class TeamScheduleDispatchScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const TeamScheduleDispatchScreen({super.key, this.onBack});

  @override
  State<TeamScheduleDispatchScreen> createState() => _TeamScheduleDispatchScreenState();
}

class _TeamScheduleDispatchScreenState extends State<TeamScheduleDispatchScreen> {
  final List<Map<String, dynamic>> _officers = [
    {
      'name': 'Dawit Kebede',
      'title': 'Field Agronomist (Level 3)',
      'zone': 'Mana Woreda • Bilida & Garo Hub',
      'assigned': 6,
      'completed': 4,
      'status': 'On Route to Parcel #042',
      'statusColor': AppColors.secondary,
      'lastSync': '12 mins ago',
      'phone': '+251 91 142 8831',
    },
    {
      'name': 'Hailu Mengesha',
      'title': 'Field Agronomist (Level 2)',
      'zone': 'Jimma Central • Seka Hub',
      'assigned': 8,
      'completed': 5,
      'status': 'Logging Inspection #P-089',
      'statusColor': const Color(0xFFC05621),
      'lastSync': '4 mins ago',
      'phone': '+251 92 840 1922',
    },
    {
      'name': 'Genet Alemu',
      'title': 'Senior Extension Specialist',
      'zone': 'Mana Woreda • Sombo Hub',
      'assigned': 5,
      'completed': 5,
      'status': 'Daily Itinerary Completed',
      'statusColor': AppColors.primaryContainer,
      'lastSync': 'Synced Just Now',
      'phone': '+251 93 451 9084',
    },
  ];

  void _dispatchEmergencyTask() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Emergency parcel visit dispatched to Dawit Kebede.'),
        backgroundColor: AppColors.primaryContainer,
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
        title: const Text('Agronomist Team & Dispatch'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Summary Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: Row(
                children: [
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Active Field Officers', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                        SizedBox(height: 2),
                        Text('3 / 3 On Route', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                      ],
                    ),
                  ),
                  Container(width: 1, height: 32, color: AppColors.borderClean),
                  const SizedBox(width: 16),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Route Fulfillment', style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                        SizedBox(height: 2),
                        Text('14 / 19 Parcels', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Dispatch Action Strip
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Field Officers in Sector',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppColors.onSurface),
                ),
                TextButton.icon(
                  onPressed: _dispatchEmergencyTask,
                  icon: const Icon(Icons.add_task, size: 16),
                  label: const Text('Dispatch Task', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
            const SizedBox(height: 8),

            // Officer Cards
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _officers.length,
              separatorBuilder: (_, __) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final o = _officers[index];
                final double progress = (o['completed'] as int) / (o['assigned'] as int);
                final statusColor = o['statusColor'] as Color;

                return Container(
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
                          Text(o['name'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: statusColor.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              o['status'] as String,
                              style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: statusColor),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text('${o['title']} • ${o['zone']}', style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Progress: ${o['completed']} of ${o['assigned']} visits completed', style: const TextStyle(fontSize: 11, color: AppColors.outline)),
                          Text('${(progress * 100).toInt()}%', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      LinearProgressIndicator(
                        value: progress,
                        backgroundColor: AppColors.surfaceContainerLow,
                        valueColor: AlwaysStoppedAnimation<Color>(statusColor),
                        minHeight: 6,
                        borderRadius: BorderRadius.circular(3),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.sync, size: 14, color: AppColors.outline),
                              const SizedBox(width: 4),
                              Text('Last Sync: ${o['lastSync']}', style: const TextStyle(fontSize: 11, color: AppColors.outline)),
                            ],
                          ),
                          IconButton(
                            icon: const Icon(Icons.phone_outlined, size: 18, color: AppColors.secondary),
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Calling ${o['name']} (${o['phone']})...')),
                              );
                            },
                          ),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
