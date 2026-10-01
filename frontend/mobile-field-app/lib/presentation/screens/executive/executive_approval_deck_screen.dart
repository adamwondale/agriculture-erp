import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class ExecutiveApprovalDeckScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const ExecutiveApprovalDeckScreen({super.key, this.onBack});

  @override
  State<ExecutiveApprovalDeckScreen> createState() => _ExecutiveApprovalDeckScreenState();
}

class _ExecutiveApprovalDeckScreenState extends State<ExecutiveApprovalDeckScreen> {
  final List<Map<String, dynamic>> _contracts = [
    {
      'id': 'AGR-EXEC-2024-019',
      'title': 'Commercial Partner Master Outgrower Agreement > 500 ha',
      'partner': 'Awash Farmers Cooperative Union',
      'scope': '620 Hectares (Teff & White Maize)',
      'exposure': '3,200,000.00 ETB',
      'legal': 'Legal Counsel Endorsed (Biruk Haile)',
      'finance': 'Treasury Risk Assessed',
      'status': 'Pending Signature',
      'approved': false,
    },
    {
      'id': 'CAP-EXEC-2024-008',
      'title': 'Continuous Grain Dryer Unit Procurement & Installation',
      'partner': 'Akaki Industrial Engineering',
      'scope': 'Jimma Silo Hub Intake Terminal (50 MT/hr)',
      'exposure': '1,850,000.00 ETB',
      'legal': 'Tender Board Verified (3 Bids)',
      'finance': 'Capital Budget Allocated',
      'status': 'Pending Signature',
      'approved': false,
    },
  ];

  void _approveContract(int index) {
    setState(() {
      _contracts[index]['approved'] = true;
      _contracts[index]['status'] = 'Biometrically Signed & Sealed';
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Contract ${_contracts[index]['id']} authorized with CEO biometric key.'),
        backgroundColor: AppColors.secondary,
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
        title: const Text('Executive High-Value Approvals'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Separation of Duties Warning
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppColors.borderClean),
              ),
              child: const Row(
                children: [
                  Icon(Icons.shield_outlined, color: AppColors.primaryContainer, size: 24),
                  SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'High-Threshold Gate (> 1,000,000 ETB). Requires executive biometric key and legal audit verification.',
                      style: TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Contract Cards
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _contracts.length,
              separatorBuilder: (_, __) => const SizedBox(height: 16),
              itemBuilder: (context, index) {
                final c = _contracts[index];
                final isApproved = c['approved'] as bool;

                return Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: AppColors.borderClean),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.02),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(c['id'] as String, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: isApproved ? AppColors.secondaryContainer.withValues(alpha: 0.4) : const Color(0xFFFFF9F5),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              c['status'] as String,
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: isApproved ? AppColors.secondary : const Color(0xFFC05621),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(c['title'] as String, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                      const SizedBox(height: 4),
                      Text('Partner: ${c['partner']}', style: const TextStyle(fontSize: 12, color: AppColors.onSurfaceVariant)),
                      Text('Scope: ${c['scope']}', style: const TextStyle(fontSize: 12, color: AppColors.outline)),
                      const SizedBox(height: 12),

                      // Exposure Card
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.surfaceContainerLow,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Total Financial Exposure:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                            Text(c['exposure'] as String, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.primaryContainer)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Audit Checklist
                      Row(
                        children: [
                          const Icon(Icons.verified, size: 14, color: AppColors.secondary),
                          const SizedBox(width: 4),
                          Text(c['legal'] as String, style: const TextStyle(fontSize: 11, color: AppColors.secondary, fontWeight: FontWeight.w600)),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(Icons.verified, size: 14, color: AppColors.secondary),
                          const SizedBox(width: 4),
                          Text(c['finance'] as String, style: const TextStyle(fontSize: 11, color: AppColors.secondary, fontWeight: FontWeight.w600)),
                        ],
                      ),
                      const SizedBox(height: 16),

                      // Slide-to-Approve Action
                      if (!isApproved)
                        SizedBox(
                          width: double.infinity,
                          height: 46,
                          child: ElevatedButton.icon(
                            onPressed: () => _approveContract(index),
                            icon: const Icon(Icons.fingerprint, size: 20),
                            label: const Text('Authorize & Sign-Off (Biometric)', style: TextStyle(fontWeight: FontWeight.bold)),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primaryContainer,
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                          ),
                        )
                      else
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: AppColors.secondaryContainer.withValues(alpha: 0.3),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.check_circle, size: 16, color: AppColors.secondary),
                              SizedBox(width: 6),
                              Text('Executive Signature Sealed', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.secondary)),
                            ],
                          ),
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
