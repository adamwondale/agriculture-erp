# Sentinel Security Journal

## 2025-05-18 - Generic Error Handling in API Middleware
**Vulnerability:** Unhandled exception middleware returning `ex.Message` directly in API response JSON, exposing internal implementation details and database error messages.
**Learning:** Returning raw exception messages to API clients creates an information disclosure risk where sensitive implementation details or SQL errors can be leaked.
**Prevention:** Always log full exception details internally with `ILogger` while returning a generic error message to API consumers.
