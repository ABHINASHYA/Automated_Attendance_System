import Attendance from "../models/attendance.model.js";
import { getTodayDate, isToday } from "../helpers/date.helper.js";

export const markAttendance = async ({ studentId, classId, status, date }) => {
  if (!isToday(date)) {
    throw new Error("Attendance can only be marked for today");
  }

  // Upsert attendance for the specific student in the specific class on the given date
  return Attendance.findOneAndUpdate(
    { studentId, classId, date },
    { studentId, classId, status, date },
    { upsert: true, new: true }
  );
};

export const toggleAttendance = async (studentId, { classId, date }) => {
  if (!isToday(date)) {
    throw new Error("Cannot modify past attendance");
  }

  const attendance = await Attendance.findOne({
    studentId,
    classId,
    date,
  });

  if (!attendance) {
    return Attendance.create({
      studentId,
      classId,
      date,
      status: "Present",
    });
  }

  attendance.status =
    attendance.status === "Present" ? "Absent" : "Present";

  return attendance.save();
};

export const getAttendanceByClass = async (classId, date) => {
  const today = date || getTodayDate();

  return Attendance.find({ classId, date: today })
    .populate("studentId", "name rollNo");
};
