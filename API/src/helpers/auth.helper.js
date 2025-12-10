import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv'

dotenv.config();


export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};



export const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.SECRET_KEY
  );
  return bytes.toString(CryptoJS.enc.Utf8);
};
