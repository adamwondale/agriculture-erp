FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/hr-service/src/HR.Domain/HR.Domain.csproj services/hr-service/src/HR.Domain/
COPY services/hr-service/src/HR.Application/HR.Application.csproj services/hr-service/src/HR.Application/
COPY services/hr-service/src/HR.Infrastructure/HR.Infrastructure.csproj services/hr-service/src/HR.Infrastructure/
COPY services/hr-service/src/HR.Contracts/HR.Contracts.csproj services/hr-service/src/HR.Contracts/
COPY services/hr-service/src/HR.API/HR.API.csproj services/hr-service/src/HR.API/

RUN dotnet restore services/hr-service/src/HR.API/HR.API.csproj

COPY services/hr-service/ services/hr-service/
WORKDIR /app/services/hr-service/src/HR.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "HR.API.dll"]
