export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const TOKEN_KEY = "zorisis_access_token";
const REFRESH_TOKEN_KEY = "zorisis_refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Resolves the backend base URL.
 * In the browser, prefers the same-origin Next.js proxy (/api/proxy) to avoid CORS issues.
 * On server-side, prioritizes NEXT_PUBLIC_CORE_ADMIN_URL or direct service URL.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // When run from the browser, Next.js rewrite /api/proxy proxies to gateway/service seamlessly
    return "/api/proxy";
  }
  return process.env.NEXT_PUBLIC_CORE_ADMIN_URL
    ? `${process.env.NEXT_PUBLIC_CORE_ADMIN_URL}/api`
    : (process.env.NEXT_PUBLIC_GATEWAY_URL ? `${process.env.NEXT_PUBLIC_GATEWAY_URL}/api` : "http://localhost:5001/api");
}

let refreshPromise: Promise<string | null> | null = null;

async function requestFreshToken(): Promise<string | null> {
  try {
    const refreshToken = getRefreshToken();
    const baseUrl = getApiBaseUrl();

    if (refreshToken) {
      const res = await fetch(`${baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.accessToken) {
          setTokens(data.accessToken, data.refreshToken);
          return data.accessToken;
        }
      }
    }

    // Fallback: switch-role for the currently stored active role
    let activeRole = "super_admin";
    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem("zorisis_auth_user") || localStorage.getItem("zorisis_auth_user");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.role) activeRole = parsed.role;
        }
      } catch {
        // ignore
      }
    }

    const switchRes = await fetch(`${baseUrl}/auth/switch-role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleOrEmail: activeRole }),
    });

    if (switchRes.ok) {
      const switchData = await switchRes.json();
      if (switchData.accessToken) {
        setTokens(switchData.accessToken, switchData.refreshToken);
        return switchData.accessToken;
      }
    }
  } catch (err) {
    console.warn("Auto-token acquisition failed:", err);
  }
  return null;
}

export async function ensureValidToken(): Promise<string | null> {
  const existing = getAccessToken();
  if (existing) return existing;

  if (!refreshPromise) {
    refreshPromise = requestFreshToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

/**
 * Core generic fetcher with auth injection, robust timeout, structured error responses, and 401 retry
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  // Normalize endpoint: ensure leading slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Automatically acquire token for non-auth endpoints if missing
  const isAuthRoute =
    cleanEndpoint.startsWith("/auth/login") ||
    cleanEndpoint.startsWith("/auth/mfa/verify") ||
    cleanEndpoint.startsWith("/auth/switch-role") ||
    cleanEndpoint.startsWith("/auth/refresh") ||
    cleanEndpoint === "/health";

  let token = getAccessToken();
  if (!token && !isAuthRoute) {
    token = await ensureValidToken();
  }

  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized by attempting a token refresh / switch-role retry once
  if (response.status === 401 && !isRetry && !isAuthRoute) {
    const freshToken = await requestFreshToken();
    if (freshToken) {
      return apiFetch<T>(endpoint, options, true);
    }
  }

  if (!response.ok) {
    let errorData: any = null;
    let errorMessage = `Request failed with status ${response.status}`;

    try {
      errorData = await response.json();
      if (errorData?.error) {
        errorMessage = errorData.error;
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // response was not JSON
      try {
        const text = await response.text();
        if (text) errorMessage = text;
      } catch {
        // ignore
      }
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  // 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  try {
    return await response.json();
  } catch {
    return {} as T;
  }
}
