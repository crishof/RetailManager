FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY location-sv/.mvn/ .mvn/
COPY location-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY location-sv/pom.xml location-sv/pom.xml
RUN ./mvnw -f location-sv/pom.xml dependency:go-offline -q

COPY location-sv/src location-sv/src
RUN ./mvnw -f location-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/location-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

