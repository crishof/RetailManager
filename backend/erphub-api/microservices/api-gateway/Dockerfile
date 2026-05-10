# =========================================================
# Stage 1: Build
# (contexto de build: microservices/ - incluye parent pom.xml)
# =========================================================
FROM eclipse-temurin:21-jdk-noble AS build
WORKDIR /app

# Copiar el wrapper Maven y el parent POM
COPY api-gateway/.mvn/ .mvn/
COPY api-gateway/mvnw mvnw
COPY pom.xml pom.xml

# Instalar el parent POM en el repositorio local de Maven
RUN chmod +x mvnw && ./mvnw -N install -q

# Cachear dependencias del servicio (capa separada del src)
COPY api-gateway/pom.xml api-gateway/pom.xml
RUN ./mvnw -f api-gateway/pom.xml dependency:go-offline -q

# Compilar el servicio
COPY api-gateway/src api-gateway/src
RUN ./mvnw -f api-gateway/pom.xml package -DskipTests -q

# =========================================================
# Stage 2: Runtime (imagen JRE - mas liviana)
# =========================================================
FROM eclipse-temurin:21-jre-noble
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/api-gateway/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
