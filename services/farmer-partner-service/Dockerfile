FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/farmer-partner-service/src/FarmerPartner.Domain/FarmerPartner.Domain.csproj services/farmer-partner-service/src/FarmerPartner.Domain/
COPY services/farmer-partner-service/src/FarmerPartner.Application/FarmerPartner.Application.csproj services/farmer-partner-service/src/FarmerPartner.Application/
COPY services/farmer-partner-service/src/FarmerPartner.Infrastructure/FarmerPartner.Infrastructure.csproj services/farmer-partner-service/src/FarmerPartner.Infrastructure/
COPY services/farmer-partner-service/src/FarmerPartner.Contracts/FarmerPartner.Contracts.csproj services/farmer-partner-service/src/FarmerPartner.Contracts/
COPY services/farmer-partner-service/src/FarmerPartner.API/FarmerPartner.API.csproj services/farmer-partner-service/src/FarmerPartner.API/

RUN dotnet restore services/farmer-partner-service/src/FarmerPartner.API/FarmerPartner.API.csproj

COPY services/farmer-partner-service/ services/farmer-partner-service/
WORKDIR /app/services/farmer-partner-service/src/FarmerPartner.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "FarmerPartner.API.dll"]
