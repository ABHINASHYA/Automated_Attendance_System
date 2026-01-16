import express from "express";
import {
  createStudent,
  getStudentsByClass,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Create student (class-wise)
router.post("/create", authMiddleware, createStudent);

// ✅ Get students of a specific class ONLY
router.get("/class/:classId", authMiddleware, getStudentsByClass);

// Update student
router.put("/:studentId", authMiddleware, updateStudent);

// Delete student
router.delete("/:studentId", authMiddleware, deleteStudent);

export default router;
