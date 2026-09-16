FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/contract-farming-service/src/ContractFarming.Domain/ContractFarming.Domain.csproj services/contract-farming-service/src/ContractFarming.Domain/
COPY services/contract-farming-service/src/ContractFarming.Application/ContractFarming.Application.csproj services/contract-farming-service/src/ContractFarming.Application/
COPY services/contract-farming-service/src/ContractFarming.Infrastructure/ContractFarming.Infrastructure.csproj services/contract-farming-service/src/ContractFarming.Infrastructure/
COPY services/contract-farming-service/src/ContractFarming.Contracts/ContractFarming.Contracts.csproj services/contract-farming-service/src/ContractFarming.Contracts/
COPY services/contract-farming-service/src/ContractFarming.API/ContractFarming.API.csproj services/contract-farming-service/src/ContractFarming.API/

RUN dotnet restore services/contract-farming-service/src/ContractFarming.API/ContractFarming.API.csproj

COPY services/contract-farming-service/ services/contract-farming-service/
WORKDIR /app/services/contract-farming-service/src/ContractFarming.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "ContractFarming.API.dll"]
