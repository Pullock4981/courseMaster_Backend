const router = require("express").Router();
const quizController = require("../controllers/quiz.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/submit", authMiddleware, quizController.submitQuiz);

module.exports = router;
