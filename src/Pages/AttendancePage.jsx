import React, { useState, useEffect } from "react";

const AttendancePage = () => {
	const [showForm, setShowForm] = useState(false);
	const [classList, setClassList] = useState([]);
	const [formData, setFormData] = useState({
		className: "",
		section: "",
		subject: "",
	});
	const [schoolName, setSchoolName] = useState("");

	// Simulated API call (replace later with real one)
	useEffect(() => {
		fetch("/mockData/teacher.json")
			.then((res) => res.json())
			.then((data) => setSchoolName(data.schoolName))
			.catch(() => setSchoolName("My School"));
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.className || !formData.section || !formData.subject) return;
		setClassList([...classList, formData]);
		setFormData({ className: "", section: "", subject: "" });
		setShowForm(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-800 to-cyan-200 flex flex-col items-center py-10 px-4">
			{/* Top Section - School Name */}
			<div className="w-full flex justify-start items-center mb-10">
				<h1 className="text-xl md:text-2xl font-semibold text-white px-6 py-3 rounded-lg shadow-md">
					{schoolName || "Loading..."}
				</h1>
			</div>

			{/* If no class created yet */}
			{!showForm && classList.length === 0 && (
				<div className="flex flex-col items-center mt-20 text-center">
					<h2 className="text-4xl md:text-5xl font-semibold text-[#89ff9b] mb-4">
						Automated Attendance System
					</h2>
					<p className="text-white text-lg mb-8">
						Making attendance faster and smoother using AI-based face detection.
					</p>
					<button
						onClick={() => setShowForm(true)}
						className="bg-white border-2 border-gray-700 text-lg px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
					>
						Create Class
					</button>
				</div>
			)}

			{/* Create Class Form */}
			{showForm && (
				<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm mt-10">
					<h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">
						Class Details
					</h3>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<input
							type="text"
							name="className"
							value={formData.className}
							onChange={handleChange}
							placeholder="Class"
							className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="text"
							name="section"
							value={formData.section}
							onChange={handleChange}
							placeholder="Section"
							className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="text"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							placeholder="Subject"
							className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button
							type="submit"
							className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
						>
							Enter
						</button>
					</form>
				</div>
			)}

			{/* Class List with Headers */}
			{classList.length > 0 && !showForm && (
				<div className="mt-10 bg-white/80 rounded-2xl shadow-lg p-8 w-full max-w-5xl">
					<h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
						Class List
					</h2>

					{/* Header Row */}
					<div className="grid grid-cols-4 md:grid-cols-5 bg-gray-200 rounded-lg py-3 px-4 font-semibold text-gray-700 mb-3 text-center">
						<p>Class</p>
						<p>Section</p>
						<p>Subject</p>
						<p>Action</p>
						<p>Mark Attendance</p>
					</div>

					{/* Data Rows */}
					<div className="flex flex-col gap-3">
						{classList.map((cls, index) => (
							<div
								key={index}
								className="grid grid-cols-4 md:grid-cols-5 items-center border border-gray-300 rounded-lg px-4 py-3 bg-white text-center"
							>
								<p className="font-medium">{cls.className}</p>
								<p>{cls.section}</p>
								<p>{cls.subject}</p>
								<button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
									<a href="AddStudent">
										Enter
									</a>
								</button>
								{/* Placeholder for Face Scanner */}
								<div className="flex justify-center">
									<button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
										Open Scanner
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Add New Class Button */}
					<div className="flex justify-center mt-8">
						<button
							onClick={() => setShowForm(true)}
							className="bg-white border-2 border-gray-700 text-lg px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
						>
							Add New Class
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AttendancePage;
