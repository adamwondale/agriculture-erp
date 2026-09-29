namespace CoreAdmin.Application.Interfaces;

public interface IMfaCodeProvider
{
    Task SendMfaCodeAsync(string email, string code, TimeSpan expiry, CancellationToken ct = default);
}
