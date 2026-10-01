import { apiFetch } from "./client";
import { BranchDto } from "./types";

export const branchesApi = {
  async listBranches(): Promise<BranchDto[]> {
    // Controller in CoreAdmin.API is Route("api/[controller]") => /api/Branch or via admin route
    try {
      return await apiFetch<BranchDto[]>("/Branch", { method: "GET" });
    } catch {
      // Fallback in case route is under /admin/branches
      return await apiFetch<BranchDto[]>("/admin/branches", { method: "GET" });
    }
  },

  async getBranchById(id: string): Promise<BranchDto> {
    try {
      return await apiFetch<BranchDto>(`/Branch/${id}`, { method: "GET" });
    } catch {
      return await apiFetch<BranchDto>(`/admin/branches/${id}`, { method: "GET" });
    }
  },

  async createBranch(branch: Partial<BranchDto>): Promise<BranchDto> {
    return apiFetch<BranchDto>("/Branch", {
      method: "POST",
      body: JSON.stringify(branch),
    });
  },
};
