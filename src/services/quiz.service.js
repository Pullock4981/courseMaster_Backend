const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const submitQuiz = async (studentId, payload) => {
  const { courseId, lessonId, answers } = payload; 
  // answers = [selectedIndex, selectedIndex, ...]

  const enrolled = await Enrollment.findOne({ student: studentId, course: courseId });
  if (!enrolled) throw new Error("You are not enrolled in this course");

  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  // find lesson quiz
  let quiz = null;
  for (const mod of course.syllabus) {
    const lesson = mod.lessons.id(lessonId);
    if (lesson) {
      quiz = lesson.quiz || [];
      break;
    }
  }
  if (!quiz) throw new Error("Lesson not found");
  if (quiz.length === 0) throw new Error("No quiz in this lesson");

  let score = 0;
  quiz.forEach((q, i) => {
    if (answers[i] === q.correctIndex) score++;
  });

  return {
    total: quiz.length,
    score,
    percent: Math.round((score / quiz.length) * 100),
  };
};

module.exports = { submitQuiz };
