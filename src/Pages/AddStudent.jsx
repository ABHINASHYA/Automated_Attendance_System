import React, { useState, useEffect } from 'react';

export default function AddStudentPage() {
  const [schoolName, setSchoolName] = useState('');
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dateOfBirth: '',
    address: '',
    contact: '',
    email: ''
  });

  // Fetch school name from database
  useEffect(() => {
    fetch('/mockData/teacher.json')
      .then((res) => res.json())
      .then((data) => setSchoolName(data.schoolName))
      .catch(() => setSchoolName('My School'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.fatherName || !formData.dateOfBirth || 
        !formData.address || !formData.contact || !formData.email) {
      return;
    }
    const newStudent = {
      ...formData,
      id: Date.now(),
      rollNo: students.length + 1,
      status: 'Present'
    };
    setStudents([...students, newStudent]);
    setFormData({
      name: '',
      fatherName: '',
      dateOfBirth: '',
      address: '',
      contact: '',
      email: ''
    });
    setShowAddForm(false);
  };

  const toggleAttendance = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' }
        : student
    ));
  };

  const openStudentDetails = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-cyan-200 flex flex-col py-10 px-4">
      {/* Top Section - School Name */}
      <div className="w-full flex justify-start items-center mb-10">
        <h1 className="text-xl md:text-2xl font-semibold text-white px-6 py-3 rounded-lg shadow-md">
          {schoolName || 'Loading...'}
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto">
        {/* If no students added yet */}
        {!showAddForm && students.length === 0 && (
          <div className="flex flex-col items-center mt-20 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#89ff9b] mb-4">
						Automated Attendance System
					</h2>
					<p className="text-white text-lg mb-8">
						Making attendance faster and smoother using AI-based face detection.
					</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-white border-2 border-gray-700 text-lg px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Add Student
            </button>
          </div>
        )}

        {/* Student Table */}
        {students.length > 0 && !showAddForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
              Students List
            </h2>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 mb-4 bg-gray-200 rounded-lg py-3 px-4 font-semibold text-gray-700">
              <div className="col-span-2">Roll No.</div>
              <div className="col-span-5">Name</div>
              <div className="col-span-4">Status</div>
              <div className="col-span-1"></div>
            </div>

            {/* Student Rows */}
            <div className="flex flex-col gap-3">
              {students.map((student) => (
                <div key={student.id} className="grid grid-cols-12 gap-4 items-center border border-gray-300 rounded-lg px-4 py-3 bg-white">
                  <div className="col-span-2 font-semibold text-gray-800">{student.rollNo}.</div>
                  <div className="col-span-5 font-medium text-gray-700">{student.name}</div>
                  <div className="col-span-4">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                        student.status === 'Present'
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {student.status}
                    </button>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button 
                      onClick={() => openStudentDetails(student)}
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 p-2 rounded-lg transition-colors text-xl font-bold"
                    >
                      ⋮
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Student Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-white border-2 border-gray-700 text-lg px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Add Student
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Student Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-700">Student</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's Name"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                placeholder="Date of Birth"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border-2 border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSubmit}
                className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Roll No:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.rollNo}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Name:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.name}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Father's Name:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.fatherName}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Date of Birth:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.dateOfBirth}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Address:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.address}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Contact:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.contact}</span>
              </div>
              <div className="flex border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700 w-36">Email:</span>
                <span className="text-gray-600 flex-1">{selectedStudent.email}</span>
              </div>
              <div className="flex pt-2">
                <span className="font-semibold text-gray-700 w-36">Status:</span>
                <span className={`font-bold flex-1 ${
                  selectedStudent.status === 'Present' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {selectedStudent.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}