# =========================================================
# Stage 1: Build
# =========================================================
FROM eclipse-temurin:25-jdk-noble AS build
WORKDIR /app

# Copiar wrapper primero para aprovechar caché de capas
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -q

# Copiar fuentes y compilar
COPY src ./src
RUN ./mvnw clean package -DskipTests -q

# =========================================================
# Stage 2: Runtime (imagen JRE — más liviana)
# =========================================================
FROM eclipse-temurin:25-jre-noble
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]