using CoreAdmin.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace CoreAdmin.Infrastructure.ExternalServices;

public class ConsoleMfaCodeProvider(ILogger<ConsoleMfaCodeProvider> logger) : IMfaCodeProvider
{
    public Task SendMfaCodeAsync(string email, string code, TimeSpan expiry, CancellationToken ct = default)
    {
        var border = new string('=', 64);
        var banner = $"""

{border}
  [CORE-ADMIN DEV MFA NOTIFICATION]
  Target User: {email}
  OTP Code:    {code}
  Expires In:  {expiry.TotalMinutes:F0} minutes
  Action:      Enter this 6-digit code in the Mobile Field App
{border}
""";

        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.WriteLine(banner);
        Console.ResetColor();

        logger.LogInformation("Generated Dev MFA Code for {Email}: {Code} (expires in {Minutes}m)", 
            email, code, expiry.TotalMinutes);

        return Task.CompletedTask;
    }
}
