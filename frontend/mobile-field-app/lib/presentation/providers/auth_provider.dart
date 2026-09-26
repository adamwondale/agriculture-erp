import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/auth_models.dart';
import '../../data/repositories/auth_repository.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository();
});

sealed class AuthState {
  const AuthState();
}

class AuthInitial extends AuthState {
  const AuthInitial();
}

class AuthLoading extends AuthState {
  const AuthLoading();
}

class AuthMfaRequired extends AuthState {
  final String mfaTicket;
  final String email;
  final String? devOtpCode;
  final String? message;

  const AuthMfaRequired({
    required this.mfaTicket,
    required this.email,
    this.devOtpCode,
    this.message,
  });
}

class AuthAuthenticated extends AuthState {
  final UserSummary user;
  final String accessToken;

  const AuthAuthenticated({
    required this.user,
    required this.accessToken,
  });
}

class AuthError extends AuthState {
  final String message;
  const AuthError(this.message);
}

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _repository;

  AuthNotifier(this._repository) : super(const AuthInitial());

  Future<void> checkExistingSession() async {
    final hasSession = await _repository.hasValidSession();
    if (!hasSession) {
      state = const AuthInitial();
      return;
    }

    final cachedUser = await _repository.getCachedUser();
    final token = await _repository.storage.getAccessToken();

    if (cachedUser != null && token != null) {
      state = AuthAuthenticated(user: cachedUser, accessToken: token);
    } else {
      state = const AuthInitial();
    }
  }

  Future<bool> login(String email, String password) async {
    state = const AuthLoading();
    final result = await _repository.login(email: email, password: password);

    if (!result.isSuccess) {
      state = AuthError(result.errorMessage ?? 'Authentication failed');
      return false;
    }

    if (result.mfaRequired && result.mfaTicket != null) {
      state = AuthMfaRequired(
        mfaTicket: result.mfaTicket!,
        email: email,
        devOtpCode: result.devOtpCode,
        message: result.message,
      );
      return true;
    }

    if (result.authResponse != null) {
      state = AuthAuthenticated(
        user: result.authResponse!.user,
        accessToken: result.authResponse!.accessToken,
      );
      return true;
    }

    state = const AuthError('Unexpected response from server');
    return false;
  }

  Future<bool> verifyMfa({
    required String mfaTicket,
    required String code,
  }) async {
    state = const AuthLoading();
    final auth = await _repository.verifyMfa(mfaTicket: mfaTicket, code: code);

    if (auth != null) {
      state = AuthAuthenticated(
        user: auth.user,
        accessToken: auth.accessToken,
      );
      return true;
    } else {
      state = const AuthError('Invalid or expired MFA code. Please try again.');
      return false;
    }
  }

  Future<void> logout() async {
    await _repository.logout();
    state = const AuthInitial();
  }
}

final authNotifierProvider =
    StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final repo = ref.watch(authRepositoryProvider);
  return AuthNotifier(repo);
});
