export interface LoginRequest {
  email: string;
  password: string;
}

export interface BackendUserDto {
  id: string;
  email: string;
  username: string;
  displayName: string;
  status: string;
  department?: string;
  position?: string;
  branchId?: string;
  mfaEnabled: boolean;
  preferredLanguage?: string;
  createdAt: string;
  roles: string[];
}

export interface LoginResponse {
  mfaRequired: boolean;
  mfaTicket?: string;
  message?: string;
  devOtpCode?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: BackendUserDto;
  error?: string;
}

export interface VerifyMfaRequest {
  mfaTicket: string;
  code: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: BackendUserDto;
}

export interface CurrentUserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  department?: string;
  position?: string;
  branchId?: string;
  mfaEnabled: boolean;
  preferredLanguage?: string;
  roles: string[];
  effectivePermissions: string[];
}

export interface CreateUserRequest {
  email: string;
  username?: string;
  temporaryPassword: string;
  mfaRequired?: boolean;
  displayName?: string;
  department?: string;
  position?: string;
  branchId?: string;
  roleIds?: string[];
}

export interface UserRoleAssignment {
  id: string;
  roleId: string;
  code: string;
  name: string;
  description?: string;
  isSystemRole: boolean;
  branchScopeId?: string;
  validFrom?: string;
  validTo?: string;
}

export interface UserPermissionOverride {
  id: string;
  permissionCode: string;
  effect: "Allow" | "Deny";
  reason?: string;
  expiresAt?: string;
  branchScopeId?: string;
}

export interface UserDetailDto extends BackendUserDto {
  rolesDetailed: UserRoleAssignment[];
  overrides: UserPermissionOverride[];
  effectivePermissions: string[];
}

export interface RoleDto {
  id: string;
  code: string;
  name: string;
  description: string;
  isSystemRole: boolean;
  requiresMfa: boolean;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
  permissionsCount?: number;
  userCount?: number;
}

export interface PermissionDto {
  id: string;
  code: string;
  name: string;
  resource: string;
  action: string;
}

export interface BranchDto {
  id: string;
  organizationId: string;
  level: string;
  country: string;
  code: string;
  name: string;
  region: string;
  zone?: string;
  woreda?: string;
  kebele?: string;
  status: string | number;
  createdAt?: string;
}

export interface AssignRoleRequest {
  roleId: string;
  branchScopeId?: string;
  validTo?: string;
}

export interface SetPermissionOverrideRequest {
  permissionCode: string;
  effect: "Allow" | "Deny";
  reason?: string;
  expiresAt?: string;
  branchScopeId?: string;
}
