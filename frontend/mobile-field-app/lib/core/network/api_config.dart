import 'dart:io';
import 'package:flutter/foundation.dart';

class ApiConfig {
  /// Port for Nginx Reverse Proxy (80), API Gateway (8080), or direct CoreAdmin API (5001).
  static const int nginxPort = 80;
  static const int gatewayPort = 8080;
  static const int coreAdminDirectPort = 5001;

  static int activePort = nginxPort;

  static String get defaultBaseUrl {
    if (kIsWeb) {
      return activePort == 80 ? 'http://localhost' : 'http://localhost:$activePort';
    }
    if (Platform.isAndroid) {
      // Android cannot bind ports < 1024 without root. 
      // If Nginx (port 80) is used, phone calls 127.0.0.1:8080 via `adb reverse tcp:8080 tcp:80`
      final port = (activePort == 80) ? 8080 : activePort;
      return 'http://127.0.0.1:$port';
    }
    return activePort == 80 ? 'http://localhost' : 'http://localhost:$activePort';
  }

  static String baseUrl = defaultBaseUrl;

  static void useNginx() {
    activePort = nginxPort;
    baseUrl = defaultBaseUrl;
  }

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
