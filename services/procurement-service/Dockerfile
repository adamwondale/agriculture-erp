FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/procurement-service/src/Procurement.Domain/Procurement.Domain.csproj services/procurement-service/src/Procurement.Domain/
COPY services/procurement-service/src/Procurement.Application/Procurement.Application.csproj services/procurement-service/src/Procurement.Application/
COPY services/procurement-service/src/Procurement.Infrastructure/Procurement.Infrastructure.csproj services/procurement-service/src/Procurement.Infrastructure/
COPY services/procurement-service/src/Procurement.Contracts/Procurement.Contracts.csproj services/procurement-service/src/Procurement.Contracts/
COPY services/procurement-service/src/Procurement.API/Procurement.API.csproj services/procurement-service/src/Procurement.API/

RUN dotnet restore services/procurement-service/src/Procurement.API/Procurement.API.csproj

COPY services/procurement-service/ services/procurement-service/
WORKDIR /app/services/procurement-service/src/Procurement.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Procurement.API.dll"]
