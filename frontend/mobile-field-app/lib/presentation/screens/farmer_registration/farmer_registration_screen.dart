import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';

class FarmerRegistrationScreen extends StatefulWidget {
  final VoidCallback? onBack;

  const FarmerRegistrationScreen({super.key, this.onBack});

  @override
  State<FarmerRegistrationScreen> createState() => _FarmerRegistrationScreenState();
}

class _FarmerRegistrationScreenState extends State<FarmerRegistrationScreen> {
  int _currentStep = 0;

  // Step 1: Identity Controllers
  final _firstNameController = TextEditingController(text: 'Dawit');
  final _fatherNameController = TextEditingController(text: 'Kebede');
  final _grandNameController = TextEditingController(text: 'Gemechu');
  String _gender = 'Male';
  String _idType = 'Fayda National ID';
  final _idNumberController = TextEditingController(text: 'ET-9401-2291-8840');

  // Step 2: Location Controllers
  String _region = 'Oromia';
  String _woreda = 'Mana Woreda';
  final _kebeleController = TextEditingController(text: 'Bilida');
  final _villageController = TextEditingController(text: 'Garo Bula');
  String _gpsCoordinates = '7.6738° N, 36.8344° E (Accuracy: ±2.8m)';

  // Step 3: Farm Plot & Crop
  final _hectaresController = TextEditingController(text: '2.4');
  String _commodity = 'Red Teff (Quncho)';
  String _ownership = 'Privately Held';
  String _soilType = 'Clay Loam (Vertisol)';

  // Step 4: Mobile & Settlement
  final _phoneController = TextEditingController(text: '0911428831');
  bool _consentAgreed = true;

  @override
  void dispose() {
    _firstNameController.dispose();
    _fatherNameController.dispose();
    _grandNameController.dispose();
    _idNumberController.dispose();
    _kebeleController.dispose();
    _villageController.dispose();
    _hectaresController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  void _saveOfflineDraft() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Registration draft saved locally in SQLite cache.'),
        backgroundColor: AppColors.primaryContainer,
      ),
    );
  }

  void _finishRegistration() {
    final fullName = '${_firstNameController.text} ${_fatherNameController.text}';
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Smallholder "$fullName" successfully registered & queued for sync.'),
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
        title: const Text('Smallholder Registration'),
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
                Icon(Icons.wifi_off, size: 14, color: AppColors.secondary),
                SizedBox(width: 4),
                Text('Offline Mode', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.secondary)),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Step Progress Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: Colors.white,
            child: Row(
              children: [
                _buildStepPill(0, 'Identity'),
                _buildStepDivider(0),
                _buildStepPill(1, 'Location'),
                _buildStepDivider(1),
                _buildStepPill(2, 'Parcel'),
                _buildStepDivider(2),
                _buildStepPill(3, 'Consent'),
              ],
            ),
          ),
          const Divider(height: 1, color: AppColors.borderClean),

          // Step Body
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: _buildCurrentStepContent(),
            ),
          ),

          // Bottom Action Dock
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 10,
                  offset: const Offset(0, -2),
                ),
              ],
              border: const Border(top: BorderSide(color: AppColors.borderClean, width: 0.5)),
            ),
            child: SafeArea(
              top: false,
              child: Row(
                children: [
                  OutlinedButton(
                    onPressed: _saveOfflineDraft,
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    ),
                    child: const Text('Save Draft', style: TextStyle(fontSize: 13)),
                  ),
                  const SizedBox(width: 10),
                  if (_currentStep > 0)
                    OutlinedButton(
                      onPressed: () => setState(() => _currentStep--),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      ),
                      child: const Text('Back', style: TextStyle(fontSize: 13)),
                    ),
                  if (_currentStep > 0) const SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        if (_currentStep < 3) {
                          setState(() => _currentStep++);
                        } else {
                          _finishRegistration();
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primaryContainer,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: Text(
                        _currentStep < 3 ? 'Continue to Next Step' : 'Confirm Registration',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepPill(int stepIndex, String title) {
    final isActive = _currentStep == stepIndex;
    final isDone = _currentStep > stepIndex;

    Color bg = AppColors.surfaceContainerLow;
    Color fg = AppColors.onSurfaceVariant;
    if (isActive) {
      bg = AppColors.primaryContainer;
      fg = Colors.white;
    } else if (isDone) {
      bg = AppColors.secondary;
      fg = Colors.white;
    }

    return InkWell(
      onTap: () => setState(() => _currentStep = stepIndex),
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isDone)
              const Icon(Icons.check, size: 12, color: Colors.white)
            else
              Text('${stepIndex + 1}', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: fg)),
            const SizedBox(width: 4),
            Text(title, style: TextStyle(fontSize: 11, fontWeight: isActive ? FontWeight.bold : FontWeight.w500, color: fg)),
          ],
        ),
      ),
    );
  }

  Widget _buildStepDivider(int afterStep) {
    final isPassed = _currentStep > afterStep;
    return Expanded(
      child: Container(
        height: 2,
        margin: const EdgeInsets.symmetric(horizontal: 4),
        color: isPassed ? AppColors.secondary : AppColors.borderClean,
      ),
    );
  }

  Widget _buildCurrentStepContent() {
    switch (_currentStep) {
      case 0:
        return _buildIdentityStep();
      case 1:
        return _buildLocationStep();
      case 2:
        return _buildParcelStep();
      case 3:
      default:
        return _buildConsentStep();
    }
  }

  Widget _buildIdentityStep() {
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
          const Text('1. Smallholder Legal Identity', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
          const SizedBox(height: 14),
          TextField(
            controller: _firstNameController,
            decoration: const InputDecoration(labelText: 'First Name (Given Name)', hintText: 'e.g. Dawit'),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _fatherNameController,
            decoration: const InputDecoration(labelText: "Father's Name", hintText: 'e.g. Kebede'),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _grandNameController,
            decoration: const InputDecoration(labelText: "Grandfather's Name", hintText: 'e.g. Gemechu'),
          ),
          const SizedBox(height: 14),
          const Text('Gender', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.outline)),
          Row(
            children: ['Male', 'Female'].map((g) {
              final isSel = _gender == g;
              return Padding(
                padding: const EdgeInsets.only(right: 12.0),
                child: ChoiceChip(
                  label: Text(g),
                  selected: isSel,
                  onSelected: (val) {
                    if (val) setState(() => _gender = g);
                  },
                  selectedColor: AppColors.primaryContainer,
                  labelStyle: TextStyle(
                    color: isSel ? Colors.white : AppColors.onSurfaceVariant,
                    fontWeight: isSel ? FontWeight.bold : FontWeight.w500,
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _idType,
            decoration: const InputDecoration(labelText: 'Primary National ID Type'),
            items: const [
              DropdownMenuItem(value: 'Fayda National ID', child: Text('Fayda National ID (Digital)')),
              DropdownMenuItem(value: 'Kebele Resident ID', child: Text('Kebele Resident ID Card')),
              DropdownMenuItem(value: 'Passport', child: Text('Ethiopian Passport')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _idType = val);
            },
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _idNumberController,
            decoration: const InputDecoration(labelText: 'ID Document Number', hintText: 'e.g. ET-9401-2291-8840'),
          ),
        ],
      ),
    );
  }

  Widget _buildLocationStep() {
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
          const Text('2. Administrative Jurisdiction & Kebele', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
          const SizedBox(height: 14),
          DropdownButtonFormField<String>(
            initialValue: _region,
            decoration: const InputDecoration(labelText: 'Region'),
            items: const [
              DropdownMenuItem(value: 'Oromia', child: Text('Oromia Regional State')),
              DropdownMenuItem(value: 'Amhara', child: Text('Amhara Regional State')),
              DropdownMenuItem(value: 'Sidama', child: Text('Sidama Regional State')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _region = val);
            },
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _woreda,
            decoration: const InputDecoration(labelText: 'Woreda Operational Hub'),
            items: const [
              DropdownMenuItem(value: 'Mana Woreda', child: Text('Mana Woreda Hub')),
              DropdownMenuItem(value: 'Jimma Woreda', child: Text('Jimma Central Woreda Hub')),
              DropdownMenuItem(value: 'Seka Woreda', child: Text('Seka Chekorsa Woreda Hub')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _woreda = val);
            },
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _kebeleController,
            decoration: const InputDecoration(labelText: 'Kebele Administration', hintText: 'e.g. Bilida'),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _villageController,
            decoration: const InputDecoration(labelText: 'Village (Gote / Area)', hintText: 'e.g. Garo Bula'),
          ),
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainerLow,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppColors.borderClean),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Row(
                      children: [
                        Icon(Icons.gps_fixed, size: 16, color: AppColors.secondary),
                        SizedBox(width: 6),
                        Text('Homestead GPS Coordinates', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                      ],
                    ),
                    TextButton(
                      onPressed: () {
                        setState(() {
                          _gpsCoordinates = '7.6745° N, 36.8351° E (Accuracy: ±1.9m)';
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('High-precision GPS fix refreshed.')),
                        );
                      },
                      style: TextButton.styleFrom(padding: EdgeInsets.zero, minimumSize: Size.zero),
                      child: const Text('Refresh GPS', style: TextStyle(fontSize: 11)),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(_gpsCoordinates, style: const TextStyle(fontSize: 12, fontFamily: 'monospace', color: AppColors.onSurfaceVariant)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildParcelStep() {
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
          const Text('3. Agricultural Parcel & Outgrower Scope', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
          const SizedBox(height: 14),
          TextField(
            controller: _hectaresController,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            decoration: const InputDecoration(labelText: 'Total Cultivable Area (Hectares)', hintText: 'e.g. 2.4'),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _commodity,
            decoration: const InputDecoration(labelText: 'Primary Target Commodity'),
            items: const [
              DropdownMenuItem(value: 'Red Teff (Quncho)', child: Text('Red Teff (Quncho DZ-Cr-387)')),
              DropdownMenuItem(value: 'White Maize (BH-661)', child: Text('White Maize (Hybrid BH-661)')),
              DropdownMenuItem(value: 'Haricot Bean (Awash-1)', child: Text('Haricot Bean (Awash-1 Export)')),
              DropdownMenuItem(value: 'Arabica Coffee (Limmu)', child: Text('Arabica Coffee (Grade 1 Limmu)')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _commodity = val);
            },
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _ownership,
            decoration: const InputDecoration(labelText: 'Land Tenure & Certificate Type'),
            items: const [
              DropdownMenuItem(value: 'Privately Held', child: Text('Privately Held (Kebele Book of Holding)')),
              DropdownMenuItem(value: 'Family Inherited', child: Text('Family Inherited (Communal)')),
              DropdownMenuItem(value: 'Long-term Lease', child: Text('Long-term Seasonal Lease')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _ownership = val);
            },
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _soilType,
            decoration: const InputDecoration(labelText: 'Soil Classification'),
            items: const [
              DropdownMenuItem(value: 'Clay Loam (Vertisol)', child: Text('Clay Loam (Vertisol - Black Soil)')),
              DropdownMenuItem(value: 'Sandy Loam (Nitisol)', child: Text('Sandy Loam (Nitisol - Red Soil)')),
              DropdownMenuItem(value: 'Silt Loam (Fluvisol)', child: Text('Silt Loam (River Basin Fluvisol)')),
            ],
            onChanged: (val) {
              if (val != null) setState(() => _soilType = val);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildConsentStep() {
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
          const Text('4. Telebirr Payment Wallet & Agreement', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
          const SizedBox(height: 14),
          TextField(
            controller: _phoneController,
            keyboardType: TextInputType.phone,
            decoration: const InputDecoration(
              labelText: 'Telebirr Mobile Account Number',
              hintText: '09...',
              prefixIcon: Icon(Icons.phone_android, size: 20),
            ),
          ),
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainerLow,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Outgrower Program Terms Summary:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.onSurface)),
                SizedBox(height: 4),
                Text(
                  '• Certified seeds and fertilizers issued on credit.\n'
                  '• Guaranteed harvest off-take at Woreda hub floor price.\n'
                  '• Net seasonal settlement disbursed directly via Telebirr.',
                  style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant, height: 1.4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Checkbox(
                value: _consentAgreed,
                activeColor: AppColors.secondary,
                onChanged: (val) => setState(() => _consentAgreed = val ?? false),
              ),
              const Expanded(
                child: Text(
                  'Farmer has reviewed terms and consented to digital parcel geo-tagging & Telebirr disbursement.',
                  style: TextStyle(fontSize: 12, color: AppColors.onSurface),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
