FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY pricing-sv/.mvn/ .mvn/
COPY pricing-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY pricing-sv/pom.xml pricing-sv/pom.xml
RUN ./mvnw -f pricing-sv/pom.xml dependency:go-offline -q

COPY pricing-sv/src pricing-sv/src
RUN ./mvnw -f pricing-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/pricing-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

