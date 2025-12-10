import User from "../models/user.model.js";
import { hashPassword, comparePassword, generateToken } from "../helpers/auth.helper.js";
import { decryptPassword } from "../helpers/auth.helper.js";


// For Registration
export const registerService = async ({
    fullName,
    email,
    password,
    schoolName,
    role,
    subjectName,
    gender
}) => {
    const originalPassword = decryptPassword(password);
    const hashedPassword = await hashPassword(originalPassword);

    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already registered");

    // ✅ Check if registering as Principal
    if (role === "Principal") {
        // Check if a Principal already exists for this school
        const existingPrincipal = await User.findOne({ 
            schoolName: schoolName, 
            role: "Principal" 
        });
        
        if (existingPrincipal) {
            throw new Error("A Principal already exists for this school");
        }
    }

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        schoolName,
        role,
        subjectName,
        gender,
        // ✅ Principals are auto-approved, Teachers need approval
        status: role === "Principal" ? "Approved" : "Pending"
    });

    return {
        message: "Registration successful",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            schoolName: user.schoolName,
            role: user.role,
            subjectName: user.subjectName,
            gender: user.gender,
            status: user.status
        }
    };
};


// For Login
export const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const originalPassword = decryptPassword(password);
    const isMatch = await comparePassword(originalPassword, user.password);

    if (!isMatch) throw new Error("Invalid credentials");

    const token = generateToken(user._id);

    return {
        message: "Login successful",
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            schoolName: user.schoolName,
            role: user.role,
            status: user.status
        }
    };
};


// For GET All profile detail
export const profileService = async (user) => {
    return {
        message: "User profile fetched successfully",
        user
    };
};

// For Logout
export const logoutService = async () => {
    return {
        message: "Logout successful"
    };
};


// For Changing the password
export const changePasswordService = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // check old password
    const originalOldPassword = decryptPassword(oldPassword);
    const isMatch = await comparePassword(originalOldPassword, user.password);

    if (!isMatch) throw new Error("Old password is incorrect");

    // hash new password
    const originalNewPassword = decryptPassword(newPassword);
    const hashedNewPassword = await hashPassword(originalNewPassword);

    // update
    user.password = hashedNewPassword;
    await user.save();

    return {
        message: "Password changed successfully"
    };
};


// GET all teachers
export const getAllTeachersService = async (schoolName) => {
    return await User.find({
        role: { $ne: "Principal" }, 
        schoolName: schoolName    
    }).select("-password");
};


// Update teacher status
export const updateTeacherStatusService = async (id, status) => {
    const teacher = await User.findById(id);
    if (!teacher) throw new Error("Teacher not found");

    teacher.status = status;
    await teacher.save();

    return { message: "Status updated", teacher };
};

// Delete teacher
export const removeTeacherService = async (id) => {
    const teacher = await User.findById(id);
    if (!teacher) throw new Error("Teacher not found");

    await User.findByIdAndDelete(id);

    return { message: "Teacher removed successfully" };
};