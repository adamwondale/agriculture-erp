FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/mobile-sync-gateway-service/src/MobileSyncGateway.Domain/MobileSyncGateway.Domain.csproj services/mobile-sync-gateway-service/src/MobileSyncGateway.Domain/
COPY services/mobile-sync-gateway-service/src/MobileSyncGateway.Application/MobileSyncGateway.Application.csproj services/mobile-sync-gateway-service/src/MobileSyncGateway.Application/
COPY services/mobile-sync-gateway-service/src/MobileSyncGateway.Infrastructure/MobileSyncGateway.Infrastructure.csproj services/mobile-sync-gateway-service/src/MobileSyncGateway.Infrastructure/
COPY services/mobile-sync-gateway-service/src/MobileSyncGateway.Contracts/MobileSyncGateway.Contracts.csproj services/mobile-sync-gateway-service/src/MobileSyncGateway.Contracts/
COPY services/mobile-sync-gateway-service/src/MobileSyncGateway.API/MobileSyncGateway.API.csproj services/mobile-sync-gateway-service/src/MobileSyncGateway.API/

RUN dotnet restore services/mobile-sync-gateway-service/src/MobileSyncGateway.API/MobileSyncGateway.API.csproj

COPY services/mobile-sync-gateway-service/ services/mobile-sync-gateway-service/
WORKDIR /app/services/mobile-sync-gateway-service/src/MobileSyncGateway.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MobileSyncGateway.API.dll"]
