import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_field_app/data/models/auth_models.dart';
import 'package:mobile_field_app/presentation/providers/auth_provider.dart';
import 'package:mobile_field_app/presentation/screens/home/dashboard_screen.dart';
import 'package:mobile_field_app/presentation/screens/profile/profile_security_screen.dart';
import 'package:mobile_field_app/presentation/screens/auth/mfa_verification_screen.dart';

void main() {
  group('Role-Based Rendering and Session Tests', () {
    testWidgets('DashboardScreen displays Agronomist credentials and specific actions',
        (tester) async {
      final agronomist = UserSummary(
        id: 'user-agronomist-1',
        email: 'agronomist@coop.ag',
        username: 'agronomist',
        displayName: 'Abebe Tesfaye',
        status: 'Active',
        department: 'Agronomy Research',
        position: 'Senior Agronomist',
        branchId: 'BR-OROMIA-01',
        roles: ['Agronomist'],
        permissions: [
          'CAN_INSPECT_FIELDS',
          'CAN_SCOUT_CROPS',
          'CAN_MAP_PARCELS',
          'CAN_RECORD_YIELD',
        ],
      );

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            authNotifierProvider.overrideWith(
              (ref) => _FakeAuthNotifier(
                AuthAuthenticated(user: agronomist, accessToken: 'test-token'),
              ),
            ),
          ],
          child: const MaterialApp(
            home: DashboardScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Check user display name and initials
      expect(find.text('Abebe Tesfaye'), findsOneWidget);
      expect(find.text('AT'), findsOneWidget);

      // Check dynamic primary role badge & department
      expect(find.text('Agronomist'), findsOneWidget);
      expect(find.text('Agronomy Research • Senior Agronomist'), findsOneWidget);

      // Check Agronomist actions
      expect(find.text('Log Inspection'), findsOneWidget);
      expect(find.text('Map Parcel'), findsOneWidget);
      expect(find.text('+ New Field Log'), findsOneWidget);
    });

    testWidgets('DashboardScreen displays Field Officer credentials and actions',
        (tester) async {
      final fieldOfficer = UserSummary(
        id: 'user-fo-1',
        email: 'fieldofficer@coop.ag',
        username: 'fieldofficer',
        displayName: 'Fatima Al-Hassan',
        status: 'Active',
        department: 'Extension Services',
        position: 'Lead Field Officer',
        branchId: 'BR-OROMIA-01',
        roles: ['FieldOfficer'],
        permissions: [
          'CAN_REGISTER_FARMERS',
          'CAN_VIEW_FARMS',
          'CAN_MAP_PARCELS',
        ],
      );

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            authNotifierProvider.overrideWith(
              (ref) => _FakeAuthNotifier(
                AuthAuthenticated(user: fieldOfficer, accessToken: 'test-token'),
              ),
            ),
          ],
          child: const MaterialApp(
            home: DashboardScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text('Fatima Al-Hassan'), findsOneWidget);
      expect(find.text('FA'), findsOneWidget);
      expect(find.text('Field Officer'), findsOneWidget);
      expect(find.text('Register Farmer'), findsOneWidget);
    });

    testWidgets('ProfileSecurityScreen renders granted permissions and user details',
        (tester) async {
      final user = UserSummary(
        id: 'user-manager-1',
        email: 'manager@coop.ag',
        username: 'manager',
        displayName: 'Dawit Wolde',
        status: 'Active',
        department: 'Operations',
        position: 'Regional Farm Manager',
        branchId: 'BR-OROMIA-01',
        roles: ['FarmManager'],
        permissions: [
          'CAN_APPROVE_AUDIT',
          'CAN_VIEW_FARMS',
          'CAN_REQUEST_STOCK',
        ],
      );

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            authNotifierProvider.overrideWith(
              (ref) => _FakeAuthNotifier(
                AuthAuthenticated(user: user, accessToken: 'test-token'),
              ),
            ),
          ],
          child: const MaterialApp(
            home: ProfileSecurityScreen(),
          ),
        ),
      );

      await tester.pumpAndSettle();

      expect(find.text('Dawit Wolde'), findsWidgets);
      expect(find.text('DW'), findsOneWidget);
      expect(find.text('manager@coop.ag'), findsOneWidget);
      expect(find.text('Active Role: Farm Manager'), findsOneWidget);
      expect(find.text('Granted Permissions'.toUpperCase()), findsOneWidget);
      expect(find.text('3 Active'), findsOneWidget);
      expect(find.text('CAN_APPROVE_AUDIT'), findsOneWidget);
      expect(find.text('CAN_REQUEST_STOCK'), findsOneWidget);
    });

    testWidgets('MfaVerificationScreen displays terminal notice without pre-filling digits',
        (tester) async {
      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: MfaVerificationScreen(
              userIdentifier: 'agronomist@coop.ag',
              mfaTicket: 'sample-ticket-123',
              devOtpCode: '849201',
            ),
          ),
        ),
      );

      await tester.pumpAndSettle();

      // Check development terminal notice is visible
      expect(find.text('DEVELOPMENT DISPATCH ACTIVE'), findsOneWidget);
      expect(
        find.textContaining('printed in your CoreAdmin / Gateway terminal'),
        findsOneWidget,
      );

      // Verify that the text fields are empty for manual entry
      final textFields = find.byType(TextField);
      expect(textFields, findsNWidgets(6));
      for (final widget in tester.widgetList<TextField>(textFields)) {
        expect(widget.controller?.text.isEmpty ?? true, isTrue);
      }
    });
  });
}

class _FakeAuthNotifier extends StateNotifier<AuthState> implements AuthNotifier {
  _FakeAuthNotifier(super.state);

  @override
  Future<void> checkExistingSession() async {}

  @override
  Future<bool> login(String email, String password) async => true;

  @override
  Future<void> logout() async {
    state = const AuthInitial();
  }

  @override
  Future<bool> verifyMfa({required String mfaTicket, required String code}) async => true;
}
