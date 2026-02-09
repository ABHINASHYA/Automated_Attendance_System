import User from "../models/user.model.js";
import {
  hashPassword,
  comparePassword,
  generateToken
} from "../helpers/auth.helper.js";


// ================= REGISTER =================
export const registerService = async ({
  fullName,
  email,
  password,
  schoolName,
  role,
  subjectName,
  gender
}) => {

  // 🔴 password is now plain text
  const hashedPassword = await hashPassword(password);

  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  if (role === "Principal") {
    const existingPrincipal = await User.findOne({
      schoolName,
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



// ================= LOGIN =================
export const loginService = async ({ email, password }) => {

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // 🔴 password is now plain text
  const isMatch = await comparePassword(password, user.password);

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



// ================= PROFILE =================
export const profileService = async (user) => {
  return {
    message: "User profile fetched successfully",
    user
  };
};


// ================= LOGOUT =================
export const logoutService = async () => {
  return { message: "Logout successful" };
};


// ================= CHANGE PASSWORD =================
export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // 🔴 plain text compare
  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedNewPassword = await hashPassword(newPassword);

  user.password = hashedNewPassword;
  await user.save();

  return { message: "Password changed successfully" };
};



// ================= TEACHERS =================
export const getAllTeachersService = async (schoolName) => {
  return await User.find({
    role: { $ne: "Principal" },
    schoolName
  }).select("-password");
};


export const updateTeacherStatusService = async (id, status) => {
  const teacher = await User.findById(id);
  if (!teacher) throw new Error("Teacher not found");

  teacher.status = status;
  await teacher.save();

  return { message: "Status updated", teacher };
};

export const removeTeacherService = async (id) => {
  const teacher = await User.findById(id);
  if (!teacher) throw new Error("Teacher not found");

  await User.findByIdAndDelete(id);

  return { message: "Teacher removed successfully" };
};
