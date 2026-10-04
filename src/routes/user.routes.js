const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// admin only
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);
router.patch("/:id/role", authMiddleware, adminMiddleware, userController.updateUserRole);
router.patch("/:id/ban", authMiddleware, adminMiddleware, userController.toggleBanUser);

module.exports = router;
