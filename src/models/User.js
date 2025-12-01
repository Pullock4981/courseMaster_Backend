// for user model

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
