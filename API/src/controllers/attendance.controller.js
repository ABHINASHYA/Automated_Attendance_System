import * as attendanceService from "../services/attendance.service.js";

export const markAttendance = async (req, res) => {
  const attendance = await attendanceService.markAttendance(req.body);
  res.json(attendance);
};

export const getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?.id || req.user?._id;

    let filter = {
      classId,
      schoolId: resolvedSchoolId
    };

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = {
        $gte: start,
        $lte: end
      };
    }

    const attendance = await Attendance.find(filter)
      .populate("studentId");

    res.json({
      success: true,
      attendance
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


import Attendance from "../models/attendance.model.js";
import mongoose from "mongoose";

/* ===============================
   MARK / TOGGLE ATTENDANCE
================================ */

export const toggleAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { classId, date } = req.body;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?.id || req.user?._id;

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      studentId,
      classId,
      date: day,
      schoolId: resolvedSchoolId,
    });

    let record;

    if (existing) {
      const newStatus =
        existing.status === "Present" ? "Absent" : "Present";

      existing.status = newStatus;
      record = await existing.save();
    } else {
      record = await Attendance.create({
        studentId,
        classId,
        date: day,
        status: "Present",
        schoolId: resolvedSchoolId,
      });
    }

    res.json({
      success: true,
      attendance: record,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===============================
   GET STUDENT ATTENDANCE
================================ */

export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?.id || req.user?._id;

    const data = await Attendance.find({
      studentId: new mongoose.Types.ObjectId(studentId),
      schoolId: new mongoose.Types.ObjectId(resolvedSchoolId),
    }).sort({ date: -1 });

    res.json({
      success: true,
      attendance: data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






export const markPresentByFace = async (req, res) => {
  try {
    const { studentId, classId, date } = req.body;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?._id;

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      studentId,
      classId,
      schoolId: resolvedSchoolId,
      date: day
    });

    // ✅ already present → do nothing
    if (existing && existing.status === "Present") {
      return res.json({
        success: true,
        alreadyMarked: true,
        attendance: existing
      });
    }

    // ❌ exists but absent
    if (existing) {
      existing.status = "Present";
      await existing.save();

      return res.json({
        success: true,
        attendance: existing
      });
    }

    // ❌ no record yet
    const record = await Attendance.create({
      studentId,
      classId,
      schoolId: resolvedSchoolId,
      date: day,
      status: "Present"
    });

    res.json({
      success: true,
      attendance: record
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
