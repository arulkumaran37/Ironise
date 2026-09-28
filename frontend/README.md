# Ironise / FitForge Frontend

React (Vite) + TailwindCSS frontend application for the Ironise gamified fitness platform.

## Features

- **Polished Landing Page**: Responsive hero, feature showcase, 4-step workflow, gamification progression mockup, on-device AI section, and final CTAs.
- **Backend Health Check**: Real-time unobtrusive health monitor calling `GET /api/health` via Axios. Graceful fallback when backend is offline.
- **Client Routing**: React Router v6 configuration for `/`, `/login`, `/register`, and `/profile`.

## Setup & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Copy `.env.example` to `.env`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8080
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`.
