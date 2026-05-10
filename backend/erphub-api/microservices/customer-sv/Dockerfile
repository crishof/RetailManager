FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY customer-sv/.mvn/ .mvn/
COPY customer-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY customer-sv/pom.xml customer-sv/pom.xml
RUN ./mvnw -f customer-sv/pom.xml dependency:go-offline -q

COPY customer-sv/src customer-sv/src
RUN ./mvnw -f customer-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/customer-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

