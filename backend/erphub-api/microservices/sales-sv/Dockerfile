FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY sales-sv/.mvn/ .mvn/
COPY sales-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY sales-sv/pom.xml sales-sv/pom.xml
RUN ./mvnw -f sales-sv/pom.xml dependency:go-offline -q

COPY sales-sv/src sales-sv/src
RUN ./mvnw -f sales-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/sales-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

