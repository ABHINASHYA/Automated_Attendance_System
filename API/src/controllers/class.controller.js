import {
  createClassService,
  getClassesByTeacherService,
  getClassesBySchoolService,
  deleteClassService
} from "../services/class.service.js";
import Class from "../models/class.model.js";

export const createClass = async (req, res) => {
  try {
    const classData = {
      className: req.body.className,
      section: req.body.section,
      subject: req.body.subject,
      teacherId: req.user._id,
      schoolName: req.user.schoolName,
    };

    const createdClass = await createClassService(classData);
    res.status(201).json({ message: "Class created", class: createdClass });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMyClasses = async (req, res) => {
  try {
    const classes = await getClassesByTeacherService(req.user._id);
    res.status(200).json({ classes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllClassesInSchool = async (req, res) => {
  try {
    const classes = await getClassesBySchoolService(req.user.schoolName);
    res.status(200).json({ classes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//For deleting the classes
export const deleteClass = async (req, res) => {
  try {
    await deleteClassService(req.params.id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//For updating the classes
import { updateClassService } from "../services/class.service.js";

export const updateClass = async (req, res) => {
  try {
    const updated = await updateClassService(req.params.id, req.body, req.user);
    res.status(200).json({ message: "Class updated successfully", class: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//For fetch all classes created by teacher

export const getTeacherClasses = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const classes = await Class.find({ teacherId })
      .populate("teacherId", "fullName");

    const teacherName = classes[0]?.teacherId?.fullName || "Teacher";

    res.status(200).json({ classes, teacherName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
