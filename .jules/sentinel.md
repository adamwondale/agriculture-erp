## 2025-05-18 - Eliminate Hardcoded Default JWT Secret Keys
**Vulnerability:** Weak, publicly accessible hardcoded fallback JWT signing keys in `JwtExtensions.cs` and `AuthService.cs` allowed potential token forgery when `Jwt:Key` configuration was omitted.
**Learning:** Microservices often use fallback strings in configuration helpers for developer convenience, but in open source / shared repositories, default fallback secrets compromise authentication across environments if `Jwt:Key` is missing or unconfigured.
**Prevention:** Always fail securely by throwing an `InvalidOperationException` during service startup/token generation when mandatory security keys like `Jwt:Key` are unconfigured.
