FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY image-sv/.mvn/ .mvn/
COPY image-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY image-sv/pom.xml image-sv/pom.xml
RUN ./mvnw -f image-sv/pom.xml dependency:go-offline -q

COPY image-sv/src image-sv/src
RUN ./mvnw -f image-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/image-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

