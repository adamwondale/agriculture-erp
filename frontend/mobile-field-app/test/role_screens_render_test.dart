import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_field_app/core/auth/user_role.dart';
import 'package:mobile_field_app/presentation/providers/role_provider.dart';
import 'package:mobile_field_app/presentation/screens/home/main_nav_screen.dart';

void main() {
  group('Role Screens Rendering & Navigation Tests', () {
    for (final role in AgriRole.values) {
      testWidgets('MainNavScreen renders all navigation tabs for ${role.code}', (WidgetTester tester) async {
        await tester.pumpWidget(
          ProviderScope(
            overrides: [
              activeRoleProvider.overrideWith((ref) => ActiveRoleNotifier(role)),
            ],
            child: const MaterialApp(
              home: MainNavScreen(),
            ),
          ),
        );

        await tester.pumpAndSettle();

        // Verify all defined tabs for this role are visible in the bottom bar
        for (final tab in role.navTabs) {
          expect(find.text(tab.label), findsWidgets, reason: 'Tab ${tab.label} should be present for ${role.code}');
        }

        // Verify switching to the Profile tab works
        final profileTab = find.text('Profile');
        expect(profileTab, findsWidgets);
        await tester.tap(profileTab.last);
        await tester.pumpAndSettle();

        // Verify Profile screen rendered
        expect(find.text('Profile & Security'), findsOneWidget);
      });
    }
  });
}
