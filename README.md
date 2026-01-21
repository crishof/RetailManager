# RetailManager

RetailManager is a modular, microservices-based **commercial management system** designed to support retail and wholesale business operations at scale.

The platform focuses on product lifecycle management, pricing, stock control, and commercial workflows, with a strong emphasis on extensibility and future growth.

---

## 🚀 Key Features

### Product & Catalog Management
- Brand and category management (hierarchical categories)
- Product lifecycle control (draft, published, highlighted, etc.)
- Image management via **Cloudinary**
- Slug-based SEO-friendly identifiers

### Supplier Price Lists
- Bulk import of supplier price lists via **Excel**
- Price items stored independently from active products
- Controlled import of price items into active products
- Historical price list retention for audit and comparison

### Inventory & Stock
- Stock management across multiple warehouses and branches
- Support for stock transfers between warehouses
- Designed for future **multi-tenant** expansion

### Commercial Documents
- Support for different document types:
    - Delivery notes (remitos)
    - Invoices
    - Internal stock transfers
- Extensible document model for future fiscal integrations

### Integrations
- Image management service (Cloudinary)
- Currency exchange rates service
- Inter-service communication via REST

---

## 🧱 Architecture Overview

RetailManager follows a **microservices architecture**, where each service owns its data and domain logic.

- Each microservice:
    - Has its own PostgreSQL database
    - Uses JPA repositories with a mix of JPQL and native queries
    - Exposes a REST API
- Services are routed through an **Nginx API Gateway**
- Centralized Swagger UI for API discovery (in progress)

### Current Services (non-exhaustive)
- Brand Service
- Category Service
- Product Service
- Supplier & Price List Service
- Inventory Service
- Sales Service
- Exchange Rate Service
- Image Service

---

## 🛠️ Technology Stack

### Backend
- **Java 25**
- **Spring Boot 4**
- Spring Data JPA
- Spring Web / WebClient
- PostgreSQL (one database per service)

> While the project is built on Java 25 and Spring Boot 4, not all version-specific features are currently in use. The stack was chosen to ensure long-term support and future scalability.

### Infrastructure
- Docker & Docker Compose
- Nginx (API Gateway)
- Health checks via Spring Actuator

---

## 📦 Data Management

- Database-per-service approach
- PostgreSQL as the primary datastore
- Schema initialization via Docker
- Soft delete strategies where applicable
- Strong emphasis on data ownership per bounded context

---

## 🔐 Security (Planned)

The following features are planned and **not yet implemented**:

- User management and roles
- JWT-based authentication
- OAuth2 authorization
- Fine-grained access control per service

---

## 🧩 Future Roadmap

RetailManager is designed to grow into a full-featured ERP-like platform. Planned features include:

- User and staff management
- Authentication & authorization (JWT / OAuth2)
- Web storefront with shopping cart
- Accounting and financial management
- Real-time messaging and notifications
- PDF report generation
- Email notifications
- Technical service management:
    - Product repairs
    - Appointment scheduling
    - Customer communication
- Vehicle and delivery fleet management
- Advanced reporting and analytics

---

## 🐳 Running the Project (Development)

The backend can be started using Docker Compose.

```bash
cd backend/docker
docker compose up --build