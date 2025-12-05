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
  const submissions = await AssignmentSubmission.find()
    .populate("student", "name email")
    .populate("course", "title syllabus")
    .populate("reviewer", "name")
    .sort({ createdAt: -1 });

  // Add lesson title to each submission
  const submissionsWithLessonTitle = submissions.map((sub) => {
    const submissionObj = sub.toObject();
    let lessonTitle = "Unknown Lesson";

    if (sub.course && sub.course.syllabus) {
      for (const module of sub.course.syllabus) {
        for (const lesson of module.lessons || []) {
          if (String(lesson._id) === String(sub.lessonId)) {
            lessonTitle = lesson.title;
            submissionObj.assignmentPrompt = lesson.assignmentPrompt || "";
            break;
          }
        }
        if (lessonTitle !== "Unknown Lesson") break;
      }
    }

    submissionObj.lessonTitle = lessonTitle;
    return submissionObj;
  });

  return submissionsWithLessonTitle;
};

// review/update an assignment submission (admin)
const reviewAssignment = async (id, payload, adminId) => {
  const { reviewNotes, grade, status } = payload;

  const update = {};
  if (typeof status !== "undefined") update.status = status;
  if (typeof reviewNotes !== "undefined") update.reviewNotes = reviewNotes;
  if (typeof grade !== "undefined") update.grade = grade;
  if (adminId) update.reviewer = adminId;

  const submission = await AssignmentSubmission.findByIdAndUpdate(id, update, { new: true })
    .populate("student", "name email")
    .populate("course", "title")
    .populate("reviewer", "name");

  if (!submission) throw new Error("Submission not found");

  return submission;
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getEnrollments,
  getAssignments,
  reviewAssignment,
};
