// validation schemas for authentication

const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  adminKey: z.string().optional(), // Optional admin registration key
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

module.exports = { registerSchema, loginSchema };
