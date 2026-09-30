## 2025-05-18 - Prevent Exception Detail Leakage in API Middleware
**Vulnerability:** Unhandled exceptions in ASP.NET Core controllers were returning raw `ex.Message` in HTTP 500 error responses, exposing potential database credentials, stack traces, and internal service details.
**Learning:** Returning exception details in HTTP error responses is a common information disclosure risk across microservices. Exception handlers must log detailed error context internally while returning generic error messages to clients.
**Prevention:** Ensure all HTTP exception handling middleware return static or generic user-facing error messages (e.g. `"An internal server error occurred."`) rather than forwarding `ex.Message`.
