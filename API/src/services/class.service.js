import Class from "../models/class.model.js";

export const createClassService = async (classData) => {
  const newClass = await Class.create(classData);
  return newClass;
};

export const getClassesByTeacherService = async (teacherId) => {
  return await Class.find({ teacherId }).populate("teacherId", "fullName");
};

// Principal or Teacher — fetch same school classes
export const getClassesBySchoolService = async (schoolName) => {
  return await Class.find({ schoolName }).populate("teacherId", "fullName");
};

//for deleting the classes
export const deleteClassService = async (id) => {
  return await Class.findByIdAndDelete(id);
};


//For udating the class 

export const updateClassService = async (id, updates, user) => {
  const cls = await Class.findById(id);
  if (!cls) throw new Error("Class not found");

  // only principal
  if (user.role !== "Principal" && cls.teacherId.toString() !== user._id.toString()) {
    throw new Error("Not authorized to update this class");
  }

  if (updates.className !== undefined) cls.className = updates.className;
  if (updates.section !== undefined) cls.section = updates.section;
  if (updates.subject !== undefined) cls.subject = updates.subject;

  await cls.save();
  return cls;
};


export const getSingleClassById = async (classId) => {
  const cls = await Class.findById(classId);
  if (!cls) throw new Error("Class not found");
  return cls;
};