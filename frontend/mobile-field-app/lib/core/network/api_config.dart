import 'dart:io';

class ApiConfig {
  /// Default base URL for Core Admin Service.
  /// When running on a physical Android device via USB with `adb reverse tcp:5001 tcp:5001`,
  /// localhost (127.0.0.1:5001) connects directly to your PC's service.
  /// For Android emulator, 10.0.2.2:5001 is used.
  /// Can be overridden at build/runtime via `--dart-define=API_BASE_URL=http://...`
  static String get defaultBaseUrl {
    const fromEnv = String.fromEnvironment('API_BASE_URL');
    if (fromEnv.isNotEmpty) return fromEnv;

    if (Platform.isAndroid) {
      return 'http://127.0.0.1:5001';
    }
    return 'http://localhost:5001';
  }

  static String baseUrl = defaultBaseUrl;

  // Endpoint paths
  static const String loginPath = '/api/auth/login';
  static const String verifyMfaPath = '/api/auth/mfa/verify';
  static const String refreshPath = '/api/auth/refresh';
  static const String mePath = '/api/auth/me';
}
