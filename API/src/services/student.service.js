import Student from "../models/student.model.js";
import mongoose from "mongoose";

export const createStudent = async (user, data) => {
  // Sanitize and validate classId before creating the student to avoid
  // Mongoose Cast errors when frontend sends 'undefined' or invalid ids.
  const rawClassId = data.classId;
  const classId = (rawClassId === 'undefined' || rawClassId === undefined || rawClassId === null)
    ? null
    : String(rawClassId);

  if (!classId || !mongoose.Types.ObjectId.isValid(classId)) {
    throw new Error('Valid classId is required to create a student');
  }

  const schoolId = user.schoolId || user._id;
  return Student.create({
    ...data,
    classId,
    schoolId,
  });
};

export const getStudentsByClass = (classId) =>
  Student.find({ classId });

export const getStudentById = (id) =>
  Student.findById(id);

export const updateStudent = (id, data) =>
  Student.findByIdAndUpdate(id, data, { new: true });

export const deleteStudent = async (user, studentId) => {
  // ownership / principal check can be added here
  await Student.findByIdAndDelete(studentId);
};

export const getAllSchoolStudents = (schoolId) =>
  Student.find({ schoolId });
