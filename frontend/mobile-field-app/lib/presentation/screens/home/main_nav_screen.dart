import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import 'dashboard_screen.dart';
import '../parcel_mapping/parcel_mapping_screen.dart';
import '../field_inspection/field_inspection_screen.dart';
import '../profile/profile_security_screen.dart';

class MainNavScreen extends StatefulWidget {
  final int initialIndex;

  const MainNavScreen({super.key, this.initialIndex = 0});

  @override
  State<MainNavScreen> createState() => _MainNavScreenState();
}

class _MainNavScreenState extends State<MainNavScreen> {
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
  }

  void _onTabSelected(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      DashboardScreen(
        onSwitchToProfile: () => _onTabSelected(3),
        onSwitchToTasks: () => _onTabSelected(2),
        onSwitchToFarms: () => _onTabSelected(1),
      ),
      const ParcelMappingScreen(),
      const FieldInspectionScreen(),
      const ProfileSecurityScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.95),
          boxShadow: [
            BoxShadow(
              color: AppColors.primaryContainer.withValues(alpha: 0.06),
              blurRadius: 12,
              offset: const Offset(0, -2),
            ),
          ],
          border: const Border(
            top: BorderSide(color: AppColors.borderClean, width: 0.5),
          ),
        ),
        child: SafeArea(
          top: false,
          child: SizedBox(
            height: 60,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(
                  index: 0,
                  icon: Icons.dashboard_outlined,
                  activeIcon: Icons.dashboard,
                  label: 'Home',
                ),
                _buildNavItem(
                  index: 1,
                  icon: Icons.agriculture_outlined,
                  activeIcon: Icons.agriculture,
                  label: 'Farms',
                ),
                _buildNavItem(
                  index: 2,
                  icon: Icons.assignment_turned_in_outlined,
                  activeIcon: Icons.assignment_turned_in,
                  label: 'Tasks',
                ),
                _buildNavItem(
                  index: 3,
                  icon: Icons.account_circle_outlined,
                  activeIcon: Icons.account_circle,
                  label: 'Profile',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required int index,
    required IconData icon,
    required IconData activeIcon,
    required String label,
  }) {
    final isSelected = _currentIndex == index;
    final color = isSelected ? AppColors.primaryContainer : AppColors.onSurfaceVariant;

    return InkWell(
      onTap: () => _onTabSelected(index),
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 6.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isSelected ? activeIcon : icon,
              color: color,
              size: 22,
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
