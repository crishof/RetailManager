FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY exchange-sv/.mvn/ .mvn/
COPY exchange-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY exchange-sv/pom.xml exchange-sv/pom.xml
RUN ./mvnw -f exchange-sv/pom.xml dependency:go-offline -q

COPY exchange-sv/src exchange-sv/src
RUN ./mvnw -f exchange-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/exchange-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

