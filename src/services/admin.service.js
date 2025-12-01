// service to handle admin-related operations

const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const AssignmentSubmission = require("../models/AssignmentSubmission");

const createCourse = async (payload) => {
  const course = await Course.create(payload);
  return course;
};

const updateCourse = async (id, payload) => {
  const course = await Course.findByIdAndUpdate(id, payload, { new: true });
  if (!course) throw new Error("Course not found");
  return course;
};

const deleteCourse = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  if (!course) throw new Error("Course not found");
  return { message: "Course deleted" };
};

// ✅ NEW: get enrollments (with optional filters)
const getEnrollments = async (query) => {
  const { courseId, batchId } = query;

  const filter = {};
  if (courseId) filter.course = courseId;
  if (batchId) filter.batchId = batchId;

  return Enrollment.find(filter)
    .populate("student", "name email")
    .populate("course", "title instructorName")
    .sort({ createdAt: -1 });
};

// ✅ NEW: get all assignment submissions
const getAssignments = async () => {
  return AssignmentSubmission.find()
    .populate("student", "name email")
    .populate("course", "title")
    .sort({ createdAt: -1 });
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getEnrollments,
  getAssignments,
};
