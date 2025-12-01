const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Course Master Backend Running ✅");
});

module.exports = app;
