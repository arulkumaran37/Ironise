# Ironise

Ironise is a gamified fitness platform where users track workouts, earn XP, unlock achievements, participate in challenges, and optionally leverage browser-based AI for exercise tracking and form insights.

> **Core Principle**: The application functions completely without external AI API calls. AI is an optional enhancement layer, not a dependency.

## Monorepo Layout

```
/backend  → Java 21, Spring Boot 3.x, Maven
/frontend → React (Vite), TailwindCSS, React Router
```

### Backend Structure (`/backend`)

Built with Spring Boot 3.2.3, Spring Data JPA, Spring Security, and OpenAPI/Swagger.

Package Namespace: `com.fitforge`
- `auth`: Authentication & Security 
- `user`: User Profiles & Settings 
- `workout`: Workout Tracking & Logging 
- `gamification`: XP, Levels & Achievements
- `social`: Social Connections & Feed 
- `challenge`: Community Challenges 
- `ai`: On-Device AI Telemetry 

#### Running Backend:
1. Environment file: Copy `.env.example` to `.env`
2. Start PostgreSQL database on `localhost:5432` with database `ironise_db`.
3. Command: `mvn spring-boot:run`
4. Health endpoint: `GET /api/health`
5. Swagger Documentation: `http://localhost:8080/swagger-ui.html`

### Frontend Structure (`/frontend`)

Built with React (Vite), TailwindCSS, React Router DOM v6, and Axios.

```
src/
├── pages/       (LandingPage, LoginPage, RegisterPage, ProfilePage)
├── components/  (Navbar, HeroSection, FeaturesSection, HowItWorksSection, GamificationSection, AISection, FinalCTASection, Footer, HealthStatusBadge)
├── api/         (axiosInstance.js with VITE_API_BASE_URL)
├── hooks/       (useHealthCheck.js)
├── context/
└── assets/
```

#### Running Frontend:
1. Command: `npm install`
2. Command: `npm run dev`
3. Access UI at `http://localhost:5173`

---
Architecture Complete.
