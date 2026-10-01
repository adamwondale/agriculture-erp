using Microsoft.EntityFrameworkCore;
using CoreAdmin.Domain.Entities;
using CoreAdmin.Domain.Enums;

namespace CoreAdmin.Infrastructure.Persistence;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(CoreAdminDbContext db, Func<string, string> passwordHasher)
    {
        // 1. Seed Roles (17 Distinct Specification Roles + FarmManager alias)
        if (!await db.Roles.AnyAsync())
        {
            var roles = new List<Role>
            {
                new()
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Code = "Agronomist",
                    Name = "Agronomist",
                    Description = "Field Agronomist, crop health, soil & extension specialist",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    Code = "FieldOfficer",
                    Name = "Field Officer",
                    Description = "Extension officer for farmer onboarding, registration & field verification",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    Code = "FarmManager",
                    Name = "Farm Manager",
                    Description = "Operations manager for field audits, harvesting and approvals",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                    Code = "SuperAdmin",
                    Name = "Super Administrator",
                    Description = "System-wide administrative governance and dynamic RBAC control",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                    Code = "ExecutiveLeadership",
                    Name = "CEO / Executive Leadership",
                    Description = "Executive leadership with consolidated group performance dashboards and high-level sign-offs",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                    Code = "OperationsDirector",
                    Name = "COO / Operations Director",
                    Description = "Chief Operations Officer overseeing agricultural logistics, production and regional hubs",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                    Code = "FarmingOperationsManager",
                    Name = "Farming Operations Manager",
                    Description = "Central manager for farming operations, production targets and field allocations",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                    Code = "ResearchAgronomyManager",
                    Name = "Research & Agronomy Manager",
                    Description = "Lead scientist managing trials, crop protocols and input prescriptions",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                    Code = "WarehouseManager",
                    Name = "Warehouse / Inventory Manager",
                    Description = "Inventory lead managing inputs, seeds, fertilizers and equipment stock",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1"),
                    Code = "FinanceStaff",
                    Name = "Finance & Accounting Staff",
                    Description = "Financial officers managing disbursements, farmer settlements, payroll and ledger entries",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2"),
                    Code = "HRStaff",
                    Name = "HR & Payroll Staff",
                    Description = "Human resources personnel managing employee records, contracts and field labor attendance",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3"),
                    Code = "PartnershipTeam",
                    Name = "Partnership & Brand Team",
                    Description = "Commercial partnership managers handling outgrower agreements and brand initiatives",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4"),
                    Code = "ITAdmin",
                    Name = "Technology & IT Team",
                    Description = "System maintenance, hardware diagnostics, integration gateways and telemetry sync monitoring",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5"),
                    Code = "InternalAuditor",
                    Name = "Internal Audit & Compliance",
                    Description = "Independent compliance auditors with read-only inspection, tamper-evident log review and export rights",
                    IsSystemRole = true,
                    RequiresMfa = true,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa6"),
                    Code = "ContractFarmer",
                    Name = "Contract Farmer / Outgrower",
                    Description = "Outgrower farmer checking input allotments, harvest quotas and SMS delivery receipts",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa7"),
                    Code = "CommercialPartner",
                    Name = "Commercial Partner / Cooperative",
                    Description = "Commercial partner or cooperative union leader with private portal to monitor contracted farms",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa8"),
                    Code = "Buyer",
                    Name = "Buyer / Commercial Offtaker",
                    Description = "Commercial buyer viewing marketplace crop listings, quality certifications and purchase orders",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                },
                new()
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa9"),
                    Code = "LogisticsDriver",
                    Name = "Logistics / Driver",
                    Description = "Transport and fleet drivers tracking pickup dispatches, waybills and delivery confirmations",
                    IsSystemRole = true,
                    RequiresMfa = false,
                    CreatedAt = DateTimeOffset.UtcNow
                }
            };

            await db.Roles.AddRangeAsync(roles);
            await db.SaveChangesAsync();
        }

        // 2. Seed Permissions (CRUD across all ERP Resources)
        if (!await db.Permissions.AnyAsync())
        {
            var resources = new[]
            {
                "Users", "Roles", "Farms", "Agronomy", "Land", "Farmers", "Crops",
                "Inventory", "Finance", "HR", "Partners", "Orders", "Logistics",
                "Audit", "Branch", "Sync"
            };

            var actions = new[] { "Read", "Write", "Update", "Delete" };

            var permissions = new List<Permission>();

            foreach (var res in resources)
            {
                foreach (var act in actions)
                {
                    permissions.Add(new Permission
                    {
                        Id = Guid.NewGuid(),
                        Code = $"CAN_{act.ToUpper()}_{res.ToUpper()}",
                        Name = $"{act} {res}",
                        Resource = res,
                        Action = act,
                        CreatedAt = DateTimeOffset.UtcNow
                    });
                }
            }

            // Specialized Business Action Permissions
            permissions.AddRange(new[]
            {
                new Permission { Id = Guid.NewGuid(), Code = "CAN_INSPECT_FIELDS", Name = "Field Inspection", Resource = "Agronomy", Action = "Inspect", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_SCOUT_CROPS", Name = "Crop Scouting", Resource = "Agronomy", Action = "Scout", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_MAP_PARCELS", Name = "Parcel Mapping", Resource = "Land", Action = "Map", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_REGISTER_FARMERS", Name = "Farmer Registration", Resource = "Farmers", Action = "Register", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_VIEW_FARMS", Name = "View Farms", Resource = "Farms", Action = "Read", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_VIEW_ALL_FARMS", Name = "View All Farms", Resource = "Farms", Action = "ReadAll", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_RECORD_YIELD", Name = "Record Harvest Yield", Resource = "Crops", Action = "Record", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_REQUEST_STOCK", Name = "Request Stock", Resource = "Inventory", Action = "Request", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_APPROVE_FINANCE", Name = "Approve Finance", Resource = "Finance", Action = "Approve", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_APPROVE_AUDIT", Name = "Approve Audits", Resource = "Audit", Action = "Approve", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_EXPORT_AUDIT", Name = "Export Audit Trails", Resource = "Audit", Action = "Export", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_MANAGE_BRANCH", Name = "Manage Branch", Resource = "Branch", Action = "Manage", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_RESOLVE_SYNC_CONFLICTS", Name = "Resolve Sync Conflicts", Resource = "Sync", Action = "Resolve", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_LOG_DISPATCH", Name = "Log Logistics Dispatch", Resource = "Logistics", Action = "Dispatch", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_MANAGE_USERS", Name = "Manage Users", Resource = "Users", Action = "Manage", CreatedAt = DateTimeOffset.UtcNow },
                new Permission { Id = Guid.NewGuid(), Code = "CAN_MANAGE_ROLES", Name = "Manage Roles & Permissions", Resource = "Roles", Action = "Manage", CreatedAt = DateTimeOffset.UtcNow }
            });

            await db.Permissions.AddRangeAsync(permissions);
            await db.SaveChangesAsync();
        }

        // 3. Seed Default Branch
        Branch? branch = await db.Branchs.FirstOrDefaultAsync();
        if (branch == null)
        {
            branch = new Branch
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                OrganizationId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Level = "HQ",
                Country = "Ethiopia",
                Code = "BR-OROMIA-01",
                Name = "Oromia Central Hub",
                Region = "Oromia",
                Zone = "East Shewa",
                Woreda = "Bishoftu",
                Kebele = "Kebele 01",
                Status = BranchStatus.Active,
                CreatedAt = DateTimeOffset.UtcNow
            };
            await db.Branchs.AddAsync(branch);
            await db.SaveChangesAsync();
        }

        // 4. Seed Users
        if (!await db.Users.AnyAsync())
        {
            var orgId = Guid.NewGuid();

            var agronomistUser = new User
            {
                Id = Guid.Parse("aaaaaaaa-1111-1111-1111-111111111111"),
                Email = "agronomist@coop.ag",
                Username = "agronomist",
                DisplayName = "Abebe Tesfaye",
                PasswordHash = passwordHasher("Agronomist123!"),
                Status = UserStatus.Active.ToString(),
                OrganizationId = orgId,
                Department = "Agronomy & Field Ops",
                Position = "Senior Agronomist",
                BranchId = branch.Id,
                MfaEnabled = true,
                CreatedAt = DateTimeOffset.UtcNow
            };

            var fieldOfficerUser = new User
            {
                Id = Guid.Parse("bbbbbbbb-2222-2222-2222-222222222222"),
                Email = "fieldofficer@coop.ag",
                Username = "fieldofficer",
                DisplayName = "Fatima Al-Hassan",
                PasswordHash = passwordHasher("FieldOfficer123!"),
                Status = UserStatus.Active.ToString(),
                OrganizationId = orgId,
                Department = "Field Extension Services",
                Position = "Extension Field Officer",
                BranchId = branch.Id,
                MfaEnabled = false,
                CreatedAt = DateTimeOffset.UtcNow
            };

            var managerUser = new User
            {
                Id = Guid.Parse("cccccccc-3333-3333-3333-333333333333"),
                Email = "manager@coop.ag",
                Username = "manager",
                DisplayName = "Dawit Wolde",
                PasswordHash = passwordHasher("Manager123!"),
                Status = UserStatus.Active.ToString(),
                OrganizationId = orgId,
                Department = "Operations & Compliance",
                Position = "Farm Operations Manager",
                BranchId = branch.Id,
                MfaEnabled = true,
                CreatedAt = DateTimeOffset.UtcNow
            };

            var adminUser = new User
            {
                Id = Guid.Parse("dddddddd-4444-4444-4444-444444444444"),
                Email = "admin@coop.ag",
                Username = "admin",
                DisplayName = "System Administrator",
                PasswordHash = passwordHasher("Admin123!"),
                Status = UserStatus.Active.ToString(),
                OrganizationId = orgId,
                Department = "Executive Management",
                Position = "Super Administrator",
                BranchId = branch.Id,
                MfaEnabled = true,
                CreatedAt = DateTimeOffset.UtcNow
            };

            await db.Users.AddRangeAsync(agronomistUser, fieldOfficerUser, managerUser, adminUser);
            await db.SaveChangesAsync();

            // 5. Link User Roles
            var rolesByCode = await db.Roles.ToDictionaryAsync(r => r.Code, r => r.Id);

            var userRoles = new List<UserRole>
            {
                new() { Id = Guid.NewGuid(), UserId = agronomistUser.Id, RoleId = rolesByCode["Agronomist"], ValidFrom = DateTimeOffset.UtcNow, IsActive = true, CreatedAt = DateTimeOffset.UtcNow },
                new() { Id = Guid.NewGuid(), UserId = fieldOfficerUser.Id, RoleId = rolesByCode["FieldOfficer"], ValidFrom = DateTimeOffset.UtcNow, IsActive = true, CreatedAt = DateTimeOffset.UtcNow },
                new() { Id = Guid.NewGuid(), UserId = managerUser.Id, RoleId = rolesByCode["FarmManager"], ValidFrom = DateTimeOffset.UtcNow, IsActive = true, CreatedAt = DateTimeOffset.UtcNow },
                new() { Id = Guid.NewGuid(), UserId = adminUser.Id, RoleId = rolesByCode["SuperAdmin"], ValidFrom = DateTimeOffset.UtcNow, IsActive = true, CreatedAt = DateTimeOffset.UtcNow }
            };

            await db.UserRoles.AddRangeAsync(userRoles);
            await db.SaveChangesAsync();
        }

        // 6. Link Role Permissions
        if (!await db.RolePermissions.AnyAsync())
        {
            var rolesByCode = await db.Roles.ToDictionaryAsync(r => r.Code, r => r.Id);
            var perms = await db.Permissions.ToListAsync();
            var rolePerms = new List<RolePermission>();

            foreach (var perm in perms)
            {
                // SuperAdmin receives every single permission
                if (rolesByCode.TryGetValue("SuperAdmin", out var superAdminId))
                {
                    rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = superAdminId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                }

                // Agronomist permissions
                if (perm.Resource is "Agronomy" or "Land" or "Crops" ||
                    perm.Code is "CAN_INSPECT_FIELDS" or "CAN_SCOUT_CROPS" or "CAN_MAP_PARCELS" or "CAN_RECORD_YIELD" or "CAN_VIEW_FARMS" or "CAN_READ_FARMS")
                {
                    if (rolesByCode.TryGetValue("Agronomist", out var agronomistId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = agronomistId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // Field Officer permissions
                if (perm.Resource is "Farmers" or "Land" ||
                    perm.Code is "CAN_REGISTER_FARMERS" or "CAN_MAP_PARCELS" or "CAN_INSPECT_FIELDS" or "CAN_VIEW_FARMS" or "CAN_READ_FARMS")
                {
                    if (rolesByCode.TryGetValue("FieldOfficer", out var fieldOfficerId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = fieldOfficerId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // Farm Manager / Operations Manager permissions
                if (perm.Resource is "Farms" or "Crops" or "Inventory" or "Audit" ||
                    perm.Code is "CAN_APPROVE_AUDIT" or "CAN_VIEW_ALL_FARMS" or "CAN_MANAGE_BRANCH" or "CAN_RESOLVE_SYNC_CONFLICTS" or "CAN_REQUEST_STOCK" or "CAN_VIEW_FARMS")
                {
                    if (rolesByCode.TryGetValue("FarmManager", out var farmManagerId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = farmManagerId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                    if (rolesByCode.TryGetValue("FarmingOperationsManager", out var farmingOperationsManagerId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = farmingOperationsManagerId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // Executive Leadership & Operations Director permissions
                if (perm.Action is "Read" || perm.Code is "CAN_APPROVE_FINANCE" or "CAN_APPROVE_AUDIT" or "CAN_EXPORT_AUDIT" or "CAN_VIEW_ALL_FARMS")
                {
                    if (rolesByCode.TryGetValue("ExecutiveLeadership", out var execId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = execId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                    if (rolesByCode.TryGetValue("OperationsDirector", out var opsDirectorId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = opsDirectorId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // Finance Staff permissions
                if (perm.Resource is "Finance" or "Audit" || perm.Code is "CAN_APPROVE_FINANCE")
                {
                    if (rolesByCode.TryGetValue("FinanceStaff", out var finId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = finId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // HR Staff permissions
                if (perm.Resource is "HR" or "Users")
                {
                    if (rolesByCode.TryGetValue("HRStaff", out var hrId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = hrId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // Warehouse Manager permissions
                if (perm.Resource is "Inventory" or "Logistics" || perm.Code is "CAN_REQUEST_STOCK")
                {
                    if (rolesByCode.TryGetValue("WarehouseManager", out var whId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = whId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }

                // Internal Auditor permissions (read-only across all resources + export audit)
                if (perm.Action is "Read" || perm.Code is "CAN_EXPORT_AUDIT" or "CAN_READ_AUDIT")
                {
                    if (rolesByCode.TryGetValue("InternalAuditor", out var auditorId))
                    {
                        rolePerms.Add(new RolePermission { Id = Guid.NewGuid(), RoleId = auditorId, PermissionId = perm.Id, CreatedAt = DateTimeOffset.UtcNow });
                    }
                }
            }

            await db.RolePermissions.AddRangeAsync(rolePerms);
            await db.SaveChangesAsync();
        }
    }
}
