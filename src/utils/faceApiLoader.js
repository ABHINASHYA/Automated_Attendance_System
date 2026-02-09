import * as faceapi from "face-api.js";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu"; // 👈 IMPORTANT


let modelsLoaded = false;

export const loadFaceApiModels = async () => {
	if (modelsLoaded) return;

	// 🔥 Force CPU backend (prevents WebGL crashes)
	await tf.setBackend("cpu");
	await tf.ready();

	await Promise.all([
		faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
		faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
		faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
	]);

	modelsLoaded = true;
};
