import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import CryptoJS from "crypto-js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    role: "",
    subjectName: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const encryptedPassword = CryptoJS.AES.encrypt(
        formData.password,
        import.meta.env.VITE_SECRET_KEY
      ).toString();

      await axios.post("http://localhost:3000/api/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: encryptedPassword, // ✅ FIXED: was formData.encryptedPassword
        schoolName: formData.schoolName,
        role: formData.role,
        subjectName: formData.subjectName,
        gender: formData.gender,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-cyan-200 relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Background Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-64 h-64 bg-white/20 rounded-full top-10 left-10 blur-3xl"
      ></motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute w-72 h-72 bg-cyan-300/20 rounded-full bottom-10 right-10 blur-3xl"
      ></motion.div>

      {/* Register Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 p-10 rounded-2xl shadow-2xl backdrop-blur-lg w-[90%] max-w-lg text-white border border-white/20 mt-5"
      >
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">
          Teacher Registration 🧑‍🏫
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 ${
              error ? "ring-red-500" : "focus:ring-cyan-400"
            }`}
          />

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
          )}

          {/* School Name */}
          <input
            type="text"
            name="schoolName"
            placeholder="School Name"
            required
            value={formData.schoolName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Role */}
          <select
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Select Role</option>
            <option value="Principal">Principal</option>
            <option value="Teacher">Teacher</option>
          </select>

          {/* Subject */}
          <input
            type="text"
            name="subjectName"
            placeholder="Subject Name"
            required
            value={formData.subjectName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Gender */}
          <div className="flex justify-center gap-6 mt-2 text-gray-200">
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  checked={formData.gender === g}
                  className="accent-cyan-400"
                />
                {g}
              </label>
            ))}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            type="submit"
            disabled={loading}
            className="mt-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-200">
          Already have an account?{" "}
          <a href="/login" className="text-blue-200 underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;