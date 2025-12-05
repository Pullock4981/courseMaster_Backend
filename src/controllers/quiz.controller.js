const quizService = require("../services/quiz.service");

const submitQuiz = async (req, res) => {
  try {
    const result = await quizService.submitQuiz(req.user.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const myQuizSubmissions = async (req, res) => {
  try {
    const { courseId } = req.query;
    const data = await quizService.getMyQuizSubmissions(req.user.id, courseId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getQuizStats = async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }
    const data = await quizService.getQuizStats(req.user.id, courseId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { submitQuiz, myQuizSubmissions, getQuizStats };
