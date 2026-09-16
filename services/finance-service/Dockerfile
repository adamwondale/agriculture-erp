FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/finance-service/src/Finance.Domain/Finance.Domain.csproj services/finance-service/src/Finance.Domain/
COPY services/finance-service/src/Finance.Application/Finance.Application.csproj services/finance-service/src/Finance.Application/
COPY services/finance-service/src/Finance.Infrastructure/Finance.Infrastructure.csproj services/finance-service/src/Finance.Infrastructure/
COPY services/finance-service/src/Finance.Contracts/Finance.Contracts.csproj services/finance-service/src/Finance.Contracts/
COPY services/finance-service/src/Finance.API/Finance.API.csproj services/finance-service/src/Finance.API/

RUN dotnet restore services/finance-service/src/Finance.API/Finance.API.csproj

COPY services/finance-service/ services/finance-service/
WORKDIR /app/services/finance-service/src/Finance.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Finance.API.dll"]
