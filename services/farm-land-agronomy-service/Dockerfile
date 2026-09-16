FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/farm-land-agronomy-service/src/FarmLandAgronomy.Domain/FarmLandAgronomy.Domain.csproj services/farm-land-agronomy-service/src/FarmLandAgronomy.Domain/
COPY services/farm-land-agronomy-service/src/FarmLandAgronomy.Application/FarmLandAgronomy.Application.csproj services/farm-land-agronomy-service/src/FarmLandAgronomy.Application/
COPY services/farm-land-agronomy-service/src/FarmLandAgronomy.Infrastructure/FarmLandAgronomy.Infrastructure.csproj services/farm-land-agronomy-service/src/FarmLandAgronomy.Infrastructure/
COPY services/farm-land-agronomy-service/src/FarmLandAgronomy.Contracts/FarmLandAgronomy.Contracts.csproj services/farm-land-agronomy-service/src/FarmLandAgronomy.Contracts/
COPY services/farm-land-agronomy-service/src/FarmLandAgronomy.API/FarmLandAgronomy.API.csproj services/farm-land-agronomy-service/src/FarmLandAgronomy.API/

RUN dotnet restore services/farm-land-agronomy-service/src/FarmLandAgronomy.API/FarmLandAgronomy.API.csproj

COPY services/farm-land-agronomy-service/ services/farm-land-agronomy-service/
WORKDIR /app/services/farm-land-agronomy-service/src/FarmLandAgronomy.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "FarmLandAgronomy.API.dll"]
