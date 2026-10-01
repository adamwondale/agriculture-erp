import { apiFetch } from "./client";
import { RoleDto, PermissionDto } from "./types";

export interface ListRolesFilter {
  requiresMfa?: boolean;
  isSystemRole?: boolean;
}

export const rolesApi = {
  async listRoles(filter?: ListRolesFilter): Promise<RoleDto[]> {
    const params = new URLSearchParams();
    if (filter?.requiresMfa !== undefined) {
      params.set("requiresMfa", String(filter.requiresMfa));
    }
    if (filter?.isSystemRole !== undefined) {
      params.set("isSystemRole", String(filter.isSystemRole));
    }

    const qs = params.toString();
    const endpoint = `/admin/roles${qs ? `?${qs}` : ""}`;
    return apiFetch<RoleDto[]>(endpoint, { method: "GET" });
  },

  async getRoleById(id: string): Promise<RoleDto> {
    return apiFetch<RoleDto>(`/admin/roles/${id}`, { method: "GET" });
  },

  async listPermissions(): Promise<PermissionDto[]> {
    return apiFetch<PermissionDto[]>("/admin/permissions", { method: "GET" });
  },
};
