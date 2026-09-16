FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/customer-investor-portal-service/src/CustomerInvestorPortal.Domain/CustomerInvestorPortal.Domain.csproj services/customer-investor-portal-service/src/CustomerInvestorPortal.Domain/
COPY services/customer-investor-portal-service/src/CustomerInvestorPortal.Application/CustomerInvestorPortal.Application.csproj services/customer-investor-portal-service/src/CustomerInvestorPortal.Application/
COPY services/customer-investor-portal-service/src/CustomerInvestorPortal.Infrastructure/CustomerInvestorPortal.Infrastructure.csproj services/customer-investor-portal-service/src/CustomerInvestorPortal.Infrastructure/
COPY services/customer-investor-portal-service/src/CustomerInvestorPortal.Contracts/CustomerInvestorPortal.Contracts.csproj services/customer-investor-portal-service/src/CustomerInvestorPortal.Contracts/
COPY services/customer-investor-portal-service/src/CustomerInvestorPortal.API/CustomerInvestorPortal.API.csproj services/customer-investor-portal-service/src/CustomerInvestorPortal.API/

RUN dotnet restore services/customer-investor-portal-service/src/CustomerInvestorPortal.API/CustomerInvestorPortal.API.csproj

COPY services/customer-investor-portal-service/ services/customer-investor-portal-service/
WORKDIR /app/services/customer-investor-portal-service/src/CustomerInvestorPortal.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "CustomerInvestorPortal.API.dll"]
