import 'dart:io';
import 'package:flutter/foundation.dart';

class ApiConfig {
  /// Port for API Gateway (default: 8080) or direct CoreAdmin API (5001).
  static const int gatewayPort = 8080;
  static const int coreAdminDirectPort = 5001;

  static int activePort = coreAdminDirectPort;

  static String get defaultBaseUrl {
    if (kIsWeb) {
      return 'http://localhost:$activePort';
    }
    if (Platform.isAndroid) {
      // 127.0.0.1 forwards over USB to host PC when reverse port forward is active (`adb reverse tcp:5001 tcp:5001`).
      return 'http://127.0.0.1:$activePort';
    }
    return 'http://localhost:$activePort';
  }

  static String baseUrl = defaultBaseUrl;

  static void useGateway() {
    activePort = gatewayPort;
    baseUrl = defaultBaseUrl;
  }

  static void useCoreAdminDirect() {
    activePort = coreAdminDirectPort;
    baseUrl = defaultBaseUrl;
  }

  static void setCustomBaseUrl(String url) {
    baseUrl = url;
  }

  // Endpoint paths
  static const String loginPath = '/api/auth/login';
  static const String verifyMfaPath = '/api/auth/mfa/verify';
  static const String refreshPath = '/api/auth/refresh';
  static const String mePath = '/api/auth/me';
}
