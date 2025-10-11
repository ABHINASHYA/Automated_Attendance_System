import React, { useState } from "react";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    role: "",
    subject: "",
    gender: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Form Submitted:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-cyan-200 relative overflow-hidden">
      {/* Animated Background Circles */}
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

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 p-10 rounded-2xl shadow-2xl backdrop-blur-lg w-[90%] max-w-lg text-white border border-white/20 mt-5"
      >
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 tracking-wide"
        >
          Teacher Registration 🧑‍🏫
        </motion.h2>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 ${error
              ? "ring-red-500 border-red-500"
              : "focus:ring-cyan-400"
              } transition`}
          />
          {error && (
            <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
          )}

          {/* School Name */}
          <input
            type="text"
            name="schoolName"
            placeholder="School Name"
            value={formData.schoolName}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          >
            <option value="" className="bg-cyan-800">Select Role</option>
            <option value="Principal" className="bg-cyan-800">Principal</option>
            <option value="TGT" className="bg-cyan-800">TGT</option>
            <option value="PGT" className="bg-cyan-800">PGT</option>
          </select>

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-100 outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* Gender */}
          <div className="flex justify-center gap-6 mt-2 text-gray-100">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mt-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition" id="register"
          >
            Register
          </motion.button>
        </motion.form>

        <p className="mt-6 text-sm text-center text-gray-100">
          Already have an account?{" "}
          <span className="text-blue-800 cursor-pointer hover:underline">
            <a href="/login">Login</a>
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
