import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import 'login_screen.dart';

class WelcomeSplashScreen extends StatelessWidget {
  const WelcomeSplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.warmEarth,
      body: Stack(
        children: [
          // Background Field Image on bottom portion
          Positioned.fill(
            top: MediaQuery.of(context).size.height * 0.28,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Image.asset(
                  'assets/images/splash_field.png',
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => Container(
                    color: AppColors.primaryContainer,
                  ),
                ),
                // Soft gradient transition from Warm Earth to image
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 120,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          AppColors.warmEarth,
                          AppColors.warmEarth.withValues(alpha: 0.7),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                ),
                // Dark vignette gradient for bottom text contrast
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 380,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.85),
                          Colors.black.withValues(alpha: 0.5),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Main Column layout
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Top Brand Mark Section
                  Column(
                    children: [
                      const SizedBox(height: 20),
                      // Logo Emblem
                      Container(
                        width: 90,
                        height: 90,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.08),
                              blurRadius: 16,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: ClipOval(
                          child: Image.asset(
                            'assets/images/logo_emblem.png',
                            fit: BoxFit.contain,
                            errorBuilder: (_, __, ___) => Container(
                              color: AppColors.surfaceContainerLowest,
                              child: const Icon(Icons.eco, color: AppColors.secondary, size: 48),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      // Wordmark
                      RichText(
                        text: TextSpan(
                          style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                                color: AppColors.primary,
                                fontWeight: FontWeight.w800,
                                letterSpacing: 0.5,
                              ),
                          children: const [
                            TextSpan(text: 'Z'),
                            TextSpan(
                              text: ' • ',
                              style: TextStyle(color: AppColors.secondary),
                            ),
                            TextSpan(text: 'ORISIS'),
                          ],
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'TOGETHER WE GROW',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                              letterSpacing: 3.0,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textMuted,
                            ),
                      ),
                    ],
                  ),

                  // Bottom Action Section
                  Column(
                    children: [
                      Text(
                        'Welcome Back!',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              shadows: [
                                Shadow(
                                  color: Colors.black.withValues(alpha: 0.6),
                                  blurRadius: 8,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                            ),
                      ),
                      const SizedBox(height: 8),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20.0),
                        child: Text(
                          'Sign in to continue managing your farm efficiently.',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: const Color(0xFFE8F1EA),
                                shadows: [
                                  Shadow(
                                    color: Colors.black.withValues(alpha: 0.6),
                                    blurRadius: 6,
                                    offset: const Offset(0, 1),
                                  ),
                                ],
                              ),
                        ),
                      ),
                      const SizedBox(height: 28),

                      // Sign In Button
                      SizedBox(
                        width: double.infinity,
                        height: 52,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (_) => const LoginScreen()),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primaryContainer,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                              side: BorderSide(color: Colors.white.withValues(alpha: 0.2)),
                            ),
                            elevation: 4,
                          ),
                          child: const Text('Sign In'),
                        ),
                      ),
                      const SizedBox(height: 12),

                      // Request Partnership Button
                      SizedBox(
                        width: double.infinity,
                        height: 52,
                        child: OutlinedButton(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Partnership portal opened.'),
                                backgroundColor: AppColors.primaryContainer,
                              ),
                            );
                          },
                          style: OutlinedButton.styleFrom(
                            backgroundColor: Colors.white,
                            foregroundColor: AppColors.primary,
                            side: const BorderSide(color: AppColors.borderClean),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                            ),
                            elevation: 2,
                            textStyle: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          child: const Text('Request for Partnership'),
                        ),
                      ),
                      const SizedBox(height: 16),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
