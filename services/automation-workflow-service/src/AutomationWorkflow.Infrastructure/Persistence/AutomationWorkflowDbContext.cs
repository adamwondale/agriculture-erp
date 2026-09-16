using Microsoft.EntityFrameworkCore;
using AutomationWorkflow.Domain.Entities;

namespace AutomationWorkflow.Infrastructure.Persistence;

public class AutomationWorkflowDbContext : DbContext
{
    public AutomationWorkflowDbContext(DbContextOptions<AutomationWorkflowDbContext> options) : base(options)
    {
    }

    public DbSet<SlaRule> SlaRules => Set<SlaRule>();
    public DbSet<ScheduledEscalation> ScheduledEscalations => Set<ScheduledEscalation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AutomationWorkflowDbContext).Assembly);
    }
}
