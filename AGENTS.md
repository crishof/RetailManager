# AGENTS.md

## Arquitectura General

- **Microservicios Spring Boot**: Cada dominio (brand, supplier, product, etc.) es un microservicio independiente bajo `microservices/`, con su propio `pom.xml`, configuración y endpoints REST.
- **API Gateway**: Entrada única (`api-gateway`) que enruta peticiones a los microservicios usando Spring Cloud Gateway y balanceo de carga vía Eureka.
- **Service Registry**: Eureka (`service-registry`) para descubrimiento de servicios.
- **Config Server**: Centraliza la configuración de los microservicios (`config-server`), con archivos YAML por servicio en `config-server/src/main/resources/config/`.
- **Infraestructura**: Orquestada con Docker Compose (`docker/compose/docker-compose.yml`). Incluye PostgreSQL (multi-db) y RabbitMQ para mensajería asíncrona.

## Flujos y Comandos Clave

- **Levantar todo el entorno**:
  ```bash
  cd docker/compose
  docker-compose up -d
  ```
- **Parar y limpiar**:
  ```bash
  docker-compose down
  docker-compose down -v # (elimina volúmenes y datos)
  ```
- **Verificar servicios**:
  - `docker ps` para contenedores
  - `docker logs <servicio>` para logs
  - RabbitMQ UI: http://localhost:15672 (guest/guest)
  - PostgreSQL: `localhost:5544` (dev)
- **Desarrollo local**:
  - Ejecutar microservicio desde IDE/Maven:
    ```bash
    mvn spring-boot:run -Dspring-boot.run.arguments='--spring.profiles.active=dev'
    ```
  - El perfil `dev` conecta a infra Docker local (`localhost`), `prod` usa nombres de host Docker (`postgres`, `rabbitmq`).

## Patrones y Convenciones Específicas

- **Rutas REST**: Prefijo por dominio, ej: `/api/v1/brands`, `/api/v1/suppliers`, `/api/v1/products`.
- **Comunicación entre microservicios**: Feign Client + Circuit Breaker (Resilience4j). Ejemplo: `BrandService` llama a `SupplierService` vía Feign, con fallback.
- **Configuración centralizada**: Variables sensibles y rutas en YAML bajo `config-server/src/main/resources/config/`.
- **Inicialización de bases de datos**: Scripts SQL en `docker/postgres/init/` crean y otorgan privilegios a 20+ bases, una por microservicio.
- **RabbitMQ**: Todos los microservicios preparados para eventos asíncronos (ver `.env` y compose).
- **Actuator**: Endpoints de salud expuestos y configurados para monitoreo y debugging (`/actuator/health`).
- **Perfiles Spring**: Uso intensivo de `dev` y `prod` para cambiar hosts, logging y detalles de seguridad.

## Integraciones y Dependencias

- **Spring Cloud**: Gateway, Config, Eureka, Feign, Resilience4j.
- **PostgreSQL**: Multi-db, credenciales y puertos en `.env`.
- **RabbitMQ**: Mensajería, gestión vía UI.
- **Docker Compose**: Orquestación total, variables en `.env`.

## Archivos y Directorios Clave

- `docker/compose/docker-compose.yml`: Orquestación de servicios
- `docker/postgres/init/`: Scripts de bases de datos
- `microservices/config-server/src/main/resources/config/`: Configuración centralizada YAML
- `microservices/*/src/main/resources/application.yaml`: Configuración local de cada microservicio
- `microservices/*/pom.xml`: Dependencias y plugins Maven
- `microservices/*/src/main/java/com/crishof/*/controller/`: Controladores REST

## Ejemplo de Circuit Breaker y Feign

- `BrandService` llama a `SupplierService` usando Feign Client (`SupplierClient.java`) y Resilience4j Circuit Breaker (`BaseService.java`). Fallback implementado para tolerancia a fallos.

---

> Para detalles de configuración, revisar los YAML en `config-server` y los scripts SQL de inicialización. Los nombres de base de datos y rutas REST deben mantenerse consistentes entre servicios y configuración centralizada.

