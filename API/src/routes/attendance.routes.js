import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  toggleAttendance,
  getAttendanceByClass,
  getAttendanceByStudent,
  markPresentByFace
} from "../controllers/attendance.controller.js";

const router = express.Router();

/* manual toggle (button) */
router.put(
  "/toggle/:studentId",
  protect,
  toggleAttendance
);

/* face scanner (present only) */
router.post(
  "/mark-present",
  protect,
  markPresentByFace
);

/* class attendance */
router.get(
  "/class/:classId",
  protect,
  getAttendanceByClass
);

/* student attendance history */
router.get(
  "/student/:studentId",
  protect,
  getAttendanceByStudent
);

export default router;
