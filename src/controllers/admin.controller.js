// controller for admin-related operations

const adminService = require("../services/admin.service");

const createCourse = async (req, res) => {
  try {
    const course = await adminService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await adminService.updateCourse(req.params.id, req.body);
    res.json(course);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const data = await adminService.deleteCourse(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ✅ NEW: enrollments list
const getEnrollments = async (req, res) => {
  try {
    const data = await adminService.getEnrollments(req.query);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ NEW: assignments list
const getAssignments = async (req, res) => {
  try {
    const data = await adminService.getAssignments();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// review an assignment submission
const reviewAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await adminService.reviewAssignment(id, req.body, req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourse,
  getEnrollments,
  getAssignments,
  reviewAssignment,
};
