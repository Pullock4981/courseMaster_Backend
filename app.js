const express = require("express");
const cors = require("cors");
// importing auth routes
const authRoutes = require("./src/routes/auth.routes");
// importing course routes
const courseRoutes = require("./src/routes/course.routes");
// importing admin routes
const adminRoutes = require("./src/routes/admin.routes");
// importing enrollment routes
const enrollmentRoutes = require("./src/routes/enrollment.routes");
// importing assignment routes
const assignmentRoutes = require("./src/routes/assignment.routes");
// importing quiz routes
const quizRoutes = require("./src/routes/quiz.routes");
// importing error handling middleware
const errorHandler = require("./src/middlewares/errorMiddleware");

const connectDB = require("./src/config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Course Master Backend Running ✅");
});

// mounting auth routes
app.use("/api/auth", authRoutes);
// mounting course routes
app.use("/api/courses", courseRoutes);
// mounting admin routes
app.use("/api/admin", adminRoutes);
// mounting enrollment routes
app.use("/api/enrollments", enrollmentRoutes);
// mounting assignment routes
app.use("/api/assignments", assignmentRoutes);
// mounting quiz routes
app.use("/api/quizzes", quizRoutes);

// 404 handler (unknown routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// global error handling middleware
app.use(errorHandler);

module.exports = app;
