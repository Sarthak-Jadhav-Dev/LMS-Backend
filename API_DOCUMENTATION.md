# Kids LMS API Documentation

Base URL: `http://localhost:5000/api/v1`

All protected routes require an `Authorization` header with the Bearer token:
`Authorization: Bearer <token>`

---

## 1. Authentication (`/auth`)

### 1.1 Register User
- **URL:** `POST /auth/register`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "Jane Student",
    "email": "jane@kidslms.com",
    "password": "password123",
    "role": "student",
    "phone": "1234567890"
  }
  ```
  *(Role can be: `student`, `teacher`, `parent`, or `admin`)*
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5c... (jwt token)",
    "user": {
      "id": "60d0fe4...",
      "name": "Jane Student",
      "email": "jane@kidslms.com",
      "role": "student"
    }
  }
  ```

### 1.2 Login User
- **URL:** `POST /auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "jane@kidslms.com",
    "password": "password123"
  }
  ```
- **Response (200 OK):**
  Same as Register response structure.

### 1.3 Logout User
- **URL:** `POST /auth/logout`
- **Access:** Private
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User logged out successfully"
  }
  ```

### 1.4 Get Current Logged In User
- **URL:** `GET /auth/me`
- **Access:** Private
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d0fe4...",
      "name": "Jane Student",
      "email": "jane@kidslms.com",
      "role": "student"
      // other fields...
    }
  }
  ```

---

## 2. Users & Parent Dashboard (`/users`)

### 2.1 Get All Users
- **URL:** `GET /users`
- **Access:** Private / Admin
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 10,
    "data": [ /* array of user objects */ ]
  }
  ```

### 2.2 Get/Update/Delete Single User
- **URL:** `GET|PUT|DELETE /users/:id`
- **Access:** Private / Admin
- **Request Body (For PUT):**
  ```json
  {
    "status": "active"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { /* user object or empty {} for DELETE */ }
  }
  ```

### 2.3 Parent Dashboard - Get Children
- **URL:** `GET /users/parent/children`
- **Access:** Private / Parent
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [ /* array of child user objects */ ]
  }
  ```

### 2.4 Parent Dashboard - Get Child Progress
- **URL:** `GET /users/parent/children/:childId/progress`
- **Access:** Private / Parent
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "60d0fe4...",
        "student": "60d0feac...",
        "course": { /* course overview */ },
        "progressPercentage": 45,
        "completedLessons": ["lesson_id_1"]
      }
    ]
  }
  ```

### 2.5 Parent Dashboard - Get Child Quizzes
- **URL:** `GET /users/parent/children/:childId/quizzes`
- **Access:** Private / Parent
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [ /* array of quiz attempt objects */ ]
  }
  ```

---

## 3. Courses (`/courses`)

### 3.1 Get Courses
- **URL:** `GET /courses`
- **Access:** Public
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 5,
    "data": [ /* array of course objects with populated teacher and modules */ ]
  }
  ```

### 3.2 Get Single Course
- **URL:** `GET /courses/:id`
- **Access:** Public
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": { /* course object */ }
  }
  ```

### 3.3 Create Course
- **URL:** `POST /courses`
- **Access:** Private / Teacher or Admin
- **Request Body:**
  ```json
  {
    "title": "Intro to Math",
    "description": "Basic mathematics.",
    "category": "Math",
    "ageGroup": "6-8",
    "difficultyLevel": "beginner",
    "price": 10
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* new course object */ }
  }
  ```

*(To Update or Delete a course, use `PUT /courses/:id` and `DELETE /courses/:id` with similar formats)*

---

## 4. Modules (`/modules` & `/courses/:courseId/modules`)

### 4.1 Get Modules
- **URL:** `GET /modules` or `GET /courses/:courseId/modules`
- **Access:** Public
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 3,
    "data": [ /* array of module objects */ ]
  }
  ```

### 4.2 Add Module to Course
- **URL:** `POST /courses/:courseId/modules`
- **Access:** Private / Course Teacher or Admin
- **Request Body:**
  ```json
  {
    "title": "Addition Basics",
    "order": 1
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* new module object */ }
  }
  ```

---

## 5. Lessons (`/lessons` & `/modules/:moduleId/lessons`)

### 5.1 Get Lessons
- **URL:** `GET /lessons` or `GET /modules/:moduleId/lessons`
- **Access:** Public
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 4,
    "data": [ /* array of lesson objects */ ]
  }
  ```

### 5.2 Add Lesson to Module
- **URL:** `POST /modules/:moduleId/lessons`
- **Access:** Private / Course Teacher or Admin
- **Request Body:**
  ```json
  {
    "title": "Single Digit Addition",
    "type": "video",
    "videoUrl": "http://example.com/video.mp4",
    "duration": 5,
    "order": 1
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* new lesson object */ }
  }
  ```

---

## 6. Enrollments (`/enroll`)

