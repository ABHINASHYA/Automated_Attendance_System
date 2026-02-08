import { loginService, registerService } from "../services/auth.service.js";
import { profileService } from "../services/auth.service.js";
import { logoutService } from "../services/auth.service.js";
import { changePasswordService } from "../services/auth.service.js";

import {
    getAllTeachersService,
    updateTeacherStatusService,
    removeTeacherService,
} from "../services/auth.service.js";

//For Register
export const register = async (req, res) => {
    try {
        const data = await registerService(req.body);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

//For Login
export const login = async (req, res) => {
    try {
        const data = await loginService(req.body);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};


//For Profile
export const profile = async (req, res) => {
    try {
        const data = await profileService(req.user);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

//For Logout
export const logout = async (req, res) => {
    try {
        const data = await logoutService();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};


//Changing the password
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: "Both old and new password are required" });
        }

        const data = await changePasswordService(req.user._id, oldPassword, newPassword);

        return res.status(200).json(data);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};




// GET all teachers
export const getAllTeachers = async (req, res) => {
    try {
        // Logged in user's school
        const school = req.user.schoolName; 
        const teachers = await getAllTeachersService(school);
        res.status(200).json({ teachers });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// UPDATE teacher status
export const updateTeacherStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const result = await updateTeacherStatusService(req.params.id, status);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// REMOVE teacher
export const removeTeacher = async (req, res) => {
    try {
        const result = await removeTeacherService(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




// for profile update


import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { fullName, email, schoolName, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        schoolName,
        gender
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
