# Stage 1: Build Flutter Web
FROM ghcr.io/cirruslabs/flutter:3.44.2 AS builder
WORKDIR /app

# Pre-cache dependencies
COPY pubspec.yaml pubspec.lock ./
RUN flutter pub get

# Copy source and compile Flutter Web
COPY . .
RUN flutter build web --release

# Stage 2: Serve using Nginx
FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/web /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
