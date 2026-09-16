import 'package:dio/dio.dart';

class DioClient {
  late final Dio dio;

  DioClient({String baseUrl = 'http://10.0.2.2:8080'}) {
    dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {'Content-Type': 'application/json'},
    ));
  }
}
