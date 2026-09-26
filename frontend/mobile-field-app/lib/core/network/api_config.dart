import 'dart:io';

class ApiConfig {
  /// Default base URL for Core Admin Service.
  /// When running on a physical Android device via USB/Wi-Fi with `adb reverse tcp:5000 tcp:5000`,
  /// localhost (127.0.0.1) connects directly to your PC's service.
  /// For Android emulator, 10.0.2.2 is used.
  static String get defaultBaseUrl {
    if (Platform.isAndroid) {
      // If running on emulator without adb reverse:
      // return 'http://10.0.2.2:5000';
      // For physical phone connected with `adb reverse tcp:5000 tcp:5000` or local dev:
      return 'http://127.0.0.1:5000';
    }
    return 'http://localhost:5000';
  }

  static String baseUrl = defaultBaseUrl;

  // Endpoint paths
  static const String loginPath = '/api/auth/login';
  static const String verifyMfaPath = '/api/auth/mfa/verify';
  static const String refreshPath = '/api/auth/refresh';
  static const String mePath = '/api/auth/me';
}