### 6.1 Enroll in Course
- **URL:** `POST /enroll/:courseId`
- **Access:** Private / Student
- **Request Body:** None
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "student": "student_id",
      "course": "course_id",
      "progress": 0,
      "completionStatus": "active"
    }
  }
  ```

### 6.2 Get Student Enrollments
- **URL:** `GET /enroll/my-enrollments`
- **Access:** Private / Student
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [ /* array of enrollment objects populated with courses */ ]
  }
  ```

---

## 7. Quizzes (`/quizzes`)

### 7.1 Get Quiz For Lesson
- **URL:** `GET /lessons/:lessonId/quiz`
- **Access:** Private
- **Request Body:** None
- **Response (200 OK):**
  *(Correct answers are stripped out if the requesting user is a student or parent)*
  ```json
  {
    "success": true,
    "data": {
      "lesson": "lesson_id",
      "passingScore": 70,
      "questions": [
        {
          "_id": "question_id_1",
          "questionText": "What is 2+2?",
          "options": [
            { "text": "3" },
            { "text": "4" }
          ]
        }
      ]
    }
  }
  ```

### 7.2 Submit Quiz Attempt
- **URL:** `POST /quizzes/:id/attempt`
- **Access:** Private / Student
- **Request Body:**
  ```json
  {
    "answers": [
      {
        "questionId": "question_id_1",
        "selectedOptionText": "4"
      }
    ]
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "score": 100,
      "passed": true,
      "answers": [
        {
          "question": "question_id_1",
          "selectedOptionText": "4",
          "isCorrect": true
        }
      ]
    }
  }
  ```

---

## 8. Assignments (`/assignments` & `/courses/:courseId/assignments`)

### 8.1 Create Assignment
- **URL:** `POST /courses/:courseId/assignments`
- **Access:** Private / Teacher or Admin
- **Request Body:**
  ```json
  {
    "title": "Math Homework 1",
    "description": "Complete page 5.",
    "dueDate": "2024-12-01T23:59:00.000Z"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* assignment object */ }
  }
  ```

### 8.2 Submit Assignment
- **URL:** `POST /assignments/:id/submit`
- **Access:** Private / Student
- **Request Body:**
  ```json
  {
    "files": [
      {
        "name": "homework1.pdf",
        "url": "http://example.com/homework1.pdf"
      }
    ]
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "student": "student_id",
      "assignment": "assignment_id",
      "status": "submitted"
    }
  }
  ```

---

## 9. Achievements / Gamification (`/achievements`)

### 9.1 Create Achievement
- **URL:** `POST /achievements`
- **Access:** Private / Admin
- **Request Body:**
  ```json
  {
    "title": "Math Whiz",
    "description": "Scored 100% on a math quiz",
    "pointsRequired": 50,
    "badgeIcon": "http://example.com/badge.png"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* achievement object */ }
  }
  ```

### 9.2 Get My Rewards
- **URL:** `GET /achievements/my-rewards`
- **Access:** Private / Student
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "achievement": { /* populated achievement details */ },
        "earnedAt": "2024-03-12T10:00:00Z"
      }
    ]
  }
  ```

---

## 10. Notifications (`/notifications`)

### 10.1 Get Notifications
- **URL:** `GET /notifications`
- **Access:** Private
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 5,
    "data": [ /* notification objects */ ]
  }
  ```

### 10.2 Mark As Read
- **URL:** `PUT /notifications/:id/read`
- **Access:** Private
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "title": "New Lesson Added",
      "readStatus": true
    }
  }
  ```

---

## 11. Live Classes (`/live-classes`)

### 11.1 Schedule Class
- **URL:** `POST /live-classes`
- **Access:** Private / Teacher or Admin
- **Request Body:**
  ```json
  {
    "title": "Live Math Q&A",
    "course": "course_id",
    "meetingLink": "https://zoom.us/j/123456789",
    "startTime": "2024-04-01T15:00:00.000Z",
    "duration": 60
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* live class object */ }
  }
  ```

---

## 12. Certificates (`/certificates`)

### 12.1 Issue Certificate
- **URL:** `POST /certificates`
- **Access:** Private / Admin
- **Request Body:**
  ```json
  {
    "student": "student_id",
    "course": "course_id",
    "certificateUrl": "http://example.com/cert/123.pdf"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": { /* certificate object */ }
  }
  ```

### 12.2 Get My Certificates
- **URL:** `GET /certificates`
- **Access:** Private / Student
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [ /* array of certificates */ ]
  }
  ```

---

## 13. Admin Analytics (`/admin/analytics`)

### 13.1 Get Analytics
- **URL:** `GET /admin/analytics`
- **Access:** Private / Admin
- **Request Body:** None
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "totalUsers": 120,
      "totalStudents": 100,
      "totalCourses": 15,
      "revenue": 750,
      "quizSuccessRate": "85.00%"
    }
  }
  ```
