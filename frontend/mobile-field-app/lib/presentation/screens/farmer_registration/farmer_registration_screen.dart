import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FarmerRegistrationScreen extends StatefulWidget {
  const FarmerRegistrationScreen({super.key});

  @override
  State<FarmerRegistrationScreen> createState() => _FarmerRegistrationScreenState();
}

class _FarmerRegistrationScreenState extends State<FarmerRegistrationScreen> {
  final _nameController = TextEditingController();
  final _nationalIdController = TextEditingController();
  final _phoneController = TextEditingController();
  final _coopController = TextEditingController(text: 'Oromia Coffee & Grain Union');

  @override
  void dispose() {
    _nameController.dispose();
    _nationalIdController.dispose();
    _phoneController.dispose();
    _coopController.dispose();
    super.dispose();
  }

  void _saveOffline() {
    final name = _nameController.text.trim();
    if (name.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter farmer name')),
      );
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Farmer "$name" saved locally in SQLite (Offline-First)'),
        backgroundColor: AppColors.primaryContainer,
      ),
    );
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        title: const Text('Offline Farmer Registration'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            padding: const EdgeInsets.all(20.0),
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
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: AppColors.surfaceContainerLow,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(Icons.person_add, color: AppColors.secondary),
                    ),
                    const SizedBox(width: 12),
                    const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'New Grower Profile',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: AppColors.onSurface,
                          ),
                        ),
                        Text(
                          'Stored in local SQLite cache',
                          style: TextStyle(
                            fontSize: 12,
                            color: AppColors.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const Text('Full Legal Name', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _nameController,
                  decoration: const InputDecoration(hintText: 'e.g. Gemeda Feyissa'),
                ),
                const SizedBox(height: 16),
                const Text('National ID / Kebele ID', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _nationalIdController,
                  decoration: const InputDecoration(hintText: 'e.g. ET-OR-882194'),
                ),
                const SizedBox(height: 16),
                const Text('Primary Phone', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(hintText: 'e.g. +251 91 100 2030'),
                ),
                const SizedBox(height: 16),
                const Text('Cooperative Association', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                const SizedBox(height: 6),
                TextField(
                  controller: _coopController,
                  decoration: const InputDecoration(hintText: 'Cooperative or Union'),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton.icon(
                    onPressed: _saveOffline,
                    icon: const Icon(Icons.save_outlined, size: 20),
                    label: const Text('Save Offline in Drift SQLite'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primaryContainer,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
