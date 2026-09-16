FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Domain/BuyersSalesLogistics.Domain.csproj services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Domain/
COPY services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Application/BuyersSalesLogistics.Application.csproj services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Application/
COPY services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Infrastructure/BuyersSalesLogistics.Infrastructure.csproj services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Infrastructure/
COPY services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Contracts/BuyersSalesLogistics.Contracts.csproj services/buyers-sales-logistics-service/src/BuyersSalesLogistics.Contracts/
COPY services/buyers-sales-logistics-service/src/BuyersSalesLogistics.API/BuyersSalesLogistics.API.csproj services/buyers-sales-logistics-service/src/BuyersSalesLogistics.API/

RUN dotnet restore services/buyers-sales-logistics-service/src/BuyersSalesLogistics.API/BuyersSalesLogistics.API.csproj

COPY services/buyers-sales-logistics-service/ services/buyers-sales-logistics-service/
WORKDIR /app/services/buyers-sales-logistics-service/src/BuyersSalesLogistics.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "BuyersSalesLogistics.API.dll"]
