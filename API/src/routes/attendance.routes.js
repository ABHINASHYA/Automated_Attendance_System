import express from "express";
import * as controller from "../controllers/attendance.controller.js";
import protect from "../middleware/auth.middleware.js";
import { getAttendanceByStudent } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/mark", protect, controller.markAttendance);
router.put("/toggle/:studentId", protect, controller.toggleAttendance);
router.get("/class/:classId", protect, controller.getAttendanceByClass);

router.get(
  "/student/:studentId",
  protect,
  getAttendanceByStudent
);

export default router;