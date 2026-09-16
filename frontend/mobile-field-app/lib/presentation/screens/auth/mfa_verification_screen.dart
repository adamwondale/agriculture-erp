import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/theme/app_theme.dart';
import '../home/main_nav_screen.dart';

class MfaVerificationScreen extends StatefulWidget {
  final String userIdentifier;

  const MfaVerificationScreen({
    super.key,
    this.userIdentifier = 'agronomist@coop.ag',
  });

  @override
  State<MfaVerificationScreen> createState() => _MfaVerificationScreenState();
}

class _MfaVerificationScreenState extends State<MfaVerificationScreen> {
  static const int _otpLength = 6;
  final List<TextEditingController> _controllers =
      List.generate(_otpLength, (_) => TextEditingController());
  final List<FocusNode> _focusNodes =
      List.generate(_otpLength, (_) => FocusNode());

  int _countdown = 30;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    // Pre-populate sample first three digits like mockup: 8, 4, 2
    _controllers[0].text = '8';
    _controllers[1].text = '4';
    _controllers[2].text = '2';
    _startTimer();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focusNodes[3].requestFocus();
    });
  }

  void _startTimer() {
    _timer?.cancel();
    _countdown = 30;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_countdown > 0) {
        setState(() => _countdown--);
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (var c in _controllers) {
      c.dispose();
    }
    for (var f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }

  void _onDigitChanged(int index, String value) {
    if (value.isNotEmpty) {
      if (index < _otpLength - 1) {
        _focusNodes[index + 1].requestFocus();
      } else {
        _focusNodes[index].unfocus();
        _verifyCode();
      }
    }
  }

  void _verifyCode() {
    final code = _controllers.map((c) => c.text).join();
    if (code.length == _otpLength) {
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const MainNavScreen()),
        (route) => false,
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter the full 6-digit code')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Row(
          children: [
            Image.asset(
              'assets/images/logo_emblem.png',
              height: 28,
              width: 28,
              errorBuilder: (_, __, ___) => const Icon(
                Icons.eco,
                color: AppColors.secondary,
                size: 24,
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'Two Factor Verification',
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.w600,
                color: AppColors.primary,
              ),
            ),
          ],
        ),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: AppColors.primaryContainer,
              child: Icon(Icons.person, size: 18, color: Colors.white),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 12),

                  // Emblem Icon with Shield & Eco Sprout
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      Container(
                        width: 72,
                        height: 72,
                        decoration: const BoxDecoration(
                          color: AppColors.surfaceContainerHigh,
                          shape: BoxShape.circle,
                        ),
                        child: Center(
                          child: Container(
                            width: 52,
                            height: 52,
                            decoration: const BoxDecoration(
                              color: AppColors.primaryContainer,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.verified_user,
                              color: AppColors.secondaryContainer,
                              size: 28,
                            ),
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          width: 24,
                          height: 24,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.1),
                                blurRadius: 4,
                              ),
                            ],
                          ),
                          child: const Icon(
                            Icons.eco,
                            size: 14,
                            color: AppColors.secondary,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  Text(
                    'Verify Your Identity',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: AppColors.primary,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Text(
                      'Enter the 6-digit verification code sent to your registered field device or authenticator app.',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: AppColors.onSurfaceVariant,
                            height: 1.4,
                          ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Main Verification Card
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.borderClean),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.04),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        // Device Descriptor
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: AppColors.surfaceContainerLow,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 36,
                                height: 36,
                                decoration: BoxDecoration(
                                  color: AppColors.surfaceContainer,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: const Icon(
                                  Icons.phonelink_lock,
                                  color: AppColors.secondary,
                                  size: 20,
                                ),
                              ),
                              const SizedBox(width: 12),
                              const Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Agronomist Handheld (AG-88)',
                                      style: TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.onSurface,
                                      ),
                                    ),
                                    Text(
                                      'SMS ending in •••• 4910',
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: AppColors.onSurfaceVariant,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              TextButton(
                                onPressed: () {},
                                child: const Text(
                                  'Change',
                                  style: TextStyle(
                                    color: AppColors.secondary,
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),

                        const Text(
                          'Authentication Passcode',
                          style: TextStyle(
                            fontSize: 13,
                            color: AppColors.onSurfaceVariant,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 12),

                        // 6 OTP Digit Boxes
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: List.generate(_otpLength, (index) {
                            return SizedBox(
                              width: 44,
                              height: 52,
                              child: KeyboardListener(
                                focusNode: FocusNode(),
                                onKeyEvent: (event) {
                                  if (event is KeyDownEvent &&
                                      event.logicalKey ==
                                          LogicalKeyboardKey.backspace) {
                                    if (_controllers[index].text.isEmpty &&
                                        index > 0) {
                                      _focusNodes[index - 1].requestFocus();
                                    }
                                  }
                                },
                                child: TextField(
                                  controller: _controllers[index],
                                  focusNode: _focusNodes[index],
                                  textAlign: TextAlign.center,
                                  keyboardType: TextInputType.number,
                                  maxLength: 1,
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.primary,
                                  ),
                                  inputFormatters: [
                                    FilteringTextInputFormatter.digitsOnly,
                                  ],
                                  decoration: InputDecoration(
                                    counterText: '',
                                    contentPadding: EdgeInsets.zero,
                                    filled: true,
                                    fillColor: _focusNodes[index].hasFocus
                                        ? AppColors.surfaceContainerLow
                                        : Colors.white,
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(8),
                                      borderSide: const BorderSide(
                                        color: AppColors.borderClean,
                                      ),
                                    ),
                                    focusedBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(8),
                                      borderSide: const BorderSide(
                                        color: AppColors.secondary,
                                        width: 2,
                                      ),
                                    ),
                                  ),
                                  onChanged: (val) =>
                                      _onDigitChanged(index, val),
                                ),
                              ),
                            );
                          }),
                        ),
                        const SizedBox(height: 16),

                        // Resend countdown
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(
                              Icons.update,
                              size: 16,
                              color: AppColors.secondary,
                            ),
                            const SizedBox(width: 4),
                            const Text(
                              'Did not receive? ',
                              style: TextStyle(
                                fontSize: 12,
                                color: AppColors.onSurfaceVariant,
                              ),
                            ),
                            if (_countdown > 0)
                              Text(
                                '00:${_countdown.toString().padLeft(2, '0')}',
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.primary,
                                ),
                              )
                            else
                              GestureDetector(
                                onTap: _startTimer,
                                child: const Text(
                                  'Resend Now',
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.secondary,
                                    decoration: TextDecoration.underline,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 20),

                        // Verify Button
                        SizedBox(
                          width: double.infinity,
                          height: 50,
                          child: ElevatedButton(
                            onPressed: _verifyCode,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Verify Session',
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                SizedBox(width: 8),
                                Icon(Icons.arrow_forward, size: 18),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),

                        // Backup Recovery Code Button
                        SizedBox(
                          width: double.infinity,
                          height: 44,
                          child: TextButton.icon(
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  content: Text('Backup code modal opened.'),
                                ),
                              );
                            },
                            style: TextButton.styleFrom(
                              backgroundColor: AppColors.surfaceContainerLow,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            icon: const Icon(
                              Icons.vpn_key,
                              size: 16,
                              color: AppColors.secondary,
                            ),
                            label: const Text(
                              'Use backup recovery code',
                              style: TextStyle(
                                color: AppColors.primary,
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Agronomy Dispatch Link
                  TextButton.icon(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.support_agent,
                      size: 18,
                      color: AppColors.secondary,
                    ),
                    label: const Text(
                      'Agronomy Dispatch Assistance',
                      style: TextStyle(
                        color: AppColors.onSurfaceVariant,
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Support Helpline Footer
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.phone, size: 14, color: AppColors.secondary),
                      SizedBox(width: 4),
                      Text(
                        'Support Helpline: 8912 • Secured by Z•ORISIS Protocol',
                        style: TextStyle(
                          fontSize: 11,
                          color: AppColors.textMuted,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
