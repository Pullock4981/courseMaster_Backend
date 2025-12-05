const router = require("express").Router();
const quizController = require("../controllers/quiz.controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/submit", authMiddleware, quizController.submitQuiz);
router.get("/my", authMiddleware, quizController.myQuizSubmissions);
router.get("/stats", authMiddleware, quizController.getQuizStats);

module.exports = router;
