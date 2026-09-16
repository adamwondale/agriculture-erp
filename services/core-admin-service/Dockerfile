FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/core-admin-service/src/CoreAdmin.Domain/CoreAdmin.Domain.csproj services/core-admin-service/src/CoreAdmin.Domain/
COPY services/core-admin-service/src/CoreAdmin.Application/CoreAdmin.Application.csproj services/core-admin-service/src/CoreAdmin.Application/
COPY services/core-admin-service/src/CoreAdmin.Infrastructure/CoreAdmin.Infrastructure.csproj services/core-admin-service/src/CoreAdmin.Infrastructure/
COPY services/core-admin-service/src/CoreAdmin.Contracts/CoreAdmin.Contracts.csproj services/core-admin-service/src/CoreAdmin.Contracts/
COPY services/core-admin-service/src/CoreAdmin.API/CoreAdmin.API.csproj services/core-admin-service/src/CoreAdmin.API/

RUN dotnet restore services/core-admin-service/src/CoreAdmin.API/CoreAdmin.API.csproj

COPY services/core-admin-service/ services/core-admin-service/
WORKDIR /app/services/core-admin-service/src/CoreAdmin.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "CoreAdmin.API.dll"]
