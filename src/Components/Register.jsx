import React, { useState } from "react";

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
		setError(""); // clear error when user starts typing
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match!");
			return;
		}

		console.log("Form Submitted:", formData);
		alert("Registration Successful!");
		// Later: send data to backend (Spring Boot / Firebase)
	};

	return (
		<div
			className="bg-gradient-to-br from-blue-800 to-cyan-200 min-h-screen flex items-center justify-center py-16"
			id="register"
		>
			<div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-10 w-full max-w-lg">
				<h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
					Teacher Registration
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Name */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">Name</label>
						<input
							type="text"
							name="name"
							placeholder="Enter your full name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>

					{/* Email */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">Email</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>

					{/* Password */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">Password</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your Password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>

					{/* Confirm Password */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Enter your Confirm Password"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className={`w-full border ${error ? "border-red-500" : "border-gray-300"
								} rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
						/>
						{error && <p className="text-red-600 text-sm mt-1">{error}</p>}
					</div>

					{/* School Name */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							School Name
						</label>
						<input
							type="text"
							name="schoolName"
							placeholder="Enter your school name"
							value={formData.schoolName}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>

					{/* Teacher Role */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Teacher Role
						</label>
						<select
							name="role"
							value={formData.role}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						>
							<option value="">Select Role</option>
							<option value="Principal">Principal</option>
							<option value="TGT">TGT</option>
						</select>
					</div>

					{/* Subject Name */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">
							Subject Name
						</label>
						<input
							type="text"
							name="subject"
							placeholder="Enter subject name"
							value={formData.subject}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						/>
					</div>

					{/* Gender */}
					<div>
						<label className="block text-gray-700 font-medium mb-2">Gender</label>
						<div className="flex items-center gap-6">
							<label className="flex items-center">
								<input
									type="radio"
									name="gender"
									value="Male"
									onChange={handleChange}
									checked={formData.gender === "Male"}
									className="mr-2"
								/>
								Male
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									name="gender"
									value="Female"
									onChange={handleChange}
									checked={formData.gender === "Female"}
									className="mr-2"
								/>
								Female
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									name="gender"
									value="Other"
									onChange={handleChange}
									checked={formData.gender === "Other"}
									className="mr-2"
								/>
								Other
							</label>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						className="w-full bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-800 transition duration-200"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
