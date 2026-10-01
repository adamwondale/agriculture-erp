## 2025-02-26 - Hardcoded MFA Bypass in Development Environment
**Vulnerability:** In `AuthService.VerifyMfaAsync`, an explicit check allowed `"123456"` to bypass MFA verification whenever `IWebHostEnvironment.IsDevelopment()` was true.
**Learning:** Hardcoded dev credentials or bypass logic in authentication services pose significant security risks if development flags or configs leak to staging/production or if dev environments host sensitive mock data.
**Prevention:** Never allow hardcoded static values to pass authentication checks; dev test cases should generate and set explicit mock records or use dedicated mock providers instead of embedding magic constants in service logic.
