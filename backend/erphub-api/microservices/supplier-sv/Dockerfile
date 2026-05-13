FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY supplier-sv/.mvn/ .mvn/
COPY supplier-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY supplier-sv/pom.xml supplier-sv/pom.xml
RUN ./mvnw -f supplier-sv/pom.xml dependency:go-offline -q

COPY supplier-sv/src supplier-sv/src
RUN ./mvnw -f supplier-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/supplier-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

