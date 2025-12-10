import express from "express";
// import { authMiddleware } from "../middleware/auth.middleware.js";
import { protect as authMiddleware } from "../middleware/auth.middleware.js";
import {
  createClass,
  getMyClasses,
  getAllClassesInSchool,
  deleteClass,
  updateClass,
  getTeacherClasses
} from "../controllers/class.controller.js";

const router = express.Router();

router.post("/create", authMiddleware, createClass);
router.get("/my-classes", authMiddleware, getMyClasses);
router.get("/school-classes", authMiddleware, getAllClassesInSchool);
router.delete("/:id", authMiddleware, deleteClass);
router.put("/:id", authMiddleware, updateClass);
router.get("/teacher-classes/:id", authMiddleware, getTeacherClasses);


export default router;
