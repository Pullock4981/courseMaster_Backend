// authentication service

const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { sendWelcomeEmail } = require("./email.service");

const register = async ({ name, email, password, adminKey }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);

  // Check if admin key is provided and valid
  let role = "student";
  if (adminKey) {
    const validAdminKey = process.env.ADMIN_REGISTRATION_KEY;
    if (!validAdminKey) {
      throw new Error("Admin registration is not configured");
    }
    if (adminKey !== validAdminKey) {
      throw new Error("Invalid admin registration key");
    }
    role = "admin";
  }

  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
  });

  const token = generateToken({ id: user._id, role: user.role });

  // Send welcome email (non-blocking - don't wait for it)
  sendWelcomeEmail(user.email, user.name).catch(err => {
    console.error('Email sending failed (non-critical):', err.message);
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error("Invalid email or password");

  const token = generateToken({ id: user._id, role: user.role });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const getMe = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash");
  if (!user) throw new Error("User not found");
  return user;
};

module.exports = { register, login, getMe };
