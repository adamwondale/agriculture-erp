import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'presentation/screens/auth/welcome_splash_screen.dart';
import 'presentation/screens/auth/login_screen.dart';
import 'presentation/screens/auth/mfa_verification_screen.dart';
import 'presentation/screens/home/main_nav_screen.dart';
import 'presentation/screens/profile/profile_security_screen.dart';
import 'presentation/screens/farmer_registration/farmer_registration_screen.dart';
import 'presentation/screens/field_inspection/field_inspection_screen.dart';
import 'presentation/screens/parcel_mapping/parcel_mapping_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AgriFieldApp());
}

class AgriFieldApp extends StatelessWidget {
  const AgriFieldApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Z•ORISIS Mobile Field App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (_) => const WelcomeSplashScreen(),
        '/login': (_) => const LoginScreen(),
        '/mfa': (_) => const MfaVerificationScreen(),
        '/home': (_) => const MainNavScreen(),
        '/profile': (_) => const ProfileSecurityScreen(),
        '/farmer-registration': (_) => const FarmerRegistrationScreen(),
        '/field-inspection': (_) => const FieldInspectionScreen(),
        '/parcel-mapping': (_) => const ParcelMappingScreen(),
      },
    );
  }
}
