import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAttendanceModal = ({ student, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!student) return;

    const load = async () => {
      try {
        const res = await axios.get(
          `https://inclass-dnhc.onrender.com/api/attendance/student/${student._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecords(res.data.attendance || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [student]);

  const totalPresent = records.filter(
    (r) => r.status === "Present"
  ).length;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <h2 className="text-lg font-bold mb-1">
          Attendance – {student.name}
        </h2>

        <p className="text-sm mb-3">
          Total Present : <b>{totalPresent}</b>
        </p>

        <div className="border rounded-md max-h-72 overflow-y-auto">

          <div className="grid grid-cols-2 font-semibold bg-gray-100 px-3 py-2">
            <span>Date</span>
            <span>Status</span>
          </div>

          {loading && (
            <div className="p-3 text-center">Loading...</div>
          )}

          {!loading && records.length === 0 && (
            <div className="p-3 text-center text-gray-500">
              No attendance found
            </div>
          )}

          {records.map((row) => (
            <div
              key={row._id}
              className="grid grid-cols-2 px-3 py-2 border-t text-sm"
            >
              <span>
                {new Date(row.date).toLocaleDateString()}
              </span>

              <span
                className={
                  row.status === "Present"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StudentAttendanceModal;
