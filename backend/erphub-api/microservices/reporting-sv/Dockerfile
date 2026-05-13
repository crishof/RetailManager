FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY reporting-sv/.mvn/ .mvn/
COPY reporting-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY reporting-sv/pom.xml reporting-sv/pom.xml
RUN ./mvnw -f reporting-sv/pom.xml dependency:go-offline -q

COPY reporting-sv/src reporting-sv/src
RUN ./mvnw -f reporting-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/reporting-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

