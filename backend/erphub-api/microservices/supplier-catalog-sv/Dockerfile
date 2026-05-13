FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY supplier-catalog-sv/.mvn/ .mvn/
COPY supplier-catalog-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY supplier-catalog-sv/pom.xml supplier-catalog-sv/pom.xml
RUN ./mvnw -f supplier-catalog-sv/pom.xml dependency:go-offline -q

COPY supplier-catalog-sv/src supplier-catalog-sv/src
RUN ./mvnw -f supplier-catalog-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/supplier-catalog-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

