import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Phone,
  School,
  Calendar,
  ArrowUpDown,
  Building2,
} from "lucide-react";
import AddStudentModel from "../../models/AddStudentModel";
import StudentDetailsModal from "../../models/StudentDetailsModal";
import useAdmin from "../../hooks/adminHooks";

const Students = () => {
  const {
    students: apiStudents,
    pagination,
    getAllStudents,
    getSchoolNames,
    schoolNames,
    searchStudents,
  } = useAdmin();

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [localStudents, setLocalStudents] = useState([]); // Used for optimistic UI updates

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState(""); // Search is still usually local unless backend adds ?search=
  const [statusFilter, setStatusFilter] = useState("all"); // "true", "false", or "all"
  const [sortConfig, setSortConfig] = useState("standard,desc");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(7);

  useEffect(() => {
    getSchoolNames();
  }, []);

  // Sync local state when API data arrives
  useEffect(() => {
    setLocalStudents(apiStudents || []);
  }, [apiStudents]);

  // --- API CALL (SERVER SIDE FILTERING) ---
  const fetchStudents = async () => {
    setLoading(true);

    // LOGIC: IF SEARCHING, IGNORE FILTERS. IF NOT, USE FILTERS.
    if (searchTerm.trim().length > 0) {
      // --- MODE A: SEARCH BY NAME ---
      await searchStudents(searchTerm, currentPage, pageSize, sortConfig);
    } else {
      // --- MODE B: FILTER BY SCHOOL/STATUS ---
      let activeParam = null;
      if (statusFilter === "true") activeParam = true;
      if (statusFilter === "false") activeParam = false;

      const schoolParam = schoolFilter === "All Schools" ? null : schoolFilter;

      await getAllStudents(
        currentPage,
        pageSize,
        sortConfig,
        schoolParam,
        activeParam
      );
    }

    setLoading(false);
  };
  // Fetch whenever these dependencies change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents();
    }, 500);

    // Cleanup function to cancel the timer if user types again quickly
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortConfig, schoolFilter, statusFilter, searchTerm]);

  // --- HANDLERS ---

  // When filters change, always reset to Page 0
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Optimistic Update (Updates UI instantly without waiting for refresh)
  const handleStatusUpdate = (studentId, newStatus) => {
    setLocalStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, isActive: newStatus } : s))
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Simple Frontend Search (Optional: Keep this if backend doesn't support 'search' param yet)
  const displayedStudents = localStudents.filter((student) => {
    if (!searchTerm) return true;
    return student.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Student Directory</h2>
          <p className="text-xs text-gray-500 mt-1">
            Total Records: {pagination.totalElements}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition shadow-lg"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* FILTERS TOOLBAR */}
      <div className="p-4 bg-gray-50/50 flex gap-4 flex-wrap border-b border-gray-100 items-center">
        {/* Search (Local) */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search loaded students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 p-2.5 rounded-lg border border-gray-200 w-full focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          />
        </div>

        {/* School Filter (Server Side) */}
        <div className="relative">
          <Building2
            className="absolute left-3 top-3 text-gray-400"
            size={16}
          />
          <select
            className="pl-10 pr-8 p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white appearance-none cursor-pointer text-sm font-medium text-gray-700"
            value={schoolFilter}
            onChange={(e) =>
              handleFilterChange(setSchoolFilter, e.target.value)
            }
          >
            {schoolNames.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter (Server Side) */}
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400" size={16} />
          <select
            className="pl-10 pr-8 p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white appearance-none cursor-pointer text-sm font-medium text-gray-700"
            value={statusFilter}
            onChange={(e) =>
              handleFilterChange(setStatusFilter, e.target.value)
            }
          >
            <option value="all">All Status</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>

        {/* Sort Filter (Server Side) */}
        <div className="relative">
          <ArrowUpDown
            className="absolute left-3 top-3 text-gray-400"
            size={16}
          />
          <select
            className="pl-10 pr-8 p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white appearance-none cursor-pointer text-sm font-medium text-gray-700"
            value={sortConfig}
            onChange={(e) => handleFilterChange(setSortConfig, e.target.value)}
          >
            <option value="standard,desc">Class (High to Low)</option>
            <option value="standard,asc">Class (Low to High)</option>
            <option value="id,desc">Newest Added</option>
            <option value="id,asc">Oldest Added</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-4">Student Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Education</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : displayedStudents.length > 0 ? (
              displayedStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="hover:bg-indigo-50/50 cursor-pointer transition-colors group"
                >
                  <td className="p-4">
                    <div className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {student.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      @{student.username}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone size={14} className="text-gray-400" />{" "}
                      {student.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-gray-700">
                      {student.school}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <School size={12} /> Class {student.standard}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />{" "}
                      {formatDate(student.joiningDate)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        student.isActive
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {student.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="p-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300">
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          <span>Page</span>
          <span className="font-bold text-indigo-600 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">
            {currentPage + 1}
          </span>
          <span>of {pagination.totalPages || 1}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={pagination.isFirst}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border
              ${
                pagination.isFirst
                  ? "bg-gray-50 text-gray-300 border-transparent cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm hover:shadow-md active:scale-95"
              }`}
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-200 ${
                !pagination.isFirst && "group-hover:-translate-x-1"
              }`}
            />
            Previous
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={pagination.isLast}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border
              ${
                pagination.isLast
                  ? "bg-gray-50 text-gray-300 border-transparent cursor-not-allowed"
                  : "bg-black text-white border-transparent hover:bg-gray-800 shadow-md hover:shadow-lg active:scale-95"
              }`}
          >
            Next
            <ChevronRight
              size={18}
              className={`transition-transform duration-200 ${
                !pagination.isLast && "group-hover:translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showAddModal && (
        <AddStudentModel setShowStudentModal={setShowAddModal} />
      )}

      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onStatusChange={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default Students;
