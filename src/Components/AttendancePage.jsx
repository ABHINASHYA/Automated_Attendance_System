import React, { useState } from "react";

const AttendancePage = () => {
	const [showClassForm, setShowClassForm] = useState(false);
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
		alert(
			`Class: ${formData.className}\nSection: ${formData.section}\nSubject: ${formData.subject}`
		);
	};

	return (
		<div className=" items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-cyan-200 relative overflow-hidden">


			{/* School Name Input */}
			<div className="mb-12">
				<input
					type="text"
					placeholder="School name"
					className="border-2 border-gray-400 rounded-xl px-6 py-3 text-2xl text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			{/* Center Content */}
			<div className="text-center">
				<h2 className="text-3xl font-semibold text-orange-600 mb-4">
					Automate attendance system
				</h2>
				<p className="text-lg text-gray-800 mb-8">
					Making attendance faster and smoother using AI-based face detection.
				</p>

				{/* Create Class Button */}
				<button
					onClick={() => setShowClassForm(!showClassForm)}
					className="bg-white border-2 border-gray-700 text-xl px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
				>
					Create Class
				</button>
			</div>

			{/* Right-side Class Details */}
			{showClassForm && (
				<div className="mt-12 bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
					<h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">
						Class Details
					</h3>
					<form onSubmit={handleSubmit} className="flex flex-col  gap-4">
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
		</div>
	);
};

export default AttendancePage;
