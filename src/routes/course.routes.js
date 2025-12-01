// route definitions for course-related endpoints

const router = require("express").Router();
const courseController = require("../controllers/course.controller");

router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);

module.exports = router;
