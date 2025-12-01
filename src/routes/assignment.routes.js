const router = require("express").Router();
const assignmentController = require("../controllers/assignment.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/submit", authMiddleware, assignmentController.submitAssignment);
router.get("/my", authMiddleware, assignmentController.mySubmissions);

module.exports = router;
