# Student Event Registration and Management System

## 1. Abstract

The project is a full-stack web platform designed for academic institutions to manage student event participation with secure authentication and role-based authorization.
It is built using Spring Boot microservices, MongoDB, React + TypeScript frontend, and JWT-based stateless security.

The application supports separate Student and Faculty flows, secure password handling, protected APIs, and admin-controlled event management.

---

## 2. Problem Statement

Traditional event registration in many campuses is handled through forms, spreadsheets, and manual communication, which causes:

- duplication of records
- poor visibility of event participation
- weak access control for who can modify event data
- no centralized student/faculty workflow

This system solves those issues through a centralized, secure, and role-aware application.

---

## 3. Objectives

- Provide separate login/registration experience for Students and Faculty.
- Enable secure JWT authentication for all protected resources.
- Enforce role-based permissions for event creation and modification.
- Maintain student and event data in MongoDB collections.
- Provide responsive and user-friendly dashboard interfaces.
- Demonstrate production-oriented architecture in a mini-project scope.

---

## 4. Technology Stack

## 4.1 Backend

- Java 17
- Spring Boot 3.x
- Spring Security
- Spring Data MongoDB
- Spring Validation (Jakarta)
- Auth0 Java JWT
- BCrypt password encoder
- Maven build system

## 4.2 Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Fetch API

## 4.3 Database

- MongoDB
  - `studentdb`
  - `eventdb`
  - `facultydb`

---

## 5. System Architecture

Backend follows microservice architecture with modular separation:

1. `student-service` (Port 8082)
2. `event-service` (Port 8081)
3. `faculty-service` (Port 8083)

Service layering pattern:

`Controller -> Service -> Repository -> Model/DTO`

Inter-service communication:

- Student login flow calls Event Service to fetch event list for the logged-in roll number.

---

## 6. Security Architecture

## 6.1 Authentication

- Email + password login.
- Password stored as BCrypt hash.
- On successful authentication, JWT token is generated.

## 6.2 JWT Token Design

Token includes:

- subject: email
- role claim: `USER` or `ADMIN`
- issued at timestamp
- expiration timestamp

## 6.3 Authorization

- All event management APIs are protected.
- Access is determined from JWT role claim.
- Admin-only endpoints are enforced via Spring Security and method-level protection.

## 6.4 Session Strategy

- Stateless authentication (`SessionCreationPolicy.STATELESS`).
- No server-side session persistence.

## 6.5 CORS and Endpoint Exposure

- CORS enabled for frontend origin.
- Only registration and login endpoints are public.
- All remaining sensitive endpoints require valid token.

---

## 7. Role-Based Access Control (RBAC)

## 7.1 USER (Student)

- Register and login.
- View own profile and own event list.
- Cannot create/update/delete events.

## 7.2 ADMIN (Faculty)

- Faculty registration and login.
- View all events.
- Add new events.
- Update existing events.
- Delete events.

---

## 8. Data Models

## 8.1 Student Model

Fields:

- `id`
- `name`
- `rollNo`
- `email`
- `password` (hashed)
- `role` (`USER` or `ADMIN`)

## 8.2 Event Model

Fields:

- `id`
- `eventName`
- `studentName`
- `rollNo`
- `location`
- `date`
- `description`

## 8.3 Faculty Model (faculty-service)

Fields:

- `id`
- `facultyId`
- `facultyName`
- `email`
- `password`

---

## 9. Functional Features

## 9.1 Authentication Features

- Student registration
- Faculty registration
- Student/faculty login
- JWT token issuance
- Role extraction from token

## 9.2 Event Features

- Create event (Admin)
- Update event (Admin)
- Delete event (Admin)
- Get events by roll number
- Get all events (Admin)

## 9.3 Dashboard Features

- Student dashboard with profile summary (`Name`, `Roll No`, `Email`)
- Event cards with labeled fields
- Admin dashboard with event form
- Click card to edit event details
- Guided UI messages
- Toast notifications
- Loading states
- Empty states

---

## 10. Validation and Error Handling

Validation implemented using DTO annotations:

- required fields
- valid email format
- minimum password size
- typed numeric roll number

Error handling:

- global exception handlers in backend services
- HTTP status mapped to clear messages
- frontend displays friendly error feedback

---

## 11. API Specifications

## 11.1 Student Service (Port 8082)

- `POST /student/register`
  - Creates Student account (role USER)
- `POST /student/faculty/register`
  - Creates Faculty account (role ADMIN)
- `POST /student/login`
  - Returns:
    - `token`
    - `studentDetails`
    - `events`
