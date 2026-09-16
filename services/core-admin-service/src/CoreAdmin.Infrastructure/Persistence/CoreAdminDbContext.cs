using Microsoft.EntityFrameworkCore;
using CoreAdmin.Domain.Entities;

namespace CoreAdmin.Infrastructure.Persistence;

public class CoreAdminDbContext : DbContext
{
    public CoreAdminDbContext(DbContextOptions<CoreAdminDbContext> options) : base(options)
    {
    }

    public DbSet<Branch> Branchs => Set<Branch>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<AuditLogEntry> AuditLogEntrys => Set<AuditLogEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CoreAdminDbContext).Assembly);
    }
}
