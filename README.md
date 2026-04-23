# Student Event Management System

A full-stack microservices-based web application designed to streamline academic event registrations and management. Built for scale, security, and exceptional user experience, this platform replaces fragmented administrative processes with a centralized, role-based digital workflow.

**Live Previews:**
* **Frontend:** [https://ip-mini-project-tushyent.vercel.app](https://ip-mini-project-tushyent.vercel.app)
* **Student API:** [https://student-service-yae9.onrender.com/health](https://student-service-yae9.onrender.com/health)
* **Event API:** [https://event-service-c20e.onrender.com/health](https://event-service-c20e.onrender.com/health)
* **Faculty API:** [https://faculty-service-ep3w.onrender.com/health](https://faculty-service-ep3w.onrender.com/health)

---

## Key Features & Capabilities

### 1. Unified Microservices Architecture
The platform is designed using a distributed architecture to ensure seamless independent scaling, higher fault tolerance, and clear domain boundaries.
* **Student Service (Port 8082):** Manages student onboarding, registration, and cross-service data aggregation.
* **Event Service (Port 8081):** A dedicated resource server handling event CRUD operations and domain-specific validation.
* **Faculty Service (Port 8083):** Isolated administrator environment for faculty to securely authenticate and organize institutional events.

### 2. High-Grade Security & RBAC
* **Stateless JWT Authentication:** Implemented custom Spring Security filter chains that intercept and validate JSON Web Tokens without relying on server-side sessions (`SessionCreationPolicy.STATELESS`), reducing server memory overhead.
* **Role-Based Access Control (RBAC):** Token payloads embed distinct claims (`ROLE_USER`, `ROLE_ADMIN`). Endpoints enforce strict method-level and route-level authorization.
* **Granular CORS Configuration:** Enforced origin-checking that strictly binds API consumption to the frontend's Vercel deployment, guarding against cross-site exploitation.

### 3. Dynamic and Responsive UI
* **Modern React + Vite Frontend:** An ultra-fast single-page application built with React 19 and strict TypeScript.
* **Premium UX/UI:** Engineered with Tailwind CSS, utilizing glassmorphism, dynamic routing, active state management, and toast notifications to deliver a highly interactive, native-app-like experience.
* **Role-Aware Dashboards:** The application dynamically morphs the UI based on the authenticated user's role—presenting specific tools to students (viewing personal registrations) and management panels to faculty (global event orchestration).

---

## Technology Stack

**Frontend Layer**
* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS + PostCSS
* **Routing:** React Router v7
* **Icons:** Lucide React

**Backend & Microservices Layer**
* **Core:** Java 17 + Spring Boot 3.x
* **Security:** Spring Security + Auth0 Java JWT (+ BCrypt Password Encoding)
* **Communication:** REST APIs + Spring RestTemplate (for inter-service calls)
* **Build System:** Maven

**Data & Infrastructure**
* **Database:** MongoDB Atlas (Cloud NoSQL DBs: `studentdb`, `eventdb`, `facultydb`)
* **Deployment:** Vercel (Client), Render (APIs)
* **Uptime Optimization:** Custom HEAD endpoint interceptors strictly implemented to cooperate with `UptimeRobot` pings, circumventing Render’s cold-start delays.

---

## Technical Approach & Design Decisions

### 1. Inter-Service Communication Strategy
When a student logs in, the `student-service` processes the authentication but also needs to aggregate the student's registered events. Rather than sharing a monolithic database, the `student-service` securely relays the validated JWT as a Bearer token in an HTTP `GET` request using `RestTemplate` to the `event-service`. This ensures that data ownership is strictly maintained while composite responses are served seamlessly to the client.

### 2. Overcoming Cloud "Cold Starts"
To bypass Render's free-tier inactivity sleep cycle, a custom configuration was engineered:
* **Endpoint Optimization:** A lightweight `/` (Root) controller was developed.
* **Security Filter Modification:** The `JwtAuthFilter` and `SecurityConfig` were instructed to whitelist HTTP `HEAD` methods (pinged every 5 minutes via UptimeRobot), guaranteeing sub-millisecond 200 OK responses constantly keeping the JVM containers warm.

### 3. Graceful Error Handling & Validation
* **Backend:** Global Exception Handlers (`@RestControllerAdvice`) catch invalid states (e.g., duplicate emails, bad credentials) and mold them into normalized, front-end friendly JSON error payloads with precise HTTP status codes.
* **Frontend:** A centralized `fetchWithAuth` wrapper parses the normalized backend errors and propagates them as strongly typed `ApiError` instances, prompting dynamic UI Toast notifications.

---

## Local Development & Setup

### Prerequisites
* Java 17+ and Maven
* Node.js v18+
* MongoDB running locally (Port `27017`)

### Backend Setup
Execute the following commands in three separate terminal instances:
```bash
# Terminal 1: Event Service
cd backend/event-service
mvn spring-boot:run

# Terminal 2: Student Service
cd backend/student-service
mvn spring-boot:run

# Terminal 3: Faculty Service
cd backend/faculty-service
mvn spring-boot:run
```

### Frontend Setup
```bash
# Terminal 4: React Client
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:5173` to experience the application.

---

## Included Seed Credentials

**Administrator (Faculty)**
* **Email:** `faculty@ssn.edu.in`
* **Password:** `fac@123`

**User (Student)**
* **Email:** `student@ssn.edu.in`
* **Password:** `stud@123`
