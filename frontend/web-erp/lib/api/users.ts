import { apiFetch } from "./client";
import {
  BackendUserDto,
  UserDetailDto,
  CreateUserRequest,
  AssignRoleRequest,
  SetPermissionOverrideRequest,
  UserRoleAssignment,
} from "./types";

export interface ListUsersFilter {
  status?: string;
  branchId?: string;
  role?: string;
}

export const usersApi = {
  async listUsers(filter?: ListUsersFilter): Promise<BackendUserDto[]> {
    const params = new URLSearchParams();
    if (filter?.status && filter.status !== "All") params.set("status", filter.status);
    if (filter?.branchId) params.set("branchId", filter.branchId);
    if (filter?.role) params.set("role", filter.role);

    const qs = params.toString();
    const endpoint = `/admin/users${qs ? `?${qs}` : ""}`;
    return apiFetch<BackendUserDto[]>(endpoint, { method: "GET" });
  },

  async getUserById(id: string): Promise<UserDetailDto> {
    return apiFetch<UserDetailDto>(`/admin/users/${id}`, { method: "GET" });
  },

  async createUser(data: CreateUserRequest): Promise<BackendUserDto> {
    return apiFetch<BackendUserDto>("/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async activateUser(id: string): Promise<{ id: string; status: string }> {
    return apiFetch<{ id: string; status: string }>(`/admin/users/${id}/activate`, {
      method: "PATCH",
    });
  },

  async deactivateUser(id: string): Promise<{ id: string; status: string; deactivatedAt?: string }> {
    return apiFetch<{ id: string; status: string; deactivatedAt?: string }>(
      `/admin/users/${id}/deactivate`,
      { method: "PATCH" }
    );
  },

  async getUserRoles(id: string): Promise<UserRoleAssignment[]> {
    return apiFetch<UserRoleAssignment[]>(`/admin/users/${id}/roles`, {
      method: "GET",
    });
  },

  async assignRole(id: string, req: AssignRoleRequest): Promise<{ message: string; roleCode: string }> {
    return apiFetch<{ message: string; roleCode: string }>(`/admin/users/${id}/roles`, {
      method: "POST",
      body: JSON.stringify(req),
    });
  },

  async revokeRole(id: string, roleId: string): Promise<void> {
    return apiFetch<void>(`/admin/users/${id}/roles/${roleId}`, {
      method: "DELETE",
    });
  },

  async getUserPermissions(id: string): Promise<{ permissions: string[]; overrides: any[] }> {
    return apiFetch<{ permissions: string[]; overrides: any[] }>(`/admin/users/${id}/permissions`, {
      method: "GET",
    });
  },

  async setPermissionOverride(
    id: string,
    req: SetPermissionOverrideRequest
  ): Promise<any> {
    return apiFetch<any>(`/admin/users/${id}/permission-overrides`, {
      method: "POST",
      body: JSON.stringify(req),
    });
  },

  async removePermissionOverride(id: string, overrideId: string): Promise<void> {
    return apiFetch<void>(`/admin/users/${id}/permission-overrides/${overrideId}`, {
      method: "DELETE",
    });
  },
};
