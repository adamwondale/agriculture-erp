using Microsoft.EntityFrameworkCore;
using MobileSyncGateway.Application.Interfaces;
using MobileSyncGateway.Domain.Common;
using MobileSyncGateway.Infrastructure.Persistence;

namespace MobileSyncGateway.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly MobileSyncGatewayDbContext _context;

    public Repository(MobileSyncGatewayDbContext context)
    {
        _context = context;
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<T>> ListAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Set<T>().ToListAsync(cancellationToken);
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await _context.Set<T>().AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(T entity, CancellationToken cancellationToken = default)
    {
        entity.IsDeleted = true;
        entity.UpdatedAt = DateTimeOffset.UtcNow;
        _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
