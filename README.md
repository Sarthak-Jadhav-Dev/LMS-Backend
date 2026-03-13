# Kids Learning Management System (LMS) Backend

This is the complete, production-ready backend for a Kids Learning Management System built using Node.js, Express, MongoDB, and Mongoose.

## Features

- **Authentication System:** JWT-based login, register, role-based access control (Admin, Teacher, Student, Parent).
- **User Management:** Parent-child linking, student profiles, achievements tracking.
- **Courses & Lessons:** Management of courses, modules, and multimedia lessons (video, pdf, quiz, game).
- **Enrollments:** Students can enroll and track progress.
- **Quizzes & Assessments:** Create quizzes with passing scores and track attempts.
- **Gamification:** Award points, badges, and track student rewards.
- **Assignments & Submissions:** Teachers create assignments, and students submit files.
- **Progress Tracking:** Tracks course completion.
- **Parent Dashboard:** APIs for parents to view child progress and activity.
- **Live Classes:** Meeting links scheduling and status.
- **Certificates:** Course completion certificates.
- **Notifications:** In-app notifications.
- **Admin Analytics:** Platform overview (users, revenue, success rates).

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or Atlas)

### Installation

1. Clone or copy this repository to your local machine.
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Copy the `.env.example` file to `.env` and configure your local settings:
   ```sh
   cp .env.example .env
   ```
   *Ensure you update `MONGO_URI` and `JWT_SECRET`.*

### Running the Application

To run the app in development mode using Nodemon:
```sh
npm run dev
```

To run the app in production mode:
```sh
npm start
```

By default, the API runs on `http://localhost:5000/api/v1`.

---

## Example API Responses

### 1. Register User `POST /api/v1/auth/register`
**Request Body:**
```json
{
  "name": "Jane Student",
  "email": "jane@kidslms.com",
  "password": "password123",
  "role": "student"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "name": "Jane Student",
    "email": "jane@kidslms.com",
    "role": "student"
  }
}
```

### 2. Get Courses `GET /api/v1/courses`
**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "ratings": {
        "average": 4.5,
        "count": 12
      },
      "_id": "60d0fe4f5311236168a109cb",
      "title": "Introduction to Space",
      "description": "Learn about planets and stars!",
      "category": "Science",
      "ageGroup": "8-12",
      "difficultyLevel": "beginner",
      "teacher": {
        "_id": "60d0fe4f5311236168a109c1",
        "name": "Mr. Einstein",
        "email": "einstein@kidslms.com"
      },
      "price": 0,
      "isPublished": true,
      "createdAt": "2024-03-10T14:48:00.000Z"
    }
  ]
}
```

### 3. Parent Dashboard: Get Child Progress `GET /api/v1/users/parent/children/:childId/progress`
*Header: Authorization: Bearer <parent_token>*

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d0fe4f5311236168a109df",
      "student": "60d0fe4f5311236168a109ca",
      "course": {
        "_id": "60d0fe4f5311236168a109cb",
        "title": "Introduction to Space"
      },
      "completedLessons": [
        "60d0fe4f5311236168a109ef"
      ],
      "progressPercentage": 25,
      "lastAccessed": "2024-03-12T10:30:00.000Z"
    }
  ]
}
```

---

