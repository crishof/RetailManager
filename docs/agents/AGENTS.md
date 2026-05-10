# AGENTS.md - AI Agent Guide

## Overview

This document guides AI agents working on RetailManager codebase.

---

## Repository Structure

```
RetailManager/
├── backend/erphub-api/
│   ├── docker/compose/          # Docker orchestration
│   ├── microservices/           # 13+ Spring Boot services
│   │   ├── api-gateway/         # Entry point
│   │   ├── service-registry/   # Eureka
│   │   ├── config-server/       # Central config
│   │   └── {domain}-sv/        # Domain services
│   └── docker/postgres/init/   # DB initialization
├── frontend/web-client/         # Angular 17 app
├── docs/                        # Documentation
└── README.md                    # Human overview
```

---

## Key Commands

### Docker

```bash
# Start all services
cd docker/compose
docker compose up -d

# Stop and reset
docker compose down
docker compose down -v  # Remove volumes
```

### Backend

```bash
# Run single service (dev profile)
cd microservices/brand-sv
mvn spring-boot:run -Dspring-boot.run.arguments='--spring.profiles.active=dev'

# Build
mvn clean package -DskipTests
```

### Frontend

```bash
cd frontend/web-client
npm install
npm start
```

---

## Architecture Patterns

### Service Communication

- **Feign Client**: Inter-service HTTP calls
- **Resilience4j**: Circuit breaker, retry, rate limiter
- **Fallback**: Graceful degradation

Example:
```java
@FeignClient(name = "supplier-sv", fallback = SupplierFallback.class)
public interface SupplierClient {}
```

### Database

- One PostgreSQL database per service
- Database-per-service pattern
- Init scripts in `docker/postgres/init/`

### API Routes

- Format: `/api/v1/{resource}`
- Examples: `/api/v1/brands`, `/api/v1/suppliers`, `/api/v1/products`

---

## Configuration

- **Dev Profile**: Connects to localhost:5544 (PostgreSQL), localhost:5672 (RabbitMQ)
- **Prod Profile**: Connects to Docker network hostnames (postgres, rabbitmq)

Set via: `--spring.profiles.active=dev`

---

## Important Files

| File | Purpose |
|------|---------|
| `docker/compose/docker-compose.yml` | Service orchestration |
| `docker/compose/.env` | Environment variables |
| `config-server/src/main/resources/config/*.yaml` | Central config |
| `microservices/*/src/main/resources/application.yaml` | Service config |

---

## Safety Rules

1. **NEVER** commit secrets, credentials, `.env` files
2. **NEVER** modify `.gitignore` to include secrets
3. **DO NOT** delete code without explicit approval
4. **DO NOT** introduce breaking changes without testing

---

## Working on Code Changes

When implementing features:

1. Follow existing patterns in codebase
2. Use consistent naming (camelCase for Java, PascalCase for TypeScript)
3. Add tests for new functionality
4. Update documentation if needed
5. Verify build passes before completing

---

## Troubleshooting

See [troubleshooting.md](../troubleshooting.md) for common issues.

---

## References

- [Local Development](../local-development.md)
- [Docker Setup](../docker.md)
- [Backend Overview](../backend/overview.md)
- [Frontend Overview](../frontend/overview.md)