# Stage 1: build
FROM maven:3.9.11-eclipse-temurin-25-noble AS build
WORKDIR /app

# Copiar pom y código
COPY pom.xml .
COPY src ./src

# Build
RUN mvn clean package -DskipTests

# Stage 2: runtime
FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]