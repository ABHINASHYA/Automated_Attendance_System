import React, { useState } from "react";

const AttendancePage = () => {
	const [showForm, setShowForm] = useState(false);
	const [classList, setClassList] = useState([]);
	const [formData, setFormData] = useState({
		className: "",
		section: "",
		subject: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
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
			{/* Top Header */}
			<h1 className="text-3xl md:text-4xl font-semibold text-blue-900 mb-6 text-center">
				Automate Attendance System
			</h1>

			{/* School Name Input */}
			<input
				type="text"
				placeholder="School name"
				className="border-2 border-gray-400 rounded-xl px-6 py-3 text-xl text-center font-semibold mb-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90"
			/>

			{/* Middle Section */}
			{!showForm && classList.length === 0 && (
				<div className="text-center mt-10">
					<h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">
						Automate attendance system
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

			{/* Class Details Form */}
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

			{/* Class List Section */}
			{classList.length > 0 && !showForm && (
				<div className="mt-12 bg-white/80 rounded-2xl shadow-lg p-8 w-full max-w-3xl">
					<h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
						Added Classes
					</h2>
					<div className="flex flex-col gap-4">
						{classList.map((cls, index) => (
							<div
								key={index}
								className="flex flex-col md:flex-row items-center justify-between border-2 border-gray-400 rounded-lg px-4 py-3 bg-white"
							>
								<p className="text-gray-800 font-semibold text-lg">
									{cls.className}
								</p>
								<p className="text-gray-700">{cls.section}</p>
								<p className="text-gray-700">{cls.subject}</p>
								<button className="mt-2 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
									Enter
								</button>
							</div>
						))}
					</div>

					{/* Add New Class Button */}
					<div className="flex justify-center mt-8">
						<button
							onClick={() => setShowForm(true)}
							className="bg-white border-2 border-gray-700 text-lg px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
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
