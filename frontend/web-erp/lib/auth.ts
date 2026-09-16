export interface UserSession {
  id: string;
  email: string;
  role: string;
  tenantId: string;
}

export function getCurrentUser(): UserSession | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user_session');
  return user ? JSON.parse(user) : null;
}
