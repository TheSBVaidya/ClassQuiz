import React, { useState, useEffect } from "react";
import {
  LogOut,
  User,
  PlayCircle,
  Clock,
  CheckCircle2,
  History,
  Trophy,
  Check,
  X,
  Target, // Added Target icon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTES } from "../student.constant";
import useStudent from "../hooks/studentHooks";

const StudentDashboard = () => {
  const {
    activeExam,
    studentGetActiveExam,
    pastPerformanceData,
    getPastPerformance,
  } = useStudent();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  //getActiveExams
  useEffect(() => {
    studentGetActiveExam();
    getPastPerformance();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("student");
    if (storedData) {
      setStudent(JSON.parse(storedData));
    } else {
      navigate(STUDENT_ROUTES.LOGIN);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate(STUDENT_ROUTES.LOGIN);
  };

  const handleJoinExam = async (id) => {
    navigate(`${STUDENT_ROUTES.QUIZ}/${id}`);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Date N/A";
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .replace(",", " •"); // Example: "Jan 03, 2026 • 04:09 PM"
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!student)
    return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-10">
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div
          onClick={() => navigate(STUDENT_ROUTES.PROFILE)}
          className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity"
        >
          <div className="bg-indigo-600 p-2 rounded-full shadow-md shrink-0 group-hover:bg-indigo-700 transition-colors">
            <User className="text-white" size={20} />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-lg md:text-xl font-bold leading-tight text-gray-900 truncate max-w-[150px] md:max-w-none">
              {student.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5 font-medium">
              <span className="bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                Cl {student.standard}
              </span>
              <span className="truncate">#{student.username}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="shrink-0 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-lg border border-gray-100 hover:border-red-100"
        >
          <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* 1. WELCOME BANNER & ACTIVE EXAM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Left: Quick Info (Stacks on mobile) */}
          <div className="md:col-span-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-center">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">
              Student Profile
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Full Name</span>
                <span className="font-semibold text-sm text-right">
                  {student.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Username</span>
                <span className="font-semibold text-sm text-right">
                  {student.username}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Standard</span>
                <span className="font-semibold text-sm text-right">
                  {student.standard}th Grade
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Joined</span>
                <span className="font-semibold text-sm text-right">
                  {formatDate(student.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Active Exam Card (Stacks on mobile) */}
          <div className="md:col-span-2">
            {activeExam && activeExam.isLive ? (
              <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-2xl p-1 text-white shadow-2xl relative overflow-hidden group">
                {/* Inner Content Container */}
                <div className="bg-white/10 backdrop-blur-sm h-full rounded-xl p-5 md:p-6 flex flex-col justify-between relative z-10 border border-white/10">
                  {/* Header: Live Badge & Duration */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1.5 shadow-lg shadow-rose-500/20">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>{" "}
                      LIVE
                    </span>
                    <span className="text-indigo-100 text-xs font-bold flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                      <Clock size={14} className="text-indigo-300" />
                      {activeExam.durationMinutes} min
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-black mb-1 leading-tight tracking-tight">
                      {activeExam.title}
                    </h3>
                    <p className="text-indigo-200 text-sm font-medium">
                      Comprehensive Assessment
                    </p>
                  </div>

                  {/* --- MARKS INFO GRID --- */}
                  {/* Changed grid-cols-3 to grid-cols-2 md:grid-cols-4 to fit passing marks */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
                    {/* Total Marks */}
                    <div className="bg-black/20 rounded-lg p-3 flex flex-col items-center justify-center border border-white/5">
                      <Trophy size={16} className="text-yellow-400 mb-1" />
                      <span className="text-lg font-bold">
                        {activeExam.totalMarks}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider opacity-60">
                        Total
                      </span>
                    </div>

                    {/* NEW: Passing Marks */}
                    <div className="bg-blue-500/20 rounded-lg p-3 flex flex-col items-center justify-center border border-blue-500/30">
                      <Target size={16} className="text-blue-300 mb-1" />
                      <span className="text-lg font-bold text-blue-100">
                        {activeExam.passingMarks}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-blue-200/80">
                        Passing
                      </span>
                    </div>

                    {/* Correct Answer Marks */}
                    <div className="bg-emerald-500/20 rounded-lg p-3 flex flex-col items-center justify-center border border-emerald-500/30">
                      <Check size={16} className="text-emerald-300 mb-1" />
                      <span className="text-lg font-bold text-emerald-100">
                        +{activeExam.plusMarks}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-200/80">
                        Correct
                      </span>
                    </div>

                    {/* Negative Marks */}
                    <div className="bg-rose-500/20 rounded-lg p-3 flex flex-col items-center justify-center border border-rose-500/30">
                      <X size={16} className="text-rose-300 mb-1" />
                      <span className="text-lg font-bold text-rose-100">
                        {activeExam.negativeMarks === 0
                          ? 0
                          : -activeExam.negativeMarks}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-rose-200/80">
                        Wrong
                      </span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <div>
                    <button
                      onClick={() => handleJoinExam(activeExam.id)}
                      className="w-full bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-95 group/btn"
                    >
                      <PlayCircle
                        size={20}
                        className="group-hover/btn:fill-indigo-700 transition-colors"
                      />
                      Start Exam Now
                    </button>
                  </div>
                </div>

                {/* Decorative Background Icons */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-5 pointer-events-none transform rotate-12">
                  <Trophy size={200} />
                </div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 opacity-5 pointer-events-none">
                  <Clock size={150} />
                </div>
              </div>
            ) : (
              <div className="h-full bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-gray-50 p-4 rounded-full mb-3">
                  <CheckCircle2 size={32} className="text-gray-300" />
                </div>
                <h3 className="text-gray-800 font-bold text-lg">
                  No Exams Scheduled
                </h3>
                <p className="text-gray-400 text-sm mt-1 max-w-[200px]">
                  You are all caught up! Enjoy your day,{" "}
                  {student.name.split(" ")[0]}!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. RECENT HISTORY - BEAUTIFIED */}
        <section>
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <History size={20} className="text-indigo-600" />
              </div>
              Performance History
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {pastPerformanceData.map((exam) => (
              <div
                key={exam.id}
                className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
              >
                {/* Status Color Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    exam.status === "PASS" ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                ></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-3">
                  {/* Left: Exam Info */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-700 transition-colors">
                      {exam.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                        <Clock size={14} className="text-gray-400" />
                        {formatDateTime(exam.examDate)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Score & Result */}
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-gray-50 pt-3 md:pt-0 mt-2 md:mt-0">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
                        Score
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-800">
                          {exam.score}
                        </span>
                        <span className="text-sm font-semibold text-gray-400">
                          / {exam.total}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm ${
                        exam.status === "PASS"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}
                    >
                      {exam.status === "PASS" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <X size={16} />
                      )}
                      {exam.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {pastPerformanceData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                <div className="bg-gray-50 p-4 rounded-full mb-3">
                  <History size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">
                  No exam history found yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
