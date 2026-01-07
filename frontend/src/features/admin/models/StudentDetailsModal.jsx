import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  School,
  Calendar,
  Power,
  ShieldCheck,
  ShieldAlert,
  Edit2,
  Save,
  Loader2,
  Lock,
} from "lucide-react";
import useAdmin from "../hooks/adminHooks";

const StudentDetailsModal = ({
  student,
  onClose,
  onStatusChange,
  onUpdateSuccess,
}) => {
  const { toggleStudent, updateStudent } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form data with student details
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    school: "",
    standard: "",
    username: "",
    password: "", // Password starts empty
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        phone: student.phone || "",
        school: student.school || "",
        standard: student.standard || "",
        username: student.username || "",
        password: "", // Don't pre-fill password for security
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // --- API LOGIC: TOGGLE STATUS ---
  const handleStatusToggle = () => {
    setLoading(true);
    //api call
    toggleStudent(student.id);
    if (onStatusChange) onStatusChange(student.id, !student.isActive);
    onClose();
    setLoading(false);
  };

  // --- API LOGIC: UPDATE DETAILS ---
  const handleUpdateStudent = () => {
    setLoading(true);

    // Construct Payload exactly as requested
    const payload = {
      name: formData.name,
      phone: formData.phone,
      school: formData.school,
      standard: Number(formData.standard), // Ensuring it is sent as number/integer
      password: formData.password || student.password, // Send new password if typed, else keep logic (or send empty if backend handles it)
      username: formData.username,
    };

    updateStudent(payload, student.id);
    setIsEditing(false);
    if (onUpdateSuccess) onUpdateSuccess();
    onClose();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div
          className={`p-6 text-white flex justify-between items-start shrink-0 ${
            student.isActive
              ? "bg-gradient-to-r from-green-600 to-emerald-600"
              : "bg-gradient-to-r from-red-600 to-rose-600"
          }`}
        >
          <div className="flex-1 mr-4">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white/50 font-bold text-xl"
                  placeholder="Student Name"
                />
                <div className="flex items-center gap-1 opacity-90 text-sm">
                  @
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-transparent border-b border-white/30 focus:outline-none text-white w-full"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="opacity-90 flex items-center gap-1 text-sm mt-1">
                  @{student.username}
                </p>
              </>
            )}
          </div>

          <div className="flex gap-2">
            {/* Edit/Save Toggle Button */}
            <button
              onClick={() => {
                if (isEditing) handleUpdateStudent();
                else setIsEditing(true);
              }}
              disabled={loading}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
              title={isEditing ? "Save Changes" : "Edit Details"}
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isEditing ? (
                <Save size={20} />
              ) : (
                <Edit2 size={20} />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Standard */}
            <div
              className={`p-3 rounded-xl border ${
                isEditing
                  ? "bg-white border-indigo-200 ring-2 ring-indigo-50"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                Standard
              </span>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <School size={16} className="text-indigo-500 shrink-0" />
                {isEditing ? (
                  <input
                    type="number"
                    name="standard"
                    value={formData.standard}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none border-b border-gray-300 focus:border-indigo-500"
                  />
                ) : (
                  <span>Class {student.standard}</span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div
              className={`p-3 rounded-xl border ${
                isEditing
                  ? "bg-white border-indigo-200 ring-2 ring-indigo-50"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                Phone
              </span>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <Phone size={16} className="text-indigo-500 shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none border-b border-gray-300 focus:border-indigo-500"
                  />
                ) : (
                  <span>{student.phone}</span>
                )}
              </div>
            </div>

            {/* School Name */}
            <div
              className={`col-span-2 p-3 rounded-xl border ${
                isEditing
                  ? "bg-white border-indigo-200 ring-2 ring-indigo-50"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                School Name
              </span>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <School size={16} className="text-indigo-500 shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none border-b border-gray-300 focus:border-indigo-500"
                  />
                ) : (
                  <span>{student.school}</span>
                )}
              </div>
            </div>

            {/* Password Field (Only in Edit Mode) */}
            {isEditing && (
              <div className="col-span-2 bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="text-xs font-bold text-red-400 uppercase block mb-1">
                  Reset Password
                </span>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Lock size={16} className="text-red-500 shrink-0" />
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter new password to reset"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none border-b border-red-200 focus:border-red-500 placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            {/* Joined Date (Read Only) */}
            <div className="col-span-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                Joined Date
              </span>
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <Calendar size={16} className="text-indigo-500 shrink-0" />
                {formatDate(student.joiningDate)}
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Status Action Section */}
          <div className="shrink-0">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Power size={16} /> Account Status
            </h3>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    student.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {student.isActive ? (
                    <ShieldCheck size={24} />
                  ) : (
                    <ShieldAlert size={24} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-800">
                    {student.isActive ? "Active Account" : "Inactive Account"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {student.isActive
                      ? "Student can login and take exams"
                      : "Student access is blocked"}
                  </p>
                </div>
              </div>
            </div>

            {/* Only show Toggle Button if NOT editing details to prevent confusion */}
            {!isEditing && (
              <button
                onClick={handleStatusToggle}
                disabled={loading}
                className={`w-full mt-4 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
                  ${
                    student.isActive
                      ? "bg-red-600 hover:bg-red-700 shadow-red-200"
                      : "bg-green-600 hover:bg-green-700 shadow-green-200"
                  } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </>
                ) : student.isActive ? (
                  "Deactivate Student"
                ) : (
                  "Activate Student"
                )}
              </button>
            )}

            {isEditing && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStudent}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Save size={20} />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
