import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/auth/user_role.dart';
import 'auth_provider.dart';

/// Provides the list of all roles assigned to the current authenticated user
final userRolesProvider = Provider<List<AgriRole>>((ref) {
  final authState = ref.watch(authNotifierProvider);

  if (authState is AuthAuthenticated) {
    final rawRoles = authState.user.roles;
    if (rawRoles.isNotEmpty) {
      final parsed = rawRoles.map((r) => AgriRole.fromCode(r)).toSet().toList();
      return parsed;
    }
  }

  // Fallback default for unauthenticated or unassigned state
  return const [AgriRole.fieldAgronomist];
});

/// State notifier to manage the currently active operational role context
class ActiveRoleNotifier extends StateNotifier<AgriRole> {
  ActiveRoleNotifier(super.initialRole);

  void switchRole(AgriRole newRole) {
    if (state != newRole) {
      state = newRole;
    }
  }

  void resetToPrimary(List<AgriRole> availableRoles) {
    if (availableRoles.isNotEmpty) {
      state = availableRoles.first;
    } else {
      state = AgriRole.fieldAgronomist;
    }
  }
}

/// Provider for the active role currently driving the UI dashboard & navigation
final activeRoleProvider = StateNotifierProvider<ActiveRoleNotifier, AgriRole>((ref) {
  final availableRoles = ref.watch(userRolesProvider);
  final primaryRole = availableRoles.isNotEmpty ? availableRoles.first : AgriRole.fieldAgronomist;

  return ActiveRoleNotifier(primaryRole);
});

/// Provider returning the navigation tabs configuration for the active role
final activeRoleNavTabsProvider = Provider<List<RoleNavTab>>((ref) {
  final activeRole = ref.watch(activeRoleProvider);
  return activeRole.navTabs;
});

/// Convenience provider to verify if the authenticated user has a specific permission
final hasPermissionProvider = Provider.family<bool, String>((ref, requiredPermission) {
  final authState = ref.watch(authNotifierProvider);
  if (authState is! AuthAuthenticated) return false;

  final userPerms = authState.user.permissions;
  final userRoles = authState.user.roles;

  // Super admins or executives typically bypass granular checks
  if (userRoles.any((r) => r.toUpperCase() == 'SUPER_ADMIN' || r.toUpperCase() == 'EXECUTIVE')) {
    return true;
  }

  return userPerms.contains(requiredPermission) || userPerms.contains('*');
});