- `GET /student/all`
  - Protected endpoint

## 11.2 Event Service (Port 8081)

- `GET /events/{rollNo}` (JWT required)
- `GET /events` (Admin only)
- `POST /events/add` (Admin only)
- `PUT /events/{id}` (Admin only)
- `DELETE /events/{id}` (Admin only)

## 11.3 Faculty Service (Port 8083)

- `POST /faculty/register`
- `POST /faculty/login`
- `GET /faculty/`

---

## 12. Frontend Navigation and Flow

Routes:

- `/` -> Landing page
- `/student/register` -> Student registration
- `/student/login` -> Student login
- `/faculty/register` -> Faculty registration
- `/faculty/login` -> Faculty login
- `/events` -> Protected dashboard

Flow:

1. User selects role flow from landing page.
2. Registers or logs in.
3. JWT token stored in local storage.
4. Protected route validates token existence.
5. Dashboard content and permissions rendered by role.

---

## 13. Folder Structure

```text
Mini-Project/
  backend/
    student-service/
      src/main/java/com/example/studentservice/
        config/
        controller/
        dto/
        exception/
        model/
        repository/
        security/
        service/
      src/main/resources/application.properties

    event-service/
      src/main/java/com/example/eventservice/
        config/
        controller/
        dto/
        exception/
        model/
        repository/
        security/
        service/
      src/main/resources/application.properties

    faculty-service/
      src/main/java/com/example/facultyservice/
        controller/
        model/
        repository/
        security/
        service/
      src/main/resources/application.properties

  frontend/
    src/
      assets/
      components/
      pages/
      routes/
      services/
      utils/
      App.tsx
      main.tsx
      index.css
```

---

## 14. Environment Configuration

### Student Service

- `server.port=8082`
- `spring.data.mongodb.uri=mongodb://localhost:27017/studentdb`
- JWT secret and expiry properties
- event service base URL

### Event Service

- `server.port=8081`
- `spring.data.mongodb.uri=mongodb://localhost:27017/eventdb`
- shared JWT secret for validation

### Faculty Service

- `server.port=8083`
- `spring.data.mongodb.uri=mongodb://localhost:27017/facultydb`

---

## 15. Test Credentials (Current Seed Data)

## 15.1 Students

### Student1 (Primary test student)

- Name: `Student`
- Email: `student@ssn.edu.in`
- Password: `stud@123`
- Roll No: `123`
- Role: `USER`

### Student2

- Name: `Tushyent`
- Email: `tushyent2410053@ssn.edu.in`
- Password: `tush@123`
- Roll No: `189`
- Role: `USER`

## 15.2 Faculty (Admin)

### Faculty1 (Primary test faculty)

- Name: `Faculty1`
- Email: `faculty@ssn.edu.in`
- Password: `fac@123`
- Roll No: `9001`
- Role: `ADMIN`

### Faculty2

- Name: `Kumar`
- Email: `kumar@ssn.edu.in`
- Password: `kumar@123`
- Roll No: `9002`
- Role: `ADMIN`

## 15.3 Seeded Events

- Invente (Student, roll 123)
- Hackathon (Student, roll 123)
- AI Workshop (Student, roll 123)
- Tech Symposium (Tushyent, roll 189)
- Startup Meetup (Tushyent, roll 189)

---

## 16. Execution Steps

1. Start MongoDB locally.
2. Run backend services:
   - `backend/event-service` -> `mvn spring-boot:run`
   - `backend/student-service` -> `mvn spring-boot:run`
   - `backend/faculty-service` -> `mvn spring-boot:run`
3. Run frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
4. Open `http://localhost:5173`
5. Login using `Student1` or `Faculty1` credentials.

---

## 17. Implementation Highlights for Evaluation

- Proper JWT with expiry and claims
- BCrypt password storage and verification
- Role-based endpoint restrictions
- Microservice separation and service communication
- DTO-driven validation and global exception handling
- Responsive frontend with role-aware dashboard behavior
- Event card editing workflow for admin
- Clear UX feedback and guided labels

---

## 18. Limitations and Scope for Future Work

- Faculty service can be further hardened with same JWT filter pattern as student/event services.
- API gateway and service discovery can be introduced for larger deployments.
- Automated tests (unit/integration/e2e) can be expanded.
- Refresh token strategy can be added for long sessions.

---

## 19. Conclusion

The project demonstrates a complete end-to-end academic event management platform with secure authentication, authorization, modular architecture, and polished frontend behavior.
It satisfies core mini-project requirements and includes additional implementation depth suitable for strong academic evaluation and demonstration.

