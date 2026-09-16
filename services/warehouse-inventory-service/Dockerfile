FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/warehouse-inventory-service/src/WarehouseInventory.Domain/WarehouseInventory.Domain.csproj services/warehouse-inventory-service/src/WarehouseInventory.Domain/
COPY services/warehouse-inventory-service/src/WarehouseInventory.Application/WarehouseInventory.Application.csproj services/warehouse-inventory-service/src/WarehouseInventory.Application/
COPY services/warehouse-inventory-service/src/WarehouseInventory.Infrastructure/WarehouseInventory.Infrastructure.csproj services/warehouse-inventory-service/src/WarehouseInventory.Infrastructure/
COPY services/warehouse-inventory-service/src/WarehouseInventory.Contracts/WarehouseInventory.Contracts.csproj services/warehouse-inventory-service/src/WarehouseInventory.Contracts/
COPY services/warehouse-inventory-service/src/WarehouseInventory.API/WarehouseInventory.API.csproj services/warehouse-inventory-service/src/WarehouseInventory.API/

RUN dotnet restore services/warehouse-inventory-service/src/WarehouseInventory.API/WarehouseInventory.API.csproj

COPY services/warehouse-inventory-service/ services/warehouse-inventory-service/
WORKDIR /app/services/warehouse-inventory-service/src/WarehouseInventory.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "WarehouseInventory.API.dll"]
