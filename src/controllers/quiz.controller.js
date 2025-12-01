const quizService = require("../services/quiz.service");

const submitQuiz = async (req, res) => {
  try {
    const result = await quizService.submitQuiz(req.user.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { submitQuiz };
