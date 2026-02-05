import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import axios from "axios";
import toast from "react-hot-toast";

const euclideanDistance = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
};

const ClassAttendanceScanner = ({ classId, token, onClose }) => {

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // 1. open camera FIRST (important)
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });

        if (!mounted) return;

        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // 2. init tf
        await faceapi.tf.setBackend("webgl");
        await faceapi.tf.ready();

        // 3. load models
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

        // 4. load only students of this class
        const res = await axios.get(
          `http://localhost:3000/api/student/class/${classId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const list = res.data.students || [];
        const filtered = list.filter(
          s => Array.isArray(s.faceDescriptor) && s.faceDescriptor.length > 0
        );

        setStudents(filtered);
        setLoading(false);

      } catch (err) {
        console.error(err);
        toast.error("Scanner initialization failed");
      }
    };

    init();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [classId, token]);

  const scanAndMark = async () => {
    if (!students.length) {
      toast.error("No registered faces in this class");
      return;
    }

    try {
      setScanning(true);

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        toast.error("Face not detected");
        setScanning(false);
        return;
      }

      const query = Array.from(detection.descriptor);

      let bestStudent = null;
      let bestDistance = Infinity;

      for (const s of students) {
        const d = euclideanDistance(query, s.faceDescriptor);
        if (d < bestDistance) {
          bestDistance = d;
          bestStudent = s;
        }
      }

      if (!bestStudent || bestDistance > 0.55) {
        toast.error("Face not recognized");
        setScanning(false);
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      await axios.put(
        `http://localhost:3000/api/attendance/toggle/${bestStudent._id}`,
        { classId, date: today },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Marked present: ${bestStudent.name}`);

      setScanning(false);

    } catch (err) {
      console.error(err);
      toast.error("Scan failed");
      setScanning(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

      {/* ✅ SMALL CENTER POPUP */}
      <div className="bg-white rounded-2xl p-4 w-[360px] shadow-2xl flex flex-col items-center">

        <h3 className="font-semibold text-lg mb-2">
          Face Attendance Scanner
        </h3>

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-80 rounded-xl border"
        />

        {loading && (
          <p className="mt-2 text-sm text-gray-600">
            Loading scanner...
          </p>
        )}

        <button
          disabled={loading || scanning}
          onClick={scanAndMark}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {scanning ? "Scanning..." : "Scan & Mark"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-gray-600"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default ClassAttendanceScanner;
