# CourseMaster - Backend API

A RESTful API for the CourseMaster E-learning platform built with Node.js, Express, and MongoDB.

Backend live link: https://vercel.com/syed-ashik-mahmud-pullocks-projects/course-master-backend

Video Link: https://drive.google.com/file/d/1vjMrBxr0-7xqjxMX2EBEBw30D_av1pOu/view

Admin email: admin@coursemaster.com
Pass: admin123

## Project Name & Description

**CourseMaster Backend** provides a comprehensive RESTful API for managing an E-learning platform. It handles authentication, course management, enrollments, assignments, quizzes, and administrative operations. The backend is built with Node.js and Express.js, using MongoDB for data storage and JWT for authentication.

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Input validation

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd courseMaster_Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory (see `.env.example`)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Start the production server:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example` for reference):

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/coursemaster

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Registration Key (Optional - for admin account creation)
ADMIN_REGISTRATION_KEY=your-secret-admin-key-here

# Node Environment
NODE_ENV=development

# Email Configuration (Optional - for welcome emails)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173
```

**Required Variables:**
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret key for JWT token generation (required)

**Optional Variables:**
- `NODE_ENV` - Environment mode (development/production)
- `ADMIN_REGISTRATION_KEY` - Secret key for admin account registration (optional)
  - If set, users can register as admin by providing this key during registration
  - If not set, admin registration via key is disabled
  - Admins can still be created manually in the database
- `EMAIL_SERVICE` - Email service provider (gmail, smtp, etc.)
- `EMAIL_USER` - Email address for sending welcome emails
- `EMAIL_PASSWORD` - Email password or app password
- `FRONTEND_URL` - Frontend URL for email links

**Note for Email Setup:**
- For Gmail, you need to:
  1. Enable 2-Factor Authentication
  2. Generate an App Password (not your regular password)
  3. Use the App Password in `EMAIL_PASSWORD`
- If email is not configured, the app will still work but won't send welcome emails

## API Documentation

Base URL: `https://course-master-backend-ochre.vercel.app/api`

### Authentication Endpoints

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "adminKey": "optional-admin-key" 
  }
  ```
- **Response:** User object with token
- **Note:** 
  - By default, users are registered as "student"
  - To register as "admin", provide a valid `adminKey` that matches `ADMIN_REGISTRATION_KEY` in environment variables
  - If invalid admin key is provided, registration will fail

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** User object with token

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User object

### Course Endpoints (Public)

#### Get All Courses
- **GET** `/api/courses`
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 8)
  - `search` - Search by title or instructor
  - `sort` - Sort by price: `price_asc` or `price_desc`
  - `category` - Filter by category
  - `tags` - Filter by tags (comma-separated)
- **Response:** Paginated courses list

#### Get Course by ID
- **GET** `/api/courses/:id`
- **Response:** Course object with full details

### Enrollment Endpoints (Protected - Student)

#### Enroll in Course
- **POST** `/api/enrollments/:courseId`
- **Headers:** `Authorization: Bearer <token>`
- **Body (optional):**
  ```json
  {
    "batchId": "batch-id-here"
  }
  ```
- **Response:** Enrollment object

#### Get My Enrollments
- **GET** `/api/enrollments/my`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of enrollment objects

#### Mark Lesson as Complete
- **PATCH** `/api/enrollments/:enrollId/complete-lesson`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "lessonId": "lesson-id-here"
  }
  ```
- **Response:** Updated enrollment object

### Assignment Endpoints (Protected - Student)

#### Submit Assignment
- **POST** `/api/assignments/submit`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "courseId": "course-id",
    "lessonId": "lesson-id",
    "answer": "Answer text or Google Drive link",
    "answerType": "text" // or "link"
  }
  ```
- **Response:** Assignment submission object

#### Get My Submissions
- **GET** `/api/assignments/my`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of assignment submissions

### Quiz Endpoints (Protected - Student)

#### Submit Quiz
- **POST** `/api/quizzes/submit`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "courseId": "course-id",
    "lessonId": "lesson-id",
    "answers": [0, 1, 2, 0] // Array of selected option indices
  }
  ```
