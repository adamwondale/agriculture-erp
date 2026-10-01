import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ClusterMemberRosterScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const ClusterMemberRosterScreen({super.key, this.onBack});

  @override
  State<ClusterMemberRosterScreen> createState() => _ClusterMemberRosterScreenState();
}

class _ClusterMemberRosterScreenState extends State<ClusterMemberRosterScreen> {
  final TextEditingController _searchController = TextEditingController();

  final List<Map<String, dynamic>> _members = [
    {
      'name': 'Tadesse Gemechu',
      'id': 'MEM-AW-012',
      'kebele': 'Bilida Kebele',
      'crop': 'Red Teff',
      'area': '2.4 ha',
      'delivered': '18 Qtl / 24 Qtl Target',
      'progress': 0.75,
      'tier': 'Tier 1 Certified',
    },
    {
      'name': 'Almaz Ayana',
      'id': 'MEM-AW-045',
      'kebele': 'Sombo Kebele',
      'crop': 'White Maize',
      'area': '1.8 ha',
      'delivered': '22 Qtl / 22 Qtl Target',
      'progress': 1.0,
      'tier': 'Tier 1 Certified',
    },
    {
      'name': 'Bekele Desta',
      'id': 'MEM-AW-088',
      'kebele': 'Seka Kebele',
      'crop': 'Haricot Bean',
      'area': '3.1 ha',
      'delivered': '14 Qtl / 20 Qtl Target',
      'progress': 0.70,
      'tier': 'Tier 2 Active',
    },
    {
      'name': 'Fatuma Abdi',
      'id': 'MEM-AW-104',
      'kebele': 'Bilida Kebele',
      'crop': 'Red Teff',
      'area': '1.5 ha',
      'delivered': '12 Qtl / 15 Qtl Target',
      'progress': 0.80,
      'tier': 'Tier 1 Certified',
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
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
        title: const Text('Cooperative Member Roster'),
      ),
      body: Column(
        children: [
          // Quota Summary Header
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Awash Union • Seasonal Target', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                    Text('1,020 / 1,200 Qtl (85%)', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                  ],
                ),
                const SizedBox(height: 8),
                LinearProgressIndicator(
                  value: 0.85,
                  backgroundColor: AppColors.surfaceContainerLow,
                  valueColor: const AlwaysStoppedAnimation<Color>(AppColors.secondary),
                  minHeight: 8,
                  borderRadius: BorderRadius.circular(4),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _searchController,
                  decoration: const InputDecoration(
                    hintText: 'Search member by name, Kebele, or ID...',
                    prefixIcon: Icon(Icons.search, size: 20),
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.borderClean),

          // Member List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16.0),
              itemCount: _members.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final m = _members[index];
                return Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppColors.borderClean),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(m['name'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppColors.secondaryContainer.withValues(alpha: 0.4),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(m['tier'] as String, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text('${m['id']} • ${m['kebele']} • ${m['crop']} (${m['area']})', style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Harvest Quota Delivered:', style: TextStyle(fontSize: 11, color: AppColors.outline)),
                          Text(m['delivered'] as String, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      LinearProgressIndicator(
                        value: m['progress'] as double,
                        backgroundColor: AppColors.surfaceContainerLow,
                        valueColor: const AlwaysStoppedAnimation<Color>(AppColors.secondary),
                        minHeight: 5,
                        borderRadius: BorderRadius.circular(2.5),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
