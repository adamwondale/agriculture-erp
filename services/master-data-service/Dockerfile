FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/master-data-service/src/MasterData.Domain/MasterData.Domain.csproj services/master-data-service/src/MasterData.Domain/
COPY services/master-data-service/src/MasterData.Application/MasterData.Application.csproj services/master-data-service/src/MasterData.Application/
COPY services/master-data-service/src/MasterData.Infrastructure/MasterData.Infrastructure.csproj services/master-data-service/src/MasterData.Infrastructure/
COPY services/master-data-service/src/MasterData.Contracts/MasterData.Contracts.csproj services/master-data-service/src/MasterData.Contracts/
COPY services/master-data-service/src/MasterData.API/MasterData.API.csproj services/master-data-service/src/MasterData.API/

RUN dotnet restore services/master-data-service/src/MasterData.API/MasterData.API.csproj

COPY services/master-data-service/ services/master-data-service/
WORKDIR /app/services/master-data-service/src/MasterData.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MasterData.API.dll"]
