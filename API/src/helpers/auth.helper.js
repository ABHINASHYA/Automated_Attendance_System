import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ================= HASH PASSWORD =================
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// ================= COMPARE PASSWORD =================
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// ================= GENERATE JWT TOKEN =================
export const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};
