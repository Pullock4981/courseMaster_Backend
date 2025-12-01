// service to handle admin-related operations

const Course = require("../models/Course");

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

module.exports = { createCourse, updateCourse, deleteCourse };
