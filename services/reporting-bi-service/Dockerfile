FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/reporting-bi-service/src/ReportingBI.Domain/ReportingBI.Domain.csproj services/reporting-bi-service/src/ReportingBI.Domain/
COPY services/reporting-bi-service/src/ReportingBI.Application/ReportingBI.Application.csproj services/reporting-bi-service/src/ReportingBI.Application/
COPY services/reporting-bi-service/src/ReportingBI.Infrastructure/ReportingBI.Infrastructure.csproj services/reporting-bi-service/src/ReportingBI.Infrastructure/
COPY services/reporting-bi-service/src/ReportingBI.Contracts/ReportingBI.Contracts.csproj services/reporting-bi-service/src/ReportingBI.Contracts/
COPY services/reporting-bi-service/src/ReportingBI.API/ReportingBI.API.csproj services/reporting-bi-service/src/ReportingBI.API/

RUN dotnet restore services/reporting-bi-service/src/ReportingBI.API/ReportingBI.API.csproj

COPY services/reporting-bi-service/ services/reporting-bi-service/
WORKDIR /app/services/reporting-bi-service/src/ReportingBI.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "ReportingBI.API.dll"]
