import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import axios from "axios";
import toast from "react-hot-toast";

const AutoAttendanceScanner = ({ classId, token, onClose }) => {
	const videoRef = useRef(null);
	const scanningRef = useRef(false);
	const intervalRef = useRef(null);

	const [loading, setLoading] = useState(true);

	// 🔒 Stop camera safely
	const stopCamera = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);

		if (videoRef.current?.srcObject) {
			videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
		}
	};

	// Load face-api model
	const loadModels = async () => {
		await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
	};

	// Start camera ONLY when videoRef is ready
	const startCamera = async () => {
		// ⏳ wait until ref exists
		while (!videoRef.current) {
			await new Promise((r) => setTimeout(r, 50));
		}

		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		videoRef.current.srcObject = stream;
		await videoRef.current.play();
	};

	useEffect(() => {
		const init = async () => {
			try {
				await loadModels();
				await startCamera();
				setLoading(false);
				startAutoScan();
			} catch (err) {
				console.error(err);
				toast.error("Camera or model failed");
			}
		};

		init();

		return stopCamera;
	}, []);

	// 🔁 Auto scan loop
	const startAutoScan = () => {
		intervalRef.current = setInterval(async () => {
			if (!videoRef.current || scanningRef.current) return;

			const detection = await faceapi.detectSingleFace(
				videoRef.current,
				new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.6 })
			);

			if (detection) {
				scanningRef.current = true;
				await markAttendance();
				scanningRef.current = false;
			}
		}, 2000);
	};

	// 🎯 Attendance API
	const markAttendance = async () => {
		try {
			await axios.post(
				"http://localhost:3000/api/attendance/mark",
				{ classId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			toast.success("Attendance marked");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
			<div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
				<h2 className="text-xl font-semibold text-center mb-4">
					Attendance Scanner
				</h2>

				{loading && (
					<p className="text-center text-gray-600">Starting camera...</p>
				)}

				<video
					ref={videoRef}
					autoPlay
					muted
					width="350"
					height="250"
					className="rounded-lg border mb-4"
				/>

				<button
					onClick={() => {
						stopCamera();
						onClose();
					}}
					className="bg-red-500 text-white w-full py-2 rounded-lg font-semibold"
				>
					Stop Scanner
				</button>
			</div>
		</div>
	);
};

export default AutoAttendanceScanner;
