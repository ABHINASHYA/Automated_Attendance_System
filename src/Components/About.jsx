import React from "react";
import faceRecog from '../assets/faceRecog.png'

const About = () => {
	return (
		<div
			className="bg-gradient-to-br from-blue-800 to-cyan-200 min-h-[70vh] flex items-center justify-center py-16"
			id="about"
		>
			<div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">

				{/* Left Section - Text */}
				<div className="md:w-1/2 text-center md:text-left">
					<h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
						About Our Automated Attendance System
					</h2>
					<p className="text-gray-700 leading-relaxed mb-4">
						The <span className="font-semibold text-blue-600">Automated Attendance System</span> is designed to simplify and digitize the attendance process using
						<span className="font-semibold"> AI-powered face recognition</span> and smart data management. It eliminates the need for manual attendance tracking and provides accurate, real-time attendance records for institutions and workplaces.
					</p>
					<p className="text-gray-700 leading-relaxed mb-4">
						Teachers and administrators can monitor student or employee attendance through a centralized dashboard.
						The system ensures transparency, reduces human error, and saves time by automatically marking and storing attendance in a secure cloud-based database.
					</p>
					<p className="text-gray-700 leading-relaxed">
						With this solution, institutions can focus more on productivity and less on paperwork — bringing technology-driven efficiency to everyday operations.
					</p>
				</div>

				{/* Right Section - Image */}
				<div className="md:w-1/2 flex justify-center">
					<img
						src={faceRecog}
						alt="Automated Attendance Illustration"
						className="w-80 md:w-96 drop-shadow-lg rounded-xl"
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
