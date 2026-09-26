import 'package:dio/dio.dart';
import '../../core/network/api_config.dart';
import '../../core/network/dio_client.dart';
import '../models/auth_models.dart';
import '../services/token_storage_service.dart';

class AuthRepository {
  final DioClient _client;
  final TokenStorageService _storage;

  AuthRepository({DioClient? client, TokenStorageService? storage})
      : _client = client ?? DioClient(),
        _storage = storage ?? TokenStorageService();

  TokenStorageService get storage => _storage;

  Future<LoginResult> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _client.dio.post(
        ApiConfig.loginPath,
        data: {
          'email': email.trim(),
          'password': password,
        },
      );

      final data = response.data as Map<String, dynamic>;
      final bool mfaRequired = data['mfaRequired'] == true;

      if (mfaRequired) {
        return LoginResult(
          isSuccess: true,
          mfaRequired: true,
          mfaTicket: data['mfaTicket']?.toString(),
          devOtpCode: data['devOtpCode']?.toString(),
          message: data['message']?.toString(),
        );
      }

      final auth = AuthResponse.fromJson(data);
      await _storage.saveTokens(
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
      );
      await _storage.saveUser(auth.user);

      return LoginResult(
        isSuccess: true,
        mfaRequired: false,
        authResponse: auth,
      );
    } on DioException catch (e) {
      String message = 'Unable to connect to server. Please check connection.';
      if (e.response?.statusCode == 401) {
        final errData = e.response?.data;
        if (errData is Map && errData['error'] != null) {
          message = errData['error'].toString();
        } else {
          message = 'Invalid email or password.';
        }
      } else if (e.type == DioExceptionType.connectionTimeout ||
          e.type == DioExceptionType.receiveTimeout) {
        message = 'Connection timed out. Ensure backend is running.';
      }
      return LoginResult(
        isSuccess: false,
        errorMessage: message,
      );
    } catch (e) {
      return LoginResult(
        isSuccess: false,
        errorMessage: 'An unexpected error occurred: $e',
      );
    }
  }

  Future<AuthResponse?> verifyMfa({
    required String mfaTicket,
    required String code,
  }) async {
    try {
      final response = await _client.dio.post(
        ApiConfig.verifyMfaPath,
        data: {
          'mfaTicket': mfaTicket,
          'code': code.trim(),
        },
      );

      final data = response.data as Map<String, dynamic>;
      final auth = AuthResponse.fromJson(data);

      await _storage.saveTokens(
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
      );
      await _storage.saveUser(auth.user);

      return auth;
    } catch (_) {
      return null;
    }
  }

  Future<UserProfile?> getCurrentUserProfile() async {
    try {
      final response = await _client.dio.get(ApiConfig.mePath);
      final data = response.data as Map<String, dynamic>;
      return UserProfile.fromJson(data);
    } catch (_) {
      return null;
    }
  }

  Future<UserSummary?> getCachedUser() async {
    return await _storage.getCachedUser();
  }

  Future<bool> hasValidSession() async {
    final token = await _storage.getAccessToken();
    return token != null && token.isNotEmpty;
  }

  Future<void> logout() async {
    await _storage.clear();
  }
}
