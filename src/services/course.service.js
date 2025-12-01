// service to handle course-related operations

const Course = require("../models/Course");

const getCourses = async (query) => {
  const {
    page = 1,
    limit = 8,
    search = "",
    sort = "",
    category,
    tags,
  } = query;

  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { instructorName: { $regex: search, $options: "i" } },
    ];
  }

  if (category) filter.category = category;

  if (tags) {
    const tagArray = tags.split(","); // "mern,react"
    filter.tags = { $in: tagArray };
  }

  let sortObj = {};
  if (sort === "price_asc") sortObj.price = 1;
  if (sort === "price_desc") sortObj.price = -1;

  const skip = (Number(page) - 1) * Number(limit);

  const [courses, total] = await Promise.all([
    Course.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit)),
    Course.countDocuments(filter),
  ]);

  return {
    courses,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  };
};

const getCourseById = async (id) => {
  const course = await Course.findById(id);
  if (!course) throw new Error("Course not found");
  return course;
};

module.exports = { getCourses, getCourseById };
