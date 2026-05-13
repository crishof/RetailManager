FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY product-sv/.mvn/ .mvn/
COPY product-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY product-sv/pom.xml product-sv/pom.xml
RUN ./mvnw -f product-sv/pom.xml dependency:go-offline -q

COPY product-sv/src product-sv/src
RUN ./mvnw -f product-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/product-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

