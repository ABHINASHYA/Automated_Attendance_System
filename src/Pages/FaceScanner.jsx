import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceScanner = ({ onClose }) => {
	const videoRef = useRef(null);
	const [loading, setLoading] = useState(true);

	// Stop camera instantly
	const stopCamera = () => {
		if (videoRef.current?.srcObject) {
			videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
		}
	};

	// Load face-api models
	const loadModels = async () => {
		try {
			const MODEL_URL = "/models/";

			await Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
			]);

			setLoading(false);
		} catch (err) {
			console.error("Error loading face-api models:", err);
			setLoading(false);
		}
	};

	// Start webcam streaming
	const startCamera = async () => {
		try {
			if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
				throw new Error("getUserMedia not supported in this browser");
			}
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				await videoRef.current.play().catch(() => { });
			}
		} catch (err) {
			console.error("Error starting camera:", err);
			alert("Unable to access camera. Check permissions.");
		}
	};

	useEffect(() => {
		loadModels().then(() => startCamera());

		// Cleanup when component unmounts
		return () => {
			stopCamera();
		};
	}, []);

	// Detect face
	const detectFace = async () => {
		try {
			if (!videoRef.current) {
				alert("Video not ready");
				return;
			}

			const options = new faceapi.TinyFaceDetectorOptions();
			const detection = await faceapi.detectSingleFace(videoRef.current, options);

			if (detection) {
				alert("Face Detected Successfully!");
			} else {
				alert("No Face Detected — Try Again");
			}
		} catch (err) {
			console.error("Face detection error:", err);
			alert("Face detection failed. Check console for details.");
		}
	};

	return (
		<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
			<div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
				<h2 className="text-xl font-semibold text-center mb-4">Face Scanner</h2>

				{loading ? (
					<p className="text-center text-gray-600">Loading AI Models...</p>
				) : (
					<>
						<video
							ref={videoRef}
							autoPlay
							muted
							width="350"
							height="250"
							className="rounded-lg border mb-4"
						/>

						<button
							onClick={detectFace}
							className="bg-green-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-green-700 mb-3"
						>
							Scan Face
						</button>
					</>
				)}

				{/* Updated close button */}
				<button
					onClick={() => {
						stopCamera(); // stop immediately
						onClose();    // close modal
					}}
					className="bg-red-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-red-600"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default FaceScanner;
