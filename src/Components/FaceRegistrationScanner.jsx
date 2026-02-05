import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import axios from "axios";
import toast from "react-hot-toast";

const FaceRegistrationScanner = ({ studentId, token, onClose }) => {

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {

    let active = true;

    const init = async () => {
      try {

        await faceapi.tf.setBackend("webgl");
        await faceapi.tf.ready();


        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });

        if (!active) return;

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        setLoading(false);

      } catch (err) {
        console.error(err);
        toast.error("Camera or model load failed");
      }
    };

    init();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };

  }, []);

  const captureFace = async () => {
    try {
      setCapturing(true);

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        toast.error("No face detected");
        setCapturing(false);
        return;
      }

      const descriptor = Array.from(detection.descriptor);

      await axios.put(
        `http://localhost:3000/api/student/${studentId}/update-face`,
        { descriptor },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Face registered successfully");

      closeCamera();
      onClose();

    } catch (err) {
      console.error(err);
      toast.error("Face registration failed");
      setCapturing(false);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="rounded-xl w-96 border-4 border-white"
      />

      {loading && (
        <p className="text-white mt-3">Loading camera…</p>
      )}

      <button
        disabled={loading || capturing}
        onClick={captureFace}
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
      >
        {capturing ? "Capturing…" : "Capture Face"}
      </button>

      <button
        onClick={() => {
          closeCamera();
          onClose();
        }}
        className="mt-2 text-white"
      >
        Cancel
      </button>

    </div>
  );
};

export default FaceRegistrationScanner;
