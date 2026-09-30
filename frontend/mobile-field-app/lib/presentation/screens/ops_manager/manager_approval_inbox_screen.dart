import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ManagerApprovalInboxScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const ManagerApprovalInboxScreen({super.key, this.onBack});

  @override
  State<ManagerApprovalInboxScreen> createState() => _ManagerApprovalInboxScreenState();
}

class _ManagerApprovalInboxScreenState extends State<ManagerApprovalInboxScreen> {
  String _selectedTab = 'All';

  final List<Map<String, dynamic>> _approvals = [
    {
      'id': 'REQ-2024-881',
      'type': 'Credit Requisition',
      'title': 'Seasonal Input Loan Requisition > 50,000 ETB',
      'applicant': 'Gedeb Outgrower Cooperative Union (48 Members)',
      'submittedBy': 'Dawit Kebede (Field Agronomist)',
      'amount': '128,400.00 ETB',
      'urgency': 'High Priority',
      'urgencyColor': AppColors.error,
      'date': '24 mins ago',
      'audit': 'Agronomist Inspected • Kebele Endorsed',
      'status': 'Pending',
    },
    {
      'id': 'REQ-2024-879',
      'type': 'Boundary Adjustment',
      'title': 'Parcel Polygon Boundary Modification (+0.85 ha)',
      'applicant': 'Parcel #P-JIM-042 (Tadesse Gemechu)',
      'submittedBy': 'Dawit Kebede (Field Agronomist)',
      'amount': 'Adjustment: 2.42 ha ➔ 3.27 ha',
      'urgency': 'Normal',
      'urgencyColor': const Color(0xFFC05621),
      'date': '1 hour ago',
      'audit': 'Differential GPS Certified (±1.8m)',
      'status': 'Pending',
    },
    {
      'id': 'REQ-2024-872',
      'type': 'Input Waiver',
      'title': 'Emergency Bio-Pesticide Buffer Issuance (Armyworm Outbreak)',
      'applicant': 'Bilida Cluster 4 Farm Station',
      'submittedBy': 'Hailu Mengesha (Field Agronomist)',
      'amount': '40 Liters Bio-Pesticide (16,000 ETB)',
      'urgency': 'Critical',
      'urgencyColor': AppColors.error,
      'date': '3 hours ago',
      'audit': 'Scouting Score: 78% Infestation Risk',
      'status': 'Pending',
    },
    {
      'id': 'REQ-2024-865',
      'type': 'Credit Requisition',
      'title': 'Outgrower Seed Package Credit Top-Up',
      'applicant': 'Almaz Ayana (Mana Woreda)',
      'submittedBy': 'Dawit Kebede (Field Agronomist)',
      'amount': '4,200.00 ETB',
      'urgency': 'Normal',
      'urgencyColor': AppColors.secondary,
      'date': 'Yesterday',
      'audit': 'Reliability: Grade A (100% Repaid)',
      'status': 'Pending',
    },
  ];

  void _processAction(int index, bool approve) {
    setState(() {
      _approvals[index]['status'] = approve ? 'Approved' : 'Rejected';
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(approve ? 'Request approved and signed.' : 'Request rejected and returned to field officer.'),
        backgroundColor: approve ? AppColors.secondary : AppColors.error,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final pendingItems = _approvals.where((a) {
      if (_selectedTab == 'Credit') return a['type'] == 'Credit Requisition';
      if (_selectedTab == 'Boundary') return a['type'] == 'Boundary Adjustment';
      if (_selectedTab == 'Waivers') return a['type'] == 'Input Waiver';
      return true;
    }).toList();

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
        title: const Text('Manager Approval Inbox'),
      ),
      body: Column(
        children: [
          // Filter Tabs
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            color: AppColors.surface,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildTabChip('All', _approvals.length),
                  const SizedBox(width: 8),
                  _buildTabChip('Credit', 2),
                  const SizedBox(width: 8),
                  _buildTabChip('Boundary', 1),
                  const SizedBox(width: 8),
                  _buildTabChip('Waivers', 1),
                ],
              ),
            ),
          ),
          const Divider(height: 1, color: AppColors.borderClean),

          // Approval Cards List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16.0),
              itemCount: pendingItems.length,
              itemBuilder: (context, index) {
                final item = pendingItems[index];
                return _buildApprovalCard(item, index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabChip(String label, int count) {
    final isSelected = _selectedTab == label;
    return ChoiceChip(
      label: Text('$label ($count)'),
      selected: isSelected,
      onSelected: (val) {
        if (val) setState(() => _selectedTab = label);
      },
      selectedColor: AppColors.primaryContainer,
      backgroundColor: Colors.white,
      labelStyle: TextStyle(
        fontSize: 12,
        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
        color: isSelected ? Colors.white : AppColors.onSurfaceVariant,
      ),
      side: BorderSide(color: isSelected ? AppColors.primaryContainer : AppColors.borderClean),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
    );
  }

  Widget _buildApprovalCard(Map<String, dynamic> item, int index) {
    final isPending = item['status'] == 'Pending';
    final urgencyColor = item['urgencyColor'] as Color;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
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
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    '${item['id']} • ${item['type']}',
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.primaryContainer),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: urgencyColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    item['urgency'] as String,
                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: urgencyColor),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              item['title'] as String,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface),
            ),
            const SizedBox(height: 4),
            Text(
              'Applicant: ${item['applicant']}',
              style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
            ),
            Text(
              'Submitted: ${item['submittedBy']} • ${item['date']}',
              style: const TextStyle(fontSize: 11, color: AppColors.outline),
            ),
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AppColors.surfaceContainerLow,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    item['amount'] as String,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.primaryContainer),
                  ),
                  Row(
                    children: [
                      const Icon(Icons.verified, size: 14, color: AppColors.secondary),
                      const SizedBox(width: 4),
                      Text(
                        item['audit'] as String,
                        style: const TextStyle(fontSize: 11, color: AppColors.secondary, fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),
            if (isPending)
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => _processAction(index, false),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        side: const BorderSide(color: AppColors.errorContainer),
                      ),
                      child: const Text('Reject', style: TextStyle(fontSize: 13, color: AppColors.error, fontWeight: FontWeight.bold)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => _processAction(index, true),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryContainer,
                        padding: const EdgeInsets.symmetric(vertical: 10),
                      ),
                      child: const Text('Approve & Sign', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                    ),
                  ),
                ],
              )
            else
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: BoxDecoration(
                  color: item['status'] == 'Approved'
                      ? AppColors.secondaryContainer.withValues(alpha: 0.3)
                      : AppColors.errorContainer.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: Text(
                    'Status: ${item['status']}',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: item['status'] == 'Approved' ? AppColors.secondary : AppColors.error,
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
