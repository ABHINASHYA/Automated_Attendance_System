import Student from "../models/student.model.js";
import mongoose from "mongoose";
import Class from "../models/class.model.js";
import * as studentService from "../services/student.service.js";

/**
 * CREATE STUDENT
 * Student belongs to ONLY ONE CLASS
 */
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      rollNo,
      gender,
      email,
      contact,
      address,
      dateOfBirth,
      classId,
    } = req.body;

    if (!classId) {
      return res.status(400).json({
        success: false,
        message: "classId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid classId",
      });
    }

    // verify class exists and belongs to the same school (basic guard)
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return res.status(400).json({ success: false, message: "Class not found" });
    }
    // if req.user has schoolName, ensure it matches class.schoolName
    if (req.user?.schoolName && String(classDoc.schoolName) !== String(req.user.schoolName)) {
      return res.status(400).json({ success: false, message: "Class does not belong to your school" });
    }

    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const student = await Student.create({
      name,
      fatherName,
      rollNo,
      gender,
      email,
      contact,
      address,
      dateOfBirth,
      classId: new mongoose.Types.ObjectId(String(classId)), // ensure ObjectId
      schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId)),
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Roll number already exists in this class",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid classId",
      });
    }

    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const students = await Student.find({
      classId: new mongoose.Types.ObjectId(String(classId)),
      schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId)),
    }).sort({ rollNo: 1 });

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ UPDATE STUDENT
 */
export const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const updated = await Student.findOneAndUpdate(
      {
        _id: studentId,
        schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId)),
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully",
      student: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ✅ DELETE STUDENT
 */
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const deleted = await Student.findOneAndDelete({
      _id: studentId,
      schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId)),
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===== REGISTER FACE =====
// ===== REGISTER FACE =====
export const registerStudentFace = async (req, res) => {
  try {
    const { descriptor } = req.body;

    if (!Array.isArray(descriptor) || descriptor.length === 0) {
      return res.status(400).json({ error: "Face descriptor required" });
    }

    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.studentId,
        schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId))
      },
      {
        $set: { faceDescriptor: descriptor }
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      message: "Face registered successfully",
      student
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===== UPDATE FACE =====
export const updateStudentFace = async (req, res) => {
  try {
    const { descriptor } = req.body;

    if (!Array.isArray(descriptor) || descriptor.length === 0) {
      return res.status(400).json({ error: "Face descriptor required" });
    }

    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.studentId,
        schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId))
      },
      {
        $set: { faceDescriptor: descriptor }
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      message: "Face updated successfully",
      student
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ===== REMOVE FACE =====
// ===== REMOVE FACE =====
export const removeStudentFace = async (req, res) => {
  try {
    const resolvedSchoolId = req.user?.schoolId || req.user?.id || req.user?._id;

    const student = await Student.findOneAndUpdate(
      {
        _id: req.params.studentId,
        schoolId: new mongoose.Types.ObjectId(String(resolvedSchoolId))
      },
      {
        $set: { faceDescriptor: [] }
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      message: "Face data removed successfully",
      student
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSingleClass = async (req, res) => {
  try {
    const cls = await classService.getSingleClassById(req.params.id);

    res.json({
      success: true,
      class: cls,
    });
  } catch (err) {
    if (err.message === "Class not found") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};