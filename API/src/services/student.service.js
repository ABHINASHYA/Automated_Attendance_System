import Student from "../models/student.model.js";
import mongoose from "mongoose";

/* ===============================
   CREATE STUDENT
================================ */
export const createStudent = async (user, data) => {
  const rawClassId = data.classId;
  const classId =
    rawClassId === "undefined" || rawClassId === undefined || rawClassId === null
      ? null
      : String(rawClassId);

  if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
    throw new Error("Valid classId is required to create a student");
  }

  const schoolId = user.schoolId || user._id;

  return Student.create({
    ...data,
    classId,
    schoolId,
  });
};

/* ===============================
   GET STUDENTS
================================ */
export const getStudentsByClass = (classId) =>
  Student.find({ classId });

export const getStudentById = (id) =>
  Student.findById(id);

export const getAllSchoolStudents = (schoolId) =>
  Student.find({ schoolId });

/* ===============================
   UPDATE / DELETE STUDENT
================================ */
export const updateStudent = (id, data) =>
  Student.findByIdAndUpdate(id, data, { new: true });

export const deleteStudent = async (user, studentId) => {
  await Student.findByIdAndDelete(studentId);
};

/* ===============================
   FACE REGISTRATION
================================ */
export const registerFace = async (studentId, descriptor) => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID");
  }

  if (!Array.isArray(descriptor) || descriptor.length !== 128) {
    throw new Error("Invalid face descriptor");
  }

  const student = await Student.findByIdAndUpdate(
    studentId,
    { faceDescriptor: descriptor },
    { new: true }
  );

  if (!student) throw new Error("Student not found");

  return student;
};

/* ===============================
   UPDATE FACE
================================ */
export const updateFace = async (studentId, descriptor) => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID");
  }

  if (!Array.isArray(descriptor) || descriptor.length !== 128) {
    throw new Error("Invalid face descriptor");
  }

  const student = await Student.findByIdAndUpdate(
    studentId,
    { faceDescriptor: descriptor },
    { new: true }
  );

  if (!student) throw new Error("Student not found");

  return student;
};

/* ===============================
   REMOVE FACE
================================ */
export const removeFace = async (studentId) => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID");
  }

  const student = await Student.findByIdAndUpdate(
    studentId,
    { faceDescriptor: null }, // ✅ IMPORTANT
    { new: true }
  );

  if (!student) throw new Error("Student not found");

  return student;
};
