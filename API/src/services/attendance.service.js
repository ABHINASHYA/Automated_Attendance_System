import Attendance from "../models/attendance.model.js";
import { getTodayDate, isToday } from "../helpers/date.helper.js";

/* ===============================
   MARK / UPDATE (generic)
================================ */
export const markAttendance = async ({
  studentId,
  classId,
  status,
  date,
  schoolId
}) => {

  if (!isToday(date)) {
    throw new Error("Attendance can only be marked for today");
  }

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  return Attendance.findOneAndUpdate(
    {
      studentId,
      classId,
      schoolId,
      date: day
    },
    {
      $set: {
        status
      }
    },
    {
      new: true,
      upsert: true
    }
  );
};



/* ===============================
   TOGGLE (manual button)
================================ */
export const toggleAttendance = async (
  studentId,
  { classId, date, schoolId }
) => {

  if (!isToday(date)) {
    throw new Error("Cannot modify past attendance");
  }

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);

  const existing = await Attendance.findOne({
    studentId,
    classId,
    schoolId,
    date: day
  });

  if (!existing) {
    return Attendance.create({
      studentId,
      classId,
      schoolId,
      date: day,
      status: "Present"
    });
  }

  existing.status =
    existing.status === "Present" ? "Absent" : "Present";

  return existing.save();
};



/* ===============================
   GET BY CLASS (today or date)
================================ */
export const getAttendanceByClass = async (
  classId,
  schoolId,
  date
) => {

  const day = date ? new Date(date) : getTodayDate();
  day.setHours(0, 0, 0, 0);

  return Attendance.find({
    classId,
    schoolId,
    date: day
  }).populate("studentId", "name rollNo");
};
