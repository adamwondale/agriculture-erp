FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY src/Gateway.API/Gateway.API.csproj src/Gateway.API/
RUN dotnet restore src/Gateway.API/Gateway.API.csproj
COPY src/Gateway.API/ src/Gateway.API/
WORKDIR /app/src/Gateway.API
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Gateway.API.dll"]
