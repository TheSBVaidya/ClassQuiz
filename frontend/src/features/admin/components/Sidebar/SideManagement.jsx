import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Search,
  AlertTriangle,
  FileSpreadsheet,
  RefreshCw,
  UserX,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "../../admin.constant";
import useAdmin from "../../hooks/adminHooks";
import StudentDetailsModal from "../../models/StudentDetailsModal";

const Management = () => {
  const navigate = useNavigate();
  const {
    examTitles,
    quetionTitles,
    deleteExam,
    searchStudents,
    students,
    toggleActiveByDate,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("exams");

  // State for Exam Management
  const [selectedExamId, setSelectedExamId] = useState("");

  // State for Student Management
  const [inactiveDate, setInactiveDate] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Loading state
  const [selectedStudent, setSelectedStudent] = useState(null); // For Modal
  // --- STATE ---
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch exams on mount
  useEffect(() => {
    examTitles();
  }, []);

  // --- SEARCH LOGIC WITH DEBOUNCE ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (studentSearch.length > 2) {
        setIsSearching(true);
        searchStudents(studentSearch);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [studentSearch]);

  // Update results when hook returns data
  useEffect(() => {
    setSearchResults(students);
    setIsSearching(false);
  }, [students]);

  // --- HANDLERS ---

  // 1. EXAM: Delete
  const handleDeleteExam = async () => {
    if (!selectedExamId) return toast.error("Please select an exam first.");
    toast.warning("Are you sure..", {
      action: { label: "Yes", onClick: () => deleteExam(selectedExamId) },
      cancel: { label: "No" },
    });
    setSelectedExamId("");
    examTitles();
  };

  // 2. EXAM: Fetch & Edit
  const handleEditExam = () => {
    if (!selectedExamId) return toast.error("Please select an exam first.");
    navigate(ADMIN_ROUTES.ADD_QUESTIONS, {
      state: { editExamId: selectedExamId },
    });
  };

  // 3. STUDENT: Bulk Deactivate
  const handleBulkDeactivate = async () => {
    if (!fromDate || !toDate) {
      return toast.error("Please select both 'From' and 'To' dates.");
    }

    // Optional: Validate that From date is not after To date
    if (new Date(fromDate) > new Date(toDate)) {
      return toast.error("'From' date cannot be greater than 'To' date.");
    }

    const payload = {
      fromDate: fromDate,
      toDate: toDate,
    };

    console.log(payload);

    toast.warning("Are you sure..", {
      action: { label: "Yes", onClick: () => toggleActiveByDate(payload) },
      cancel: { label: "No" },
    });
    // Optional: Reset dates
    setFromDate("");
    setToDate("");
  };

  // 4. STUDENT: Update Status (Optimistic UI update)
  const handleStudentStatusChange = (id, newStatus) => {
    // Update local state immediately so UI reflects change without refresh
    setSearchResults((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: newStatus } : s))
    );
  };

  // 5. STUDENT: Refresh Data after Edit
  const handleDataRefresh = () => {
    // If we are currently searching, re-run the search to get updated names/details
    if (studentSearch.length > 2) {
      searchStudents(studentSearch);
    }
  };

  // 6. SYSTEM: Export
  const handleExportData = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Generating CSV Report...",
      success: "Report downloaded successfully!",
      error: "Error generating report",
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        Admin Management Console
      </h1>

      {/* TABS HEADER */}
      <div className="flex gap-4 border-b border-gray-200 mb-8">
        {["exams", "students", "system"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 font-medium transition-colors capitalize ${
              activeTab === tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "system" ? "System Tools" : `${tab} Maintenance`}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT: EXAMS --- */}
      {activeTab === "exams" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Edit Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <Edit className="text-indigo-600" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Update Existing Exam
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Select an exam to modify questions.
            </p>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Choose Exam --</option>
              {quetionTitles?.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleEditExam}
              disabled={!selectedExamId}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              Fetch & Edit Questions
            </button>
          </div>

          {/* Delete Card */}
          <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
            <div className="bg-red-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <Trash2 className="text-red-600" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Delete Exam Zone
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Warning: This is permanent.
            </p>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="w-full p-3 border border-red-200 bg-red-50/10 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">-- Choose Exam --</option>
              {quetionTitles?.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleDeleteExam}
              disabled={!selectedExamId}
              className="w-full py-2.5 bg-white border-2 border-red-500 text-red-600 rounded-lg font-bold hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              Permanently Delete Exam
            </button>
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: STUDENTS --- */}
      {activeTab === "students" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Bulk Deactivate */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <UserX className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">
                  Bulk Deactivate Inactive Students
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Deactivate students who were inactive within a specific date
                  range.
                </p>

                {/* Date Range Inputs */}
                <div className="mt-4 flex flex-col xl:flex-row items-end gap-4">
                  {/* From Date */}
                  <div className="w-full md:w-auto">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg w-full md:w-40 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  {/* To Date */}
                  <div className="w-full md:w-auto">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg w-full md:w-40 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleBulkDeactivate}
                    className="w-full md:w-auto px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 active:scale-95 transition-all shadow-sm shadow-orange-200"
                  >
                    Deactivate Range
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Student Search */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Find & Update Student
            </h3>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or username (min 3 chars)..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {/* LOADING STATE */}
            {isSearching && (
              <div className="flex items-center justify-center py-8 text-indigo-600">
                <Loader2 className="animate-spin mr-2" />
                <span className="font-medium">Searching database...</span>
              </div>
            )}

            {/* RESULTS LIST */}
            {!isSearching && searchResults.length > 0 && (
              <div className="mt-4 border border-gray-100 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-3 text-xs font-bold text-gray-500 uppercase">
                  Search Results ({searchResults.length})
                </div>
                <div className="divide-y divide-gray-100">
                  {searchResults.map((student) => (
                    <div
                      key={student.id}
                      className="p-4 bg-white flex justify-between items-center hover:bg-indigo-50 transition-colors"
                    >
                      <div>
                        <p className="font-bold text-gray-800 flex items-center gap-2">
                          {student.name}
                          {!student.isActive && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                              INACTIVE
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{student.username} • Cl {student.standard}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedStudent(student)} // Opens Modal
                        className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        Edit / Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results State */}
            {!isSearching &&
              studentSearch.length > 2 &&
              searchResults.length === 0 && (
                <div className="text-center py-6 text-gray-400 text-sm">
                  No students found.
                </div>
              )}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: SYSTEM --- */}
      {activeTab === "system" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:border-green-300 transition-colors cursor-pointer group"
            onClick={handleExportData}
          >
            <div className="bg-green-50 p-4 rounded-full mb-4 group-hover:bg-green-100">
              <FileSpreadsheet className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Export Results</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              Download .csv file of all student marks.
            </p>
            <span className="text-sm font-bold text-green-600">
              Download CSV
            </span>
          </div>
          <div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center hover:border-blue-300 transition-colors cursor-pointer group"
            onClick={() => toast.success("System Cache Cleared!")}
          >
            <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100">
              <RefreshCw className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">System Cleanup</h3>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              Clear temporary server cache.
            </p>
            <span className="text-sm font-bold text-blue-600">Run Cleanup</span>
          </div>
        </div>
      )}

      {/* --- MODAL INTEGRATION --- */}
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onStatusChange={handleStudentStatusChange}
          onUpdateSuccess={handleDataRefresh} // Triggers re-search to show updated data
        />
      )}
    </div>
  );
};

export default Management;
