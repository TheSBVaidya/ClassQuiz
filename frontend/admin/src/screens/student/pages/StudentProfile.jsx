import React, { useState, useEffect } from "react";
import {
  User,
  ArrowLeft,
  School,
  Calendar,
  Phone,
  Hash,
  BadgeCheck,
  Save,
  Edit2,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStudent from "../studentHooks";

const StudentProfile = () => {
  const navigate = useNavigate();
  const {
    studentProfile: profile,
    fetchStudentDetails,
    updateStudentDetails,
  } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [namePassword, setNamePassword] = useState({
    name: profile.name || "",
    password: profile.password || "",
  });

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  useEffect(() => {
    if (profile) {
      setNamePassword({
        name: profile.name || "",
        password: profile.password || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setNamePassword({ ...namePassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateStudentDetails(namePassword);
    setIsEditing(false);
    setLoading(false);
  };

  // Date Formatter
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Profile Header Banner */}
          <div className="bg-indigo-600 px-8 py-10 text-white flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
              <User size={48} className="text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-indigo-100 flex items-center justify-center md:justify-start gap-2 mt-2">
                <BadgeCheck size={16} />
                Student ID: {profile.id}
              </p>
            </div>
            <div className="ml-auto">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  profile.isActive
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {profile.isActive ? "Active Student" : "Inactive"}
              </span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Personal Details
                </h2>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>

              {/* READ-ONLY FIELDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Hash size={14} /> Username
                  </label>
                  <p className="font-mono font-semibold text-gray-700">
                    {profile.username}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <School size={14} /> School
                  </label>
                  <p className="font-semibold text-gray-700">
                    {profile.school}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <User size={14} /> Standard
                  </label>
                  <p className="font-semibold text-gray-700">
                    {profile.standard}th Grade
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Phone size={14} /> Phone
                  </label>
                  <p className="font-mono font-semibold text-gray-700">
                    {profile.phone}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Calendar size={14} /> Joining Date
                  </label>
                  <p className="font-semibold text-gray-700">
                    {formatDate(profile.joiningDate)}
                  </p>
                </div>
              </div>

              {/* EDITABLE FIELDS SECTION */}
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-indigo-600" /> Security &
                  Display
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={namePassword.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-3 rounded-xl border ${
                        isEditing
                          ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                          : "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                      } transition-all outline-none`}
                    />
                  </div>

                  {/* Password Field with Toggle */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={namePassword.password}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full p-3 pr-12 rounded-xl border ${
                          isEditing
                            ? "border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            : "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        } transition-all outline-none font-mono`}
                      />
                      {/* Eye Toggle Button */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-1"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
                  >
                    {loading ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save size={18} /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
