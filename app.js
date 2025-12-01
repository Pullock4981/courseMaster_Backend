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

module.exports = app;
