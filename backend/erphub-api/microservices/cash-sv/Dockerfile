FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY cash-sv/.mvn/ .mvn/
COPY cash-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY cash-sv/pom.xml cash-sv/pom.xml
RUN ./mvnw -f cash-sv/pom.xml dependency:go-offline -q

COPY cash-sv/src cash-sv/src
RUN ./mvnw -f cash-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/cash-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

