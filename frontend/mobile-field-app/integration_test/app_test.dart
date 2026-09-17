import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:mobile_field_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('End-to-End Test', () {
    testWidgets('Complete User Journey', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // 1. Authentication Flow
      // Start at WelcomeSplashScreen and tap "Sign In"
      expect(find.text('Welcome Back!'), findsOneWidget);
      await tester.tap(find.widgetWithText(ElevatedButton, 'Sign In'));
      await tester.pumpAndSettle();

      // Enter email/password on LoginScreen and tap "Sign In to Workspace"
      expect(find.text('Login to Terminal'), findsOneWidget);
      await tester.enterText(
          find.widgetWithText(TextField, 'e.g. agronomist@coop.ag or FM-492'), 'test@agronomist.ag');
      await tester.enterText(
          find.widgetWithText(TextField, '••••••••••••'), 'password123');
      await tester.tap(find.widgetWithText(ElevatedButton, 'Sign In to Workspace'));
      await tester.pumpAndSettle();

      // Complete 6-digit passcode entry on MfaVerificationScreen and tap "Verify Session"
      expect(find.text('MFA Verification'), findsOneWidget);
      final textFields = find.byType(TextField);
      expect(textFields, findsNWidgets(6));
      for (int i = 0; i < 6; i++) {
        await tester.enterText(textFields.at(i), '1');
      }
      await tester.pumpAndSettle();
      await tester.tap(find.widgetWithText(ElevatedButton, 'Verify Session'));
      await tester.pumpAndSettle();

      // 2. Dashboard & Offline Operations
      // Verify landing on MainNavScreen / DashboardScreen with the 2x2 metric cards
      expect(find.text('Agronomy Terminal'), findsOneWidget);
      expect(find.text('Assigned Farms'), findsOneWidget);
      expect(find.text('Pending Tasks'), findsOneWidget);

      // Tap "Register Farmer", fill out the farmer registration form, and verify saving offline into Drift SQLite
      await tester.tap(find.widgetWithText(ElevatedButton, 'Register Farmer'));
      await tester.pumpAndSettle();

      expect(find.text('Offline Farmer Registration'), findsOneWidget);
      await tester.enterText(
          find.widgetWithText(TextField, 'e.g. Gemeda Feyissa'), 'John Doe');
      await tester.enterText(
          find.widgetWithText(TextField, 'e.g. ET-OR-882194'), 'ID-12345');
      await tester.enterText(
          find.widgetWithText(TextField, 'e.g. +251 91 100 2030'), '+1 123 456 7890');

      await tester.tap(find.widgetWithText(ElevatedButton, 'Save Offline in Drift SQLite'));
      await tester.pumpAndSettle();

      expect(find.text('Farmer "John Doe" saved locally in SQLite (Offline-First)'), findsOneWidget);

      // Tap "Log Inspection", fill out the inspection score, and verify offline saving.
      await tester.tap(find.widgetWithText(ElevatedButton, 'Log Inspection'));
      await tester.pumpAndSettle();

      expect(find.text('Field Agronomy Inspection'), findsOneWidget);
      await tester.enterText(
          find.widgetWithText(TextField, 'e.g. 88'), '95');
      await tester.enterText(
          find.widgetWithText(TextField, 'Notes on soil, pests, irrigation, moisture...'), 'Looks good.');

      await tester.tap(find.widgetWithText(ElevatedButton, 'Record Offline Inspection'));
      await tester.pumpAndSettle();

      expect(find.text('Field Inspection for BL-4B-TEFF saved offline.'), findsOneWidget);

      // 3. Navigation & Session
      // Switch tabs via bottom navigation bar (Home, Farms, Tasks, Profile)
      await tester.tap(find.text('Farms'));
      await tester.pumpAndSettle();
      expect(find.text('Parcel Mapping'), findsOneWidget);

      await tester.tap(find.text('Tasks'));
      await tester.pumpAndSettle();
      expect(find.text('Field Agronomy Inspection'), findsOneWidget);

      await tester.tap(find.text('Profile'));
      await tester.pumpAndSettle();
      expect(find.text('Security Profile'), findsOneWidget);

      // On the Profile screen, verify telemetry stats and tap "Sign Out of Terminal" to return to the Welcome screen.
      expect(find.text('Assigned Parcels'), findsOneWidget);
      expect(find.text('Sync Health'), findsOneWidget);
      expect(find.text('Clearance'), findsOneWidget);

      // We need to scroll to the Sign Out of Terminal button
      await tester.drag(find.text('Security Profile'), const Offset(0.0, -500.0));
      await tester.pumpAndSettle();

      await tester.tap(find.widgetWithText(TextButton, 'Sign Out of Terminal'));
      await tester.pumpAndSettle();

      expect(find.text('Welcome Back!'), findsOneWidget);
    });
  });
}
