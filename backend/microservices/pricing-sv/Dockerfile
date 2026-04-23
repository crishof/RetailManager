# =========================================================
# Stage 1: Build
# (contexto de build: microservices/ - incluye parent pom.xml)
# =========================================================
FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

# Copiar el wrapper Maven y el parent POM
COPY pricing-sv/.mvn/ .mvn/
COPY pricing-sv/mvnw mvnw
COPY pom.xml pom.xml

# Instalar el parent POM en el repositorio local de Maven
RUN chmod +x mvnw && ./mvnw -N install -q

# Cachear dependencias del servicio (capa separada del src)
COPY pricing-sv/pom.xml pricing-sv/pom.xml
RUN ./mvnw -f pricing-sv/pom.xml dependency:go-offline -q

# Compilar el servicio
COPY pricing-sv/src pricing-sv/src
RUN ./mvnw -f pricing-sv/pom.xml package -DskipTests -q

# =========================================================
# Stage 2: Runtime (imagen JRE - mas liviana)
# =========================================================
FROM eclipse-temurin:25-jre-noble
WORKDIR /app

COPY --from=build /app/pricing-sv/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