- **Response:**
  ```json
  {
    "total": 4,
    "score": 3,
    "percent": 75
  }
  ```

### Admin Endpoints (Protected - Admin Only)

#### Create Course
- **POST** `/api/admin/courses`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** See Course Schema below
- **Response:** Created course object

#### Update Course
- **PATCH** `/api/admin/courses/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Course fields to update
- **Response:** Updated course object

#### Delete Course
- **DELETE** `/api/admin/courses/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Success message

#### Get All Enrollments
- **GET** `/api/admin/enrollments`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `courseId` - Filter by course
  - `batchId` - Filter by batch
- **Response:** Array of enrollment objects

#### Get All Assignments
- **GET** `/api/admin/assignments`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of assignment submissions

#### Get Analytics
- **GET** `/api/admin/analytics`
- **Headers:** `Authorization: Bearer <token>` (Admin only)
- **Response:** Analytics data including:
  - Chart data for enrollments over last 30 days
  - Top courses by enrollments
  - Platform statistics (total enrollments, courses, students, instructors)

#### Review Assignment
- **PATCH** `/api/admin/assignments/:id/review`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "reviewed",
    "reviewNotes": "Great work!",
    "grade": 95
  }
  ```
- **Response:** Updated assignment submission

## Data Models

### Course Schema
```javascript
{
  title: String (required, indexed),
  description: String (required),
  instructorName: String (required, indexed),
  price: Number (required),
  category: String (indexed),
  tags: [String] (indexed),
  syllabus: [{
    title: String (required),
    lessons: [{
      title: String (required),
      videoUrl: String (required),
      assignmentPrompt: String,
      quiz: [{
        question: String,
        options: [String],
        correctIndex: Number
      }]
    }]
  }],
  batches: [{
    name: String,
    startDate: Date
  }]
}
```

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  passwordHash: String (required),
  role: String (enum: ["student", "admin"], default: "student")
}
```

### Enrollment Schema
```javascript
{
  student: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  batchId: ObjectId,
  progress: {
    completedLessons: [ObjectId],
    percent: Number (default: 0)
  }
}
```

## Error Handling

All errors follow this format:
```json
{
  "message": "Error message here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Bonus Features

### Email Notifications
- Welcome emails are automatically sent to new users upon registration
- Uses Nodemailer for email delivery
- Configure email settings in `.env` file
- Email sending is non-blocking (won't fail registration if email fails)

### Analytics Dashboard
- Admin analytics dashboard with enrollment trends
- Charts showing enrollments over the last 30 days
- Top courses by enrollment statistics
- Platform-wide statistics (total enrollments, courses, students, instructors)
- Accessible at `/admin/analytics` (admin only)

## Admin Registration

Admins can be created in two ways:

1. **Registration Key Method (Recommended)**:
   - Set `ADMIN_REGISTRATION_KEY` in your `.env` file
   - During registration, provide the admin key in the registration form
   - If the key matches, the user will be created as "admin"
   - If the key is invalid or missing, registration will fail or create a student account

2. **Manual Database Method**:
   - Create admin users directly in the database
   - Set the `role` field to "admin" in the User document

**Note**: If `ADMIN_REGISTRATION_KEY` is not set in `.env`, admin registration via key is disabled for security.

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Admin-only routes with role checking
- Admin registration key protection
- Input validation with Zod
- CORS enabled

## Database Indexing

The following fields are indexed for performance:
- Course: `title`, `instructorName`, `category`, `tags`
- Enrollment: `{student: 1, course: 1}` (unique compound index)

## Deployment

The backend is deployed on **Vercel**. Make sure to set all environment variables in your deployment platform.

## Development

- Development server runs on `http://localhost:5000` (default)
- Uses `nodemon` for auto-restart during development
- MongoDB connection is handled via Mongoose

