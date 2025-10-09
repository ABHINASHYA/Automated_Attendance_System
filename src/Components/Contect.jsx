import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		state: "",
		message: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		emailjs
			.send(
				"service_j1l50rd", // Replace with your EmailJS Service ID
				"template_dyp4eo2", // Replace with your Template ID
				formData,
				"aoBo-MH-zmqzEkIno" // Replace with your Public Key
			)
			.then(
				(result) => {
					console.log(result.text);
					alert("✅ Message sent successfully!");
				},
				(error) => {
					console.log(error.text);
					alert("❌ Something went wrong. Try again!");
				}
			);

		setFormData({
			name: "",
			email: "",
			phone: "",
			state: "",
			message: "",
		});
	};

	return (
		<div className="bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-400 min-h-screen flex items-center justify-center px-6 py-16">
			<div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
				{/* Left Section */}
				<div className="md:w-1/2 p-10 text-white">
					<h1 className="text-4xl font-bold mb-6 border-b-2 border-cyan-400 inline-block pb-2">
						Get In Touch
					</h1>
					<p className="text-gray-100 mb-6 leading-relaxed">
						Have questions about our <b>Automated Attendance System</b>?
						We’re here to help you integrate, troubleshoot, and enhance your institution’s attendance process.
						<br />
						You can also call us on:
					</p>

					<p className="mb-3">
						<b>📞 Contact Us:</b>{" "}
						<a href="tel:08084532602" className="text-cyan-300 hover:underline">
							+91-8084532602
						</a>
					</p>
					<p className="mb-6">
						<b>🛠 Technical Support:</b>{" "}
						<a href="mailto:abhinashkumarshb7@gmail.com" className="text-cyan-300 hover:underline">
							abhinashkumarshb7@gmail.com
						</a>
					</p>

					<p className="text-sm mb-10 text-gray-200">
						Available Mon - Sat between 9:30 AM to 6:30 PM
					</p>

					<h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
					<p className="text-gray-100">
						We aim to simplify attendance tracking with automation and accuracy
						reducing manual errors and saving valuable time for teachers and administrators.

					</p>
				</div>

				{/* Right Section - Contact Form */}
				<form
					onSubmit={handleSubmit}
					className="md:w-1/2 bg-white text-gray-800 p-10"
				>
					<h2 className="text-3xl font-semibold text-blue-800 mb-6">
						Send us a Message
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block mb-1 text-sm font-medium text-gray-700">
								Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-gray-700">
								State
							</label>
							<select
								name="state"
								value={formData.state}
								onChange={handleChange}
								required
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
							>
								<option value="">Select a state</option>
								{[
									"Andhra Pradesh",
									"Arunachal Pradesh",
									"Assam",
									"Bihar",
									"Chhattisgarh",
									"Goa",
									"Gujarat",
									"Haryana",
									"Himachal Pradesh",
									"Jharkhand",
									"Karnataka",
									"Kerala",
									"Madhya Pradesh",
									"Maharashtra",
									"Manipur",
									"Meghalaya",
									"Mizoram",
									"Nagaland",
									"Odisha",
									"Punjab",
									"Rajasthan",
									"Sikkim",
									"Tamil Nadu",
									"Telangana",
									"Tripura",
									"Uttar Pradesh",
									"Uttarakhand",
									"West Bengal",
									"Delhi",
								].map((st) => (
									<option key={st} value={st}>
										{st}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
							/>
						</div>

						<div>
							<label className="block mb-1 text-sm font-medium text-gray-700">
								Mobile Number
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
							/>
						</div>
					</div>

					<div className="mt-4">
						<label className="block mb-1 text-sm font-medium text-gray-700">
							Message
						</label>
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							rows="4"
							required
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>

					<button
						type="submit"
						className="mt-6 w-full bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
					>
						SUBMIT ➤
					</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
