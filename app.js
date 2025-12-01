const express = require("express");
const cors = require("cors");
// importing auth routes
const authRoutes = require("./src/routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Course Master Backend Running ✅");
});

// mounting auth routes
app.use("/api/auth", authRoutes);

module.exports = app;
