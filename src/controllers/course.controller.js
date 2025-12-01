// controller for course-related routes

const courseService = require("../services/course.service");

const getCourses = async (req, res) => {
  try {
    const data = await courseService.getCourses(req.query);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getCourses, getCourseById };
