// routes for authentication

const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validators/auth.validation");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authMiddleware, authController.me);

module.exports = router;
