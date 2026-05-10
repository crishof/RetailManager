# RetailManager Docker Compose Configuration

## Overview

This directory contains the Docker Compose configuration for the complete RetailManager microservices ecosystem running in containers. The setup manages 15 services:
- **Infrastructure**: PostgreSQL 17, RabbitMQ 3.13
- **API Gateway**: Single entry point (port 8080)
- **13 Microservices**: All accessible only through the gateway via the internal Docker network

## Architecture

### Network
- **Name**: `erphub-net` (Docker bridge network)
- **Isolation**: All services except gateway are internal to the network
- **External Access**: Only gateway exposes port 8080

### Database Strategy
- **Single PostgreSQL Instance**: Running in Docker at port 5544 (mapped from container port 5432)
- **13 Separate Databases**: One per microservice for data isolation
  - brand_db, category_db, customer_db, product_db, supplier_db, inventory_db
  - pricing_db, image_db, price_list_db, sales_db, exchange_db, location_db, branch_db
- **Connection**: All services access via `postgres:5432` (Docker hostname) in prod profile
- **IDE Access**: Developers can connect to `localhost:5544` using dev profile

### Message Broker
- **RabbitMQ 3.13**: Running in Docker
- **Management UI**: http://localhost:15672 (guest/guest)
- **Credentials**: guest/guest
- **Services**: All 13 microservices configured for async event publishing

## Files

### `.env` - Global Configuration
Contains all infrastructure variables used by `docker-compose.yml`:
- PostgreSQL credentials and ports
- RabbitMQ credentials and ports
- Network name
- Spring Boot profile (dev/prod)
- All 13 database name mappings

**Key Variables**:
```
POSTGRES_USER=erphub
POSTGRES_PASSWORD=RetailMgr2024!
POSTGRES_DB_PORT=5544
SPRING_ACTIVE_PROFILE=prod
```

### `docker-compose.yml` - Service Definitions
Defines 15 services:
1. **postgres**: PostgreSQL 17-alpine with init scripts
2. **rabbitmq**: RabbitMQ 3.13-management-alpine
3. **gateway-sv**: API Gateway on port 8080
4. **13 Microservices**: brand-sv, category-sv, customer-sv, product-sv, supplier-sv, inventory-sv, pricing-sv, image-sv, supplier-price-list-sv, customer-order-sv, exchange-sv, location-sv, branch-sv

**Service Features**:
- Environment variables from `.env`
- Healthchecks on all services (postgres, rabbitmq, and actuator endpoints)
- Proper dependency ordering (microservices wait for postgres + rabbitmq to be healthy)
- Restart policies (unless-stopped)

## Spring Boot Profiles

### Development Profile (`spring.profiles.active=dev`)
**Target**: IDE execution on developer machines
```properties
# Connection string for local PostgreSQL in Docker
spring.datasource.url=jdbc:postgresql://localhost:5544/[SERVICE_DB]

# Local RabbitMQ
spring.rabbitmq.host=localhost

# Debug logging
logging.level.org.springframework=DEBUG
spring.jpa.show-sql=true

# Full actuator access
management.endpoint.health.show-details=always
```

### Production Profile (`spring.profiles.active=prod`)
**Target**: Docker container execution
```properties
# Connection via Docker network hostname
spring.datasource.url=jdbc:postgresql://postgres:5432/[SERVICE_DB]

# RabbitMQ via Docker network
spring.rabbitmq.host=rabbitmq

# Minimal logging
logging.level.root=WARN

# Restricted actuator
management.endpoint.health.show-details=when_authorized
```

## Getting Started

### Start All Services
```bash
cd /backend/docker/compose
docker-compose up -d
```

### Verify Services
```bash
# Check all containers are running
docker ps

# View logs for a specific service
docker logs brand-sv

# Access RabbitMQ Management
# Visit: http://localhost:15672 (guest/guest)

# Check database creation
docker exec postgres psql -U erphub -l
```

### Stop All Services
```bash
docker-compose down
```

### Remove Volumes (Reset All Data)
```bash
docker-compose down -v
```

## Development Workflow

### Running a Service from IDE with Dev Profile

Use the `dev` profile to connect to the PostgreSQL running in Docker:

**Maven**:
```bash
cd microservices/brand-sv
mvn spring-boot:run -Dspring-boot.run.arguments='--spring.profiles.active=dev'
```

**IntelliJ IDEA**:
1. Edit Run Configuration
2. Add VM options or program arguments: `--spring.profiles.active=dev`
3. Run the service

**Expected Behavior**:
- Service connects to `localhost:5544` for PostgreSQL
- Service connects to `localhost:5672` for RabbitMQ
- DEBUG logging is enabled
- Actuator endpoints show full health details

### Testing Service Connectivity
```bash
# Check if gateway is responding
curl -i http://localhost:8080/actuator/health

# Check if a specific microservice is healthy (via gateway logs)
docker logs gateway-sv | grep "brand-sv"
```

## Database Initialization

The PostgreSQL container automatically runs initialization scripts on first start:
- `/docker/postgres/init/01-create-databases.sql`: Creates all 13 databases with proper ownership
- `/docker/postgres/init/02-grant-privileges.sql`: Grants necessary permissions to erphub user

## Troubleshooting

### Containers Keep Restarting
Check logs:
```bash
docker logs [service-name]
```
Common causes:
- Database not ready when service starts (wait for postgres healthcheck)
- Missing environment variable
- Port conflict (change POSTGRES_DB_PORT or GATEWAY_PORT in .env)

### Cannot Connect to PostgreSQL from IDE
1. Verify port mapping: `docker port postgres` should show `5432/tcp -> 0.0.0.0:5544`
2. Verify dev profile is active: Check logs for `The following profiles are active: dev`
3. Test connectivity: `psql -h localhost -p 5544 -U erphub -l`

### RabbitMQ Management UI Not Accessible
1. Verify container is running: `docker ps | grep rabbitmq`
2. Check port mapping: `docker port rabbitmq` should show `15672/tcp -> 0.0.0.0:15672`
3. Visit: http://localhost:15672 with guest/guest

### Services Not Connecting to RabbitMQ
1. Verify RABBITMQ_NETWORK_HOST in env: `docker inspect [service]` check environment
2. Check RabbitMQ logs: `docker logs rabbitmq`
3. From IDE dev profile: use `localhost` not Docker hostname

## Performance Notes

- **First Start**: May take 2-3 minutes for all services to be healthy (initialization of 13 databases + Spring Boot startup)
- **PostgreSQL**: Uses 17-alpine (minimal footprint)
- **RabbitMQ**: Pre-allocated 256MB memory by default (adjust in docker-compose.yml if needed)

## Security Notes

- **Credentials**: Currently using development defaults (erphub/RetailMgr2024! for Postgres, guest/guest for RabbitMQ)
- **Before Production**: Change credentials in `.env` and update PostgreSQL init scripts
- **Network Isolation**: Microservices are not exposed to external network (good for development, ensure production setup uses proper API gateway)

## Related Directories

- `/backend/docker/postgres/init/`: PostgreSQL initialization scripts
- `/backend/docker/nginx/`: Nginx reverse proxy configuration (optional)
- `/backend/microservices/*/`: Individual service Dockerfiles and Spring profiles
