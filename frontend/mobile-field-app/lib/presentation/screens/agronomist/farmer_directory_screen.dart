import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FarmerDirectoryScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const FarmerDirectoryScreen({super.key, this.onBack});

  @override
  State<FarmerDirectoryScreen> createState() => _FarmerDirectoryScreenState();
}

class _FarmerDirectoryScreenState extends State<FarmerDirectoryScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _selectedFilter = 'All';

  final List<Map<String, dynamic>> _farmers = [
    {
      'id': 'FRM-ETH-0941',
      'name': 'Tadesse Gemechu',
      'kebele': 'Mana Woreda • Bilida',
      'phone': '+251 91 142 8831',
      'commodity': 'Red Teff (Quncho)',
      'acreage': '2.4 ha',
      'score': 92,
      'grade': 'Grade A',
      'loanStatus': 'Active (4,500 ETB)',
      'statusColor': AppColors.secondary,
      'initials': 'TG',
    },
    {
      'id': 'FRM-ETH-0812',
      'name': 'Almaz Ayana',
      'kebele': 'Mana Woreda • Sombo',
      'phone': '+251 92 840 1922',
      'commodity': 'White Maize (BH-661)',
      'acreage': '1.8 ha',
      'score': 88,
      'grade': 'Grade A',
      'loanStatus': 'Cleared',
      'statusColor': AppColors.secondary,
      'initials': 'AA',
    },
    {
      'id': 'FRM-ETH-1104',
      'name': 'Bekele Desta',
      'kebele': 'Jimma Woreda • Seka',
      'phone': '+251 93 451 9084',
      'commodity': 'Haricot Bean (Awash-1)',
      'acreage': '3.1 ha',
      'score': 74,
      'grade': 'Grade B',
      'loanStatus': 'Active (8,200 ETB)',
      'statusColor': const Color(0xFFC05621),
      'initials': 'BD',
    },
    {
      'id': 'FRM-ETH-0755',
      'name': 'Fatuma Abdi',
      'kebele': 'Mana Woreda • Bilida',
      'phone': '+251 91 882 3019',
      'commodity': 'Red Teff',
      'acreage': '1.5 ha',
      'score': 95,
      'grade': 'Grade A',
      'loanStatus': 'Cleared',
      'statusColor': AppColors.secondary,
      'initials': 'FA',
    },
    {
      'id': 'FRM-ETH-0630',
      'name': 'Mulugeta Tulu',
      'kebele': 'Jimma Woreda • Dedo',
      'phone': '+251 94 201 7741',
      'commodity': 'White Maize',
      'acreage': '4.0 ha',
      'score': 62,
      'grade': 'Grade C',
      'loanStatus': 'Inspection Overdue',
      'statusColor': AppColors.error,
      'initials': 'MT',
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredFarmers {
    final query = _searchController.text.toLowerCase().trim();
    return _farmers.where((f) {
      final matchesQuery = query.isEmpty ||
          f['name'].toString().toLowerCase().contains(query) ||
          f['phone'].toString().contains(query) ||
          f['kebele'].toString().toLowerCase().contains(query) ||
          f['id'].toString().toLowerCase().contains(query);

      if (!matchesQuery) return false;

      if (_selectedFilter == 'Grade A') return f['grade'] == 'Grade A';
      if (_selectedFilter == 'Loans Active') return f['loanStatus'].toString().contains('Active');
      if (_selectedFilter == 'Overdue') return f['loanStatus'].toString().contains('Overdue');

      return true;
    }).toList();
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
            : null,
        title: const Text('Farmer 360 Directory'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person_add_alt_1),
            tooltip: 'Register Farmer',
            onPressed: () => Navigator.of(context).pushNamed('/farmer-registration'),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          // Search & Filters Header
          Container(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
            color: AppColors.surface,
            child: Column(
              children: [
                TextField(
                  controller: _searchController,
                  onChanged: (_) => setState(() {}),
                  decoration: InputDecoration(
                    hintText: 'Search by name, phone, Kebele, or ID...',
                    prefixIcon: const Icon(Icons.search, size: 20, color: AppColors.onSurfaceVariant),
                    suffixIcon: _searchController.text.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () {
                              _searchController.clear();
                              setState(() {});
                            },
                          )
                        : null,
                  ),
                ),
                const SizedBox(height: 10),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _buildFilterChip('All'),
                      const SizedBox(width: 8),
                      _buildFilterChip('Grade A'),
                      const SizedBox(width: 8),
                      _buildFilterChip('Loans Active'),
                      const SizedBox(width: 8),
                      _buildFilterChip('Overdue'),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Count & Reliability Legend
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 6.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${_filteredFarmers.length} Smallholders Registered',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppColors.onSurfaceVariant,
                  ),
                ),
                const Row(
                  children: [
                    Icon(Icons.verified, size: 14, color: AppColors.secondary),
                    SizedBox(width: 4),
                    Text(
                      'Fayda Verified Hub',
                      style: TextStyle(fontSize: 11, color: AppColors.secondary, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Farmer Cards List
          Expanded(
            child: _filteredFarmers.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.search_off, size: 48, color: AppColors.outlineVariant),
                        const SizedBox(height: 12),
                        const Text(
                          'No smallholder farmers found matching query.',
                          style: TextStyle(fontSize: 14, color: AppColors.onSurfaceVariant),
                        ),
                        const SizedBox(height: 12),
                        OutlinedButton(
                          onPressed: () {
                            _searchController.clear();
                            setState(() {
                              _selectedFilter = 'All';
                            });
                          },
                          child: const Text('Reset Filters'),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                    itemCount: _filteredFarmers.length,
                    itemBuilder: (context, index) {
                      final farmer = _filteredFarmers[index];
                      return _buildFarmerCard(farmer);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label) {
    final isSelected = _selectedFilter == label;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (val) {
        if (val) {
          setState(() {
            _selectedFilter = label;
          });
        }
      },
      selectedColor: AppColors.primaryContainer,
      backgroundColor: Colors.white,
      labelStyle: TextStyle(
        fontSize: 12,
        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
        color: isSelected ? Colors.white : AppColors.onSurfaceVariant,
      ),
      side: BorderSide(
        color: isSelected ? AppColors.primaryContainer : AppColors.borderClean,
      ),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
    );
  }

  Widget _buildFarmerCard(Map<String, dynamic> farmer) {
    final statusColor = farmer['statusColor'] as Color;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.borderClean),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.02),
            blurRadius: 6,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(14.0),
        child: Column(
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 22,
                  backgroundColor: AppColors.primaryContainer,
                  child: Text(
                    farmer['initials'] as String,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            farmer['name'] as String,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: AppColors.onSurface,
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: statusColor.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              farmer['grade'] as String,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: statusColor,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${farmer['id']} • ${farmer['kebele']}',
                        style: const TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const Divider(height: 18, color: AppColors.borderClean),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Commodity & Plot', style: TextStyle(fontSize: 10, color: AppColors.outline)),
                    const SizedBox(height: 2),
                    Text(
                      '${farmer['commodity']} (${farmer['acreage']})',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.onSurface),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text('Input Credit Status', style: TextStyle(fontSize: 10, color: AppColors.outline)),
                    const SizedBox(height: 2),
                    Text(
                      farmer['loanStatus'] as String,
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: statusColor),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Calling ${farmer['phone']}...')),
                      );
                    },
                    icon: const Icon(Icons.phone_outlined, size: 16, color: AppColors.primaryContainer),
                    label: const Text('Call', style: TextStyle(fontSize: 12, color: AppColors.primaryContainer)),
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      minimumSize: Size.zero,
                      side: const BorderSide(color: AppColors.borderClean),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.of(context).pushNamed('/field-inspection');
                    },
                    icon: const Icon(Icons.fact_check_outlined, size: 16, color: Colors.white),
                    label: const Text('Inspect', style: TextStyle(fontSize: 12, color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryContainer,
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      minimumSize: Size.zero,
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
