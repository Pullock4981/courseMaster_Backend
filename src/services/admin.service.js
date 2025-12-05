// service to handle admin-related operations

const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const User = require("../models/User");

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

// Get analytics data for dashboard
const getAnalytics = async () => {
  // Get enrollments grouped by date (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const enrollments = await Enrollment.find({
    createdAt: { $gte: thirtyDaysAgo }
  }).sort({ createdAt: 1 });

  // Group by date
  const enrollmentData = {};
  enrollments.forEach(enrollment => {
    const date = enrollment.createdAt.toISOString().split('T')[0];
    enrollmentData[date] = (enrollmentData[date] || 0) + 1;
  });

  // Convert to array format for chart (last 30 days)
  const chartData = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const dateStr = date.toISOString().split('T')[0];

    // Format date for display (e.g., "Jan 15")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const displayDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;

    chartData.push({
      date: dateStr,
      displayDate: displayDate,
      enrollments: enrollmentData[dateStr] || 0
    });
  }

  // Get total stats
  const totalEnrollments = await Enrollment.countDocuments();
  const totalCourses = await Course.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalInstructors = await User.countDocuments({ role: "admin" }); // Assuming admins are instructors

  // Get enrollments by course (top 5)
  const enrollmentsByCourse = await Enrollment.aggregate([
    {
      $group: {
        _id: "$course",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: 5
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "courseInfo"
      }
    },
    {
      $unwind: "$courseInfo"
    },
    {
      $project: {
        courseName: "$courseInfo.title",
        enrollments: "$count"
      }
    }
  ]);

  return {
    chartData,
    enrollmentsByCourse,
    stats: {
      totalEnrollments,
      totalCourses,
      totalStudents,
      totalInstructors,
      enrollmentsLast30Days: enrollments.length
    }
  };
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getEnrollments,
  getAssignments,
  reviewAssignment,
  getAnalytics,
};
