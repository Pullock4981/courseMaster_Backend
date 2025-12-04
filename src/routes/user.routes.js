const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// admin only
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);

module.exports = router;
