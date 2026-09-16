FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy shared libraries
COPY shared/ shared/

# Copy service projects
COPY services/automation-workflow-service/src/AutomationWorkflow.Domain/AutomationWorkflow.Domain.csproj services/automation-workflow-service/src/AutomationWorkflow.Domain/
COPY services/automation-workflow-service/src/AutomationWorkflow.Application/AutomationWorkflow.Application.csproj services/automation-workflow-service/src/AutomationWorkflow.Application/
COPY services/automation-workflow-service/src/AutomationWorkflow.Infrastructure/AutomationWorkflow.Infrastructure.csproj services/automation-workflow-service/src/AutomationWorkflow.Infrastructure/
COPY services/automation-workflow-service/src/AutomationWorkflow.Contracts/AutomationWorkflow.Contracts.csproj services/automation-workflow-service/src/AutomationWorkflow.Contracts/
COPY services/automation-workflow-service/src/AutomationWorkflow.API/AutomationWorkflow.API.csproj services/automation-workflow-service/src/AutomationWorkflow.API/

RUN dotnet restore services/automation-workflow-service/src/AutomationWorkflow.API/AutomationWorkflow.API.csproj

COPY services/automation-workflow-service/ services/automation-workflow-service/
WORKDIR /app/services/automation-workflow-service/src/AutomationWorkflow.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "AutomationWorkflow.API.dll"]
