import * as attendanceService from "../services/attendance.service.js";

export const markAttendance = async (req, res) => {
  const attendance = await attendanceService.markAttendance(req.body);
  res.json(attendance);
};

export const toggleAttendance = async (req, res) => {
  const attendance = await attendanceService.toggleAttendance(
    req.params.studentId,
    req.body
  );
  res.json(attendance);
};

export const getAttendanceByClass = async (req, res) => {
  const list = await attendanceService.getAttendanceByClass(
    req.params.classId,
    req.query.date
  );
  res.json(list);
};
