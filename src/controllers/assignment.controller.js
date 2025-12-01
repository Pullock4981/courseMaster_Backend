const assignmentService = require("../services/assignment.service");

const submitAssignment = async (req, res) => {
  try {
    const data = await assignmentService.submitAssignment(req.user.id, req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const mySubmissions = async (req, res) => {
  try {
    const data = await assignmentService.getMySubmissions(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { submitAssignment, mySubmissions };
