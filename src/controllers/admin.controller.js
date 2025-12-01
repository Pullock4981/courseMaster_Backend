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

module.exports = { createCourse, updateCourse, deleteCourse };
