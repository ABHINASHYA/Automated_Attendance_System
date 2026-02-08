import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { profile } from "../controllers/auth.controller.js";
import { logout } from "../controllers/auth.controller.js";
import { changePassword } from "../controllers/auth.controller.js";
import { protect as authMiddleware } from "../middleware/auth.middleware.js";
import {
    getAllTeachers,
    updateTeacherStatus,
    removeTeacher,
    updateProfile
} from "../controllers/auth.controller.js";
import { allowPrincipal } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", protect, profile);
router.post("/logout", protect, logout);
router.put("/change-password", authMiddleware, changePassword);
router.get("/get-all-teachers", authMiddleware, allowPrincipal, getAllTeachers);
router.put("/update-teacher-status/:id", authMiddleware, allowPrincipal, updateTeacherStatus);
router.delete("/remove-teacher/:id", authMiddleware, allowPrincipal, removeTeacher);
router.put("/update-profile", authMiddleware, updateProfile);




export default router;
