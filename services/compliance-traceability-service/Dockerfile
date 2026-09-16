FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/compliance-traceability-service/src/ComplianceTraceability.Domain/ComplianceTraceability.Domain.csproj services/compliance-traceability-service/src/ComplianceTraceability.Domain/
COPY services/compliance-traceability-service/src/ComplianceTraceability.Application/ComplianceTraceability.Application.csproj services/compliance-traceability-service/src/ComplianceTraceability.Application/
COPY services/compliance-traceability-service/src/ComplianceTraceability.Infrastructure/ComplianceTraceability.Infrastructure.csproj services/compliance-traceability-service/src/ComplianceTraceability.Infrastructure/
COPY services/compliance-traceability-service/src/ComplianceTraceability.Contracts/ComplianceTraceability.Contracts.csproj services/compliance-traceability-service/src/ComplianceTraceability.Contracts/
COPY services/compliance-traceability-service/src/ComplianceTraceability.API/ComplianceTraceability.API.csproj services/compliance-traceability-service/src/ComplianceTraceability.API/

RUN dotnet restore services/compliance-traceability-service/src/ComplianceTraceability.API/ComplianceTraceability.API.csproj

COPY services/compliance-traceability-service/ services/compliance-traceability-service/
WORKDIR /app/services/compliance-traceability-service/src/ComplianceTraceability.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "ComplianceTraceability.API.dll"]
