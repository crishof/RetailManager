FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY tenant-sv/.mvn/ .mvn/
COPY tenant-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY tenant-sv/pom.xml tenant-sv/pom.xml
RUN ./mvnw -f tenant-sv/pom.xml dependency:go-offline -q

COPY tenant-sv/src tenant-sv/src
RUN ./mvnw -f tenant-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/tenant-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

