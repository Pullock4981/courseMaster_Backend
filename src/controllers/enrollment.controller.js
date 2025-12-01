const enrollmentService = require("../services/enrollment.service");

const enrollCourse = async (req, res) => {
  try {
    const enrollment = await enrollmentService.enrollCourse(
      req.user.id,
      req.params.courseId,
      req.body.batchId
    );
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const myEnrollments = async (req, res) => {
  try {
    const data = await enrollmentService.getMyEnrollments(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const completeLesson = async (req, res) => {
  try {
    const data = await enrollmentService.completeLesson(
      req.params.enrollId,
      req.body.lessonId
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { enrollCourse, myEnrollments, completeLesson };
