# Ironise / FitForge Backend

Spring Boot 3.x backend service for the Ironise gamified fitness platform.

## Prerequisites

- Java 21 JDK
- Maven 3.8+
- PostgreSQL 14+ (or Docker container)

## Environment Variables

Copy `.env.example` to `.env` or set the environment variables in your runtime environment:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ironise_db
DB_USER=postgres
DB_PASS=postgres
PORT=8080
```

## Running the Application

1. **Start PostgreSQL Database**:
   Make sure PostgreSQL is running on `localhost:5432` with a database named `ironise_db`.

2. **Build the Application**:
   ```bash
   mvn clean package -DskipTests
   ```

3. **Run Spring Boot App**:
   ```bash
   mvn spring-boot:run
   ```

## Key Endpoints

- **Health Check**: `GET /api/health`
  ```json
  {
    "status": "UP",
    "message": "FitForge backend is healthy"
  }
  ```

- **Swagger / OpenAPI Documentation**:
  - UI: `http://localhost:8080/swagger-ui.html`
  - OpenAPI Spec: `http://localhost:8080/v3/api-docs`

## Package Structure

- `com.fitforge.auth`: Authentication & Security (Phase 1)
- `com.fitforge.user`: User profiles & settings (Phase 1)
- `com.fitforge.workout`: Workout tracking & logging (Phase 1)
- `com.fitforge.gamification`: XP, Levels & Achievements (Phase 2)
- `com.fitforge.social`: Social connections & feeds (Phase 2)
- `com.fitforge.challenge`: Community challenges & contests (Phase 2)
- `com.fitforge.ai`: AI telemetry & on-device pose metadata support (Phase 3)
