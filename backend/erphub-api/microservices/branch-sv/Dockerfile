FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY branch-sv/.mvn/ .mvn/
COPY branch-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY branch-sv/pom.xml branch-sv/pom.xml
RUN ./mvnw -f branch-sv/pom.xml dependency:go-offline -q

COPY branch-sv/src branch-sv/src
RUN ./mvnw -f branch-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/branch-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

