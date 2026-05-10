FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY inventory-sv/.mvn/ .mvn/
COPY inventory-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY inventory-sv/pom.xml inventory-sv/pom.xml
RUN ./mvnw -f inventory-sv/pom.xml dependency:go-offline -q

COPY inventory-sv/src inventory-sv/src
RUN ./mvnw -f inventory-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/inventory-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

