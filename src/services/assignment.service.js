const AssignmentSubmission = require("../models/AssignmentSubmission");
const Enrollment = require("../models/Enrollment");

const submitAssignment = async (studentId, payload) => {
  const { courseId, lessonId, answerType, answer } = payload;

  // ensure student enrolled
  const enrolled = await Enrollment.findOne({ student: studentId, course: courseId });
  if (!enrolled) throw new Error("You are not enrolled in this course");

  const submission = await AssignmentSubmission.create({
    student: studentId,
    course: courseId,
    lessonId,
    answerType,
    answer,
  });

  return submission;
};

const getMySubmissions = async (studentId) => {
  return AssignmentSubmission.find({ student: studentId })
    .populate("course", "title")
    .sort({ createdAt: -1 });
};

module.exports = { submitAssignment, getMySubmissions };
