const User = require("../models/User");

const getAllUsers = async () => {
  return User.find().select("-passwordHash").sort({ createdAt: -1 });
};

module.exports = { getAllUsers };
