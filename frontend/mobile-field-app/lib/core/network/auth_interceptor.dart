import 'package:dio/dio.dart';
import '../../data/services/token_storage_service.dart';
import 'api_config.dart';

class AuthInterceptor extends QueuedInterceptor {
  final TokenStorageService _storage;
  final Dio _dio;

  AuthInterceptor(this._storage, this._dio);

  bool _isAuthPath(String path) {
    return path.contains(ApiConfig.loginPath) ||
        path.contains(ApiConfig.verifyMfaPath) ||
        path.contains(ApiConfig.refreshPath);
  }

  @override
  Future<void> onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    if (!_isAuthPath(options.path)) {
      final token = await _storage.getAccessToken();
      if (token != null && token.isNotEmpty) {
        options.headers['Authorization'] = 'Bearer $token';
      }
    }
    super.onRequest(options, handler);
  }

  @override
  Future<void> onError(
      DioException err, ErrorInterceptorHandler handler) async {
    // If 401 Unauthorized on non-auth path, attempt token refresh
    if (err.response?.statusCode == 401 && !_isAuthPath(err.requestOptions.path)) {
      final refreshToken = await _storage.getRefreshToken();
      if (refreshToken != null && refreshToken.isNotEmpty) {
        try {
          // Use isolated Dio to avoid interceptor loop
          final refreshDio = Dio(BaseOptions(
            baseUrl: ApiConfig.baseUrl,
            headers: {'Content-Type': 'application/json'},
          ));

          final refreshResponse = await refreshDio.post(
            ApiConfig.refreshPath,
            data: {'refreshToken': refreshToken},
          );

          if (refreshResponse.statusCode == 200 &&
              refreshResponse.data != null) {
            final data = refreshResponse.data as Map<String, dynamic>;
            final newAccess = data['accessToken']?.toString() ?? '';
            final newRefresh = data['refreshToken']?.toString() ?? '';

            if (newAccess.isNotEmpty) {
              await _storage.saveTokens(
                accessToken: newAccess,
                refreshToken: newRefresh,
              );

              // Retry original request with new access token
              final opts = err.requestOptions;
              opts.headers['Authorization'] = 'Bearer $newAccess';
              final response = await _dio.fetch(opts);
              return handler.resolve(response);
            }
          }
        } catch (_) {
          // Refresh failed, session is invalid
          await _storage.clear();
        }
      }
    }
    super.onError(err, handler);
  }
}
