import { apiFetch, setTokens, clearTokens } from "./client";
import {
  LoginRequest,
  LoginResponse,
  VerifyMfaRequest,
  AuthResponse,
  CurrentUserProfile,
} from "./types";
import { setStoredUser, AuthUser, ROLES, RoleId, DEMO_ACCOUNTS } from "@/lib/rbac";
import {
  decodeJwt,
  mapJwtRolesToRoleId,
  mapClaimsToAuthUser,
  createOfflineFallbackJwt,
  JwtClaims,
} from "@/lib/auth/jwt";

export function mapBackendRoleToFrontendRole(backendRoles: string[]): RoleId {
  return mapJwtRolesToRoleId(backendRoles);
}

export function syncAuthSession(auth: AuthResponse): { authUser: AuthUser; claims: JwtClaims | null } {
  setTokens(auth.accessToken, auth.refreshToken);

  const claims = decodeJwt(auth.accessToken);

  let authUser: AuthUser;
  if (claims) {
    authUser = mapClaimsToAuthUser(claims);
  } else {
    const role = mapBackendRoleToFrontendRole(auth.user.roles || []);
    authUser = {
      email: auth.user.email,
      name: auth.user.displayName || auth.user.username || auth.user.email.split("@")[0],
      role: role,
      department: auth.user.department || ROLES[role]?.title || "Operations",
      region: auth.user.branchId ? "Assigned Branch Node" : "Holding HQ",
      avatarInitials:
        auth.user.displayName?.slice(0, 2).toUpperCase() ||
        auth.user.email.slice(0, 2).toUpperCase(),
      loginTime: new Date().toISOString(),
    };
  }

  setStoredUser(authUser);
  return { authUser, claims };
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const res = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (!res.mfaRequired && res.accessToken && res.user) {
      syncAuthSession({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken || "",
        expiresIn: res.expiresIn || 3600,
        user: res.user,
      });
    }

    return res;
  },

  async verifyMfa(payload: VerifyMfaRequest): Promise<AuthResponse> {
    const res = await apiFetch<AuthResponse>("/auth/mfa/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    syncAuthSession(res);
    return res;
  },

  async switchRole(roleOrEmail: string): Promise<{ auth: AuthResponse; authUser: AuthUser; claims: JwtClaims | null }> {
    try {
      const res = await apiFetch<AuthResponse>("/auth/switch-role", {
        method: "POST",
        body: JSON.stringify({ roleOrEmail }),
      });

      const { authUser, claims } = syncAuthSession(res);
      return { auth: res, authUser, claims };
    } catch (err) {
      console.warn("Backend switch-role unreachable, using robust fallback session:", err);
      // Offline fallback: find matching demo account
      const matchedDemo =
        DEMO_ACCOUNTS.find((a) => a.role === roleOrEmail || a.email.toLowerCase() === roleOrEmail.toLowerCase()) ||
        DEMO_ACCOUNTS[0];

      const fallbackToken = createOfflineFallbackJwt(matchedDemo);
      const fallbackAuth: AuthResponse = {
        accessToken: fallbackToken,
        refreshToken: "MOCK_REFRESH_TOKEN",
        expiresIn: 3600,
        user: {
          id: "00000000-0000-0000-0000-000000000001",
          email: matchedDemo.email,
          username: matchedDemo.email.split("@")[0],
          displayName: matchedDemo.name,
          status: "Active",
          department: matchedDemo.department,
          position: ROLES[matchedDemo.role]?.title || "Lead",
          roles: [matchedDemo.role],
          mfaEnabled: false,
          createdAt: new Date().toISOString(),
        },
      };

      const { authUser, claims } = syncAuthSession(fallbackAuth);
      return { auth: fallbackAuth, authUser, claims };
    }
  },

  async getMe(): Promise<CurrentUserProfile> {
    return apiFetch<CurrentUserProfile>("/auth/me", {
      method: "GET",
    });
  },

  logout(): void {
    clearTokens();
  },
};

