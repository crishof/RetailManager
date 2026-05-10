FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

COPY category-sv/.mvn/ .mvn/
COPY category-sv/mvnw mvnw
COPY pom.xml pom.xml
RUN chmod +x mvnw && ./mvnw -N install -q

COPY category-sv/pom.xml category-sv/pom.xml
RUN ./mvnw -f category-sv/pom.xml dependency:go-offline -q

COPY category-sv/src category-sv/src
RUN ./mvnw -f category-sv/pom.xml package -DskipTests -q

FROM eclipse-temurin:25-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/category-sv/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

