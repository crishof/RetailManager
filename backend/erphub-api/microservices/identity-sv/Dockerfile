FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY identity-sv/.mvn/ .mvn/
COPY identity-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY identity-sv/pom.xml identity-sv/pom.xml
RUN ./mvnw -f identity-sv/pom.xml dependency:go-offline -q

COPY identity-sv/src identity-sv/src
RUN ./mvnw -f identity-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/identity-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

