import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_field_app/core/auth/user_role.dart';
import 'package:mobile_field_app/presentation/providers/role_provider.dart';

void main() {
  group('AgriRole Parsing & Tab Specification Tests', () {
    test('AgriRole.fromCode parses all enterprise roles correctly', () {
      expect(AgriRole.fromCode('FIELD_AGRONOMIST'), AgriRole.fieldAgronomist);
      expect(AgriRole.fromCode('agronomist'), AgriRole.fieldAgronomist);
      expect(AgriRole.fromCode('FARM_OPS_MANAGER'), AgriRole.farmOpsManager);
      expect(AgriRole.fromCode('manager'), AgriRole.farmOpsManager);
      expect(AgriRole.fromCode('PARTNER_SUPERVISOR'), AgriRole.partnerSupervisor);
      expect(AgriRole.fromCode('coop_supervisor'), AgriRole.partnerSupervisor);
      expect(AgriRole.fromCode('WAREHOUSE_OFFICER'), AgriRole.warehouseOfficer);
      expect(AgriRole.fromCode('silo_qc'), AgriRole.warehouseOfficer);
      expect(AgriRole.fromCode('LOGISTICS_DRIVER'), AgriRole.logisticsDriver);
      expect(AgriRole.fromCode('driver'), AgriRole.logisticsDriver);
      expect(AgriRole.fromCode('CONTRACT_FARMER'), AgriRole.contractFarmer);
      expect(AgriRole.fromCode('farmer'), AgriRole.contractFarmer);
      expect(AgriRole.fromCode('EXECUTIVE'), AgriRole.executive);
      expect(AgriRole.fromCode('SUPER_ADMIN'), AgriRole.executive);
      expect(AgriRole.fromCode('CEO'), AgriRole.executive);
    });

    test('AgriRole.fromCode safely defaults unknown and null roles', () {
      expect(AgriRole.fromCode(null), AgriRole.fieldAgronomist);
      expect(AgriRole.fromCode(''), AgriRole.fieldAgronomist);
      expect(AgriRole.fromCode('UNKNOWN_CUSTOM_ROLE'), AgriRole.fieldAgronomist);
    });

    test('Every AgriRole defines complete navigation tabs', () {
      for (final role in AgriRole.values) {
        final tabs = role.navTabs;
        expect(tabs.isNotEmpty, isTrue, reason: '${role.code} must have at least one tab');
        expect(tabs.last.label, 'Profile', reason: '${role.code} should always have Profile tab');
        for (final tab in tabs) {
          expect(tab.label.isNotEmpty, isTrue);
          expect(tab.icon, isNotNull);
          expect(tab.activeIcon, isNotNull);
        }
      }
    });

    test('ActiveRoleNotifier dynamically updates state', () {
      final container = ProviderContainer();
      addTearDown(container.dispose);

      expect(container.read(activeRoleProvider), AgriRole.fieldAgronomist);

      container.read(activeRoleProvider.notifier).switchRole(AgriRole.warehouseOfficer);
      expect(container.read(activeRoleProvider), AgriRole.warehouseOfficer);

      final tabs = container.read(activeRoleNavTabsProvider);
      expect(tabs.first.label, 'Intake');
      expect(tabs.any((t) => t.label == 'Scales'), isTrue);
      expect(tabs.any((t) => t.label == 'QC Lab'), isTrue);
    });
  });
}
