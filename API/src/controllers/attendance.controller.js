import Attendance from "../models/attendance.model.js";
import mongoose from "mongoose";

/* ===============================
   MARK / TOGGLE ATTENDANCE (manual button)
================================ */
export const toggleAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { classId, date } = req.body;

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

    let record;

    if (existing) {
      existing.status =
        existing.status === "Present" ? "Absent" : "Present";

      record = await existing.save();
    } else {
      record = await Attendance.create({
        studentId,
        classId,
        schoolId: resolvedSchoolId,
        date: day,
        status: "Present"
      });
    }

    res.json({
      success: true,
      attendance: record
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* ===============================
   MARK PRESENT BY FACE (scanner)
   (never toggle)
================================ */
export const markPresentByFace = async (req, res) => {
  try {
    const { studentId, classId, date } = req.body;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?._id;

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    const record = await Attendance.findOneAndUpdate(
      {
        studentId,
        classId,
        schoolId: resolvedSchoolId,
        date: day
      },
      {
        $set: {
          status: "Present"
        }
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      success: true,
      attendance: record
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* ===============================
   GET ATTENDANCE BY CLASS (+ date)
================================ */
export const getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?._id;

    const filter = {
      classId: new mongoose.Types.ObjectId(classId),
      schoolId: new mongoose.Types.ObjectId(resolvedSchoolId)
    };

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    const attendance = await Attendance.find(filter)
      .populate("studentId");

    res.json({
      success: true,
      attendance
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/* ===============================
   GET STUDENT ATTENDANCE (history)
================================ */
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const resolvedSchoolId =
      req.user?.schoolId || req.user?._id;

    const data = await Attendance.find({
      studentId: new mongoose.Types.ObjectId(studentId),
      schoolId: new mongoose.Types.ObjectId(resolvedSchoolId)
    }).sort({ date: -1 });

    res.json({
      success: true,
      attendance: data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
