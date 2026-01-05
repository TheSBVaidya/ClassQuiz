import { useState } from "react";
import {
  X,
  RefreshCw,
  User,
  Lock,
  Phone,
  School,
  GraduationCap,
} from "lucide-react"; // Assuming you have lucide-react, or just use text
import useAdmin from "../../adminHooks";

const AddStudentModel = ({ setShowStudentModal }) => {
  const { addStudent } = useAdmin();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    school: "",
    standard: "1",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCredentials = () => {
    // Logic for unique username: "USR" + Timestamp + Random 3 digits
    const uniqueId =
      Date.now().toString().slice(-4) + Math.floor(Math.random() * 1000);
    const newUsername = `STU${uniqueId}`;

    // Logic for secure password
    const newPassword = Math.random().toString(36).slice(-8).toUpperCase();

    setFormData((prev) => ({
      ...prev,
      username: newUsername,
      password: newPassword,
    }));
  };

  const handleSubmit = () => {
    console.log("Saving Student Data:", formData);
    addStudent(formData);
    setShowStudentModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gray-50 px-8 py-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Register New Student
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter student details and generate credentials.
            </p>
          </div>
          <button
            onClick={() => setShowStudentModal(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {/* Personal Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="e.g. Rahul Verma"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                <Phone size={14} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 outline-none transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* School */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                <School size={14} /> School Name
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. DPS International"
              />
            </div>

            {/* Standard */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                <GraduationCap size={14} /> Class / Standard
              </label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Standard {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Credentials Generator Section */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                <Lock size={16} /> Login Credentials
              </h3>
              <button
                onClick={generateCredentials}
                className="flex items-center gap-2 text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
              >
                <RefreshCw size={12} /> Auto-Generate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-3.5 text-indigo-300"
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    readOnly
                    placeholder="Click Generate"
                    className="w-full pl-9 p-2.5 bg-white border border-indigo-200 text-indigo-800 font-mono text-sm rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-indigo-400 uppercase mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-3.5 text-indigo-300"
                  />
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    readOnly
                    placeholder="Click Generate"
                    className="w-full pl-9 p-2.5 bg-white border border-indigo-200 text-indigo-800 font-mono text-sm rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-5 border-t flex justify-end gap-3">
          <button
            onClick={() => setShowStudentModal(false)}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Save Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModel;
