// route definitions for admin-related endpoints

const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// course CRUD
router.post("/courses", authMiddleware, adminMiddleware, adminController.createCourse);
router.patch("/courses/:id", authMiddleware, adminMiddleware, adminController.updateCourse);
router.delete("/courses/:id", authMiddleware, adminMiddleware, adminController.deleteCourse);

// ✅ NEW: lists
router.get("/enrollments", authMiddleware, adminMiddleware, adminController.getEnrollments);
router.get("/assignments", authMiddleware, adminMiddleware, adminController.getAssignments);
// review assignment submission
router.patch(
    "/assignments/:id/review",
    authMiddleware,
    adminMiddleware,
    adminController.reviewAssignment
);
// analytics
router.get("/analytics", authMiddleware, adminMiddleware, adminController.getAnalytics);

module.exports = router;
