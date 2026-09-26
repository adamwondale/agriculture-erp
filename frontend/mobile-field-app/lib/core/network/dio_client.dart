import 'package:dio/dio.dart';
import '../../data/services/token_storage_service.dart';
import 'api_config.dart';
import 'auth_interceptor.dart';

class DioClient {
  late final Dio dio;
  final TokenStorageService tokenStorage;

  DioClient({
    String? baseUrl,
    TokenStorageService? storage,
  }) : tokenStorage = storage ?? TokenStorageService() {
    dio = Dio(BaseOptions(
      baseUrl: baseUrl ?? ApiConfig.baseUrl,
      connectTimeout: const Duration(seconds: 12),
      receiveTimeout: const Duration(seconds: 12),
      headers: {'Content-Type': 'application/json'},
    ));

    dio.interceptors.add(AuthInterceptor(tokenStorage, dio));
  }
}
