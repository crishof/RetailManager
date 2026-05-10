FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY purchase-sv/.mvn/ .mvn/
COPY purchase-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY purchase-sv/pom.xml purchase-sv/pom.xml
RUN ./mvnw -f purchase-sv/pom.xml dependency:go-offline -q

COPY purchase-sv/src purchase-sv/src
RUN ./mvnw -f purchase-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/purchase-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

