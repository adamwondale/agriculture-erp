FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/integration-gateway-service/src/IntegrationGateway.Domain/IntegrationGateway.Domain.csproj services/integration-gateway-service/src/IntegrationGateway.Domain/
COPY services/integration-gateway-service/src/IntegrationGateway.Application/IntegrationGateway.Application.csproj services/integration-gateway-service/src/IntegrationGateway.Application/
COPY services/integration-gateway-service/src/IntegrationGateway.Infrastructure/IntegrationGateway.Infrastructure.csproj services/integration-gateway-service/src/IntegrationGateway.Infrastructure/
COPY services/integration-gateway-service/src/IntegrationGateway.Contracts/IntegrationGateway.Contracts.csproj services/integration-gateway-service/src/IntegrationGateway.Contracts/
COPY services/integration-gateway-service/src/IntegrationGateway.API/IntegrationGateway.API.csproj services/integration-gateway-service/src/IntegrationGateway.API/

RUN dotnet restore services/integration-gateway-service/src/IntegrationGateway.API/IntegrationGateway.API.csproj

COPY services/integration-gateway-service/ services/integration-gateway-service/
WORKDIR /app/services/integration-gateway-service/src/IntegrationGateway.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "IntegrationGateway.API.dll"]
