class BranchSummary {
  final String id;
  final String code;
  final String name;
  final String? region;
  final String? woreda;

  BranchSummary({
    required this.id,
    required this.code,
    required this.name,
    this.region,
    this.woreda,
  });

  factory BranchSummary.fromJson(Map<String, dynamic> json) {
    return BranchSummary(
      id: json['id']?.toString() ?? '',
      code: json['code']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      region: json['region']?.toString(),
      woreda: json['woreda']?.toString(),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'code': code,
        'name': name,
        'region': region,
        'woreda': woreda,
      };
}

class UserSummary {
  final String id;
  final String email;
  final String username;
  final String displayName;
  final String status;
  final String department;
  final String position;
  final String? branchId;
  final List<String> roles;
  final List<String> permissions;

  UserSummary({
    required this.id,
    required this.email,
    required this.username,
    required this.displayName,
    required this.status,
    required this.department,
    required this.position,
    this.branchId,
    required this.roles,
    required this.permissions,
  });

  factory UserSummary.fromJson(Map<String, dynamic> json) {
    return UserSummary(
      id: json['id']?.toString() ?? '',
      email: json['email']?.toString() ?? '',
      username: json['username']?.toString() ?? '',
      displayName: json['displayName']?.toString() ?? json['username']?.toString() ?? '',
      status: json['status']?.toString() ?? '',
      department: json['department']?.toString() ?? '',
      position: json['position']?.toString() ?? '',
      branchId: json['branchId']?.toString(),
      roles: (json['roles'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      permissions:
          (json['permissions'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'email': email,
        'username': username,
        'displayName': displayName,
        'status': status,
        'department': department,
        'position': position,
        'branchId': branchId,
        'roles': roles,
        'permissions': permissions,
      };
}

class UserProfile {
  final String id;
  final String email;
  final String username;
  final String displayName;
  final String status;
  final String department;
  final String position;
  final String preferredLanguage;
  final bool mfaEnabled;
  final BranchSummary? branch;
  final List<String> roles;
  final List<String> permissions;

  UserProfile({
    required this.id,
    required this.email,
    required this.username,
    required this.displayName,
    required this.status,
    required this.department,
    required this.position,
    required this.preferredLanguage,
    required this.mfaEnabled,
    this.branch,
    required this.roles,
    required this.permissions,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['id']?.toString() ?? '',
      email: json['email']?.toString() ?? '',
      username: json['username']?.toString() ?? '',
      displayName: json['displayName']?.toString() ?? json['username']?.toString() ?? '',
      status: json['status']?.toString() ?? '',
      department: json['department']?.toString() ?? '',
      position: json['position']?.toString() ?? '',
      preferredLanguage: json['preferredLanguage']?.toString() ?? 'en',
      mfaEnabled: json['mfaEnabled'] == true,
      branch: json['branch'] != null
          ? BranchSummary.fromJson(json['branch'] as Map<String, dynamic>)
          : null,
      roles: (json['roles'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
      permissions:
          (json['permissions'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }
}

class AuthResponse {
  final String accessToken;
  final String refreshToken;
  final int expiresIn;
  final UserSummary user;

  AuthResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.expiresIn,
    required this.user,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      accessToken: json['accessToken']?.toString() ?? '',
      refreshToken: json['refreshToken']?.toString() ?? '',
      expiresIn: (json['expiresIn'] as num?)?.toInt() ?? 900,
      user: UserSummary.fromJson(json['user'] as Map<String, dynamic>),
    );
  }
}

class LoginResult {
  final bool isSuccess;
  final bool mfaRequired;
  final String? mfaTicket;
  final String? devOtpCode;
  final String? message;
  final String? errorMessage;
  final AuthResponse? authResponse;

  LoginResult({
    required this.isSuccess,
    this.mfaRequired = false,
    this.mfaTicket,
    this.devOtpCode,
    this.message,
    this.errorMessage,
    this.authResponse,
  });
}
