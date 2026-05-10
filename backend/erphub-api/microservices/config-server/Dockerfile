# =========================================================
# Stage 1: Build
# =========================================================
FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY config-server/.mvn/ .mvn/
COPY config-server/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q
COPY config-server/pom.xml config-server/pom.xml
RUN ./mvnw -f config-server/pom.xml dependency:go-offline -q
COPY config-server/src config-server/src
RUN ./mvnw -f config-server/pom.xml package -DskipTests -q

# =========================================================
# Stage 2: Runtime
# =========================================================
FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/config-server/target/*.jar app.jar
COPY config-server/src/main/resources/config /app/config
EXPOSE 8088
ENTRYPOINT ["java", "-jar", "app.jar"]
