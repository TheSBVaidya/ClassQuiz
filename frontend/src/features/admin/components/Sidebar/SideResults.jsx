import {
  FileText,
  ChevronRight,
  Filter,
  Search,
  BookOpen,
  Send,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import useAdmin from "../../hooks/adminHooks";

const Results = ({ setSelectedStudentResult }) => {
  const {
    examTitles,
    quetionTitles,
    studentResultData,
    getAllStudentResult,
    publishedResult,
  } = useAdmin();

  const [selectedExamTitle, setSelectedExamTitle] = useState(() => {
    return sessionStorage.getItem("admin_results_examTitle") || "";
  });

  const [filteredResults, setFilteredResults] = useState(() => {
    const savedData = sessionStorage.getItem("admin_results_data");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    examTitles();
    if (selectedExamTitle) {
      getAllStudentResult(selectedExamTitle);
    }
  }, []);

  useEffect(() => {
    if (studentResultData !== null) {
      setFilteredResults(studentResultData);
    }
  }, [studentResultData]);

  useEffect(() => {
    sessionStorage.setItem("admin_results_examTitle", selectedExamTitle);
    sessionStorage.setItem(
      "admin_results_data",
      JSON.stringify(filteredResults)
    );
  }, [selectedExamTitle, filteredResults]);

  const handleExamChange = async (e) => {
    const examTitle = e.target.value;
    setSelectedExamTitle(examTitle);

    if (examTitle) {
      await getAllStudentResult(examTitle);
    } else {
      setFilteredResults([]);
      sessionStorage.removeItem("admin_results_data");
    }
  };

  const getSelectedExamId = () => {
    const exam = quetionTitles.find((t) => t.title === selectedExamTitle);
    return exam ? exam.id : null;
  };

  const handlePublishResults = async () => {
    if (filteredResults.length === 0) return;
    setIsPublishing(true);

    const studentIds = filteredResults.map((student) => student.id);
    publishedResult(studentIds, selectedExamTitle);
    setIsPublishing(false);
  };

  return (
    <div className="space-y-6">
      {/* --- Filter & Action Section --- */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Filter Dropdown */}
        <div className="flex-1 w-full md:w-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-700 whitespace-nowrap">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
              <Filter size={20} />
            </div>
            <span className="font-semibold">Filter Results</span>
          </div>

          <div className="w-full relative">
            <select
              value={selectedExamTitle}
              onChange={handleExamChange}
              className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-700 appearance-none cursor-pointer transition-all"
            >
              <option value="">-- Select Exam --</option>
              {quetionTitles &&
                quetionTitles.map((exam) => (
                  <option key={exam.title} value={exam.title}>
                    {exam.title}
                  </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <BookOpen size={18} />
            </div>
          </div>
        </div>

        {/* Right Side: Publish Button */}
        {filteredResults.length > 0 && (
          <button
            onClick={handlePublishResults}
            disabled={isPublishing}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPublishing ? (
              <span className="animate-pulse">Publishing...</span>
            ) : (
              <>
                <Send size={18} />
                Publish Results ({filteredResults.length})
              </>
            )}
          </button>
        )}
      </div>

      {/* --- Results Grid or Empty State --- */}
      {!selectedExamTitle ? (
        // EMPTY STATE
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Search size={40} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-600">No Exam Selected</h3>
          <p className="text-sm text-gray-400 mt-1">
            Please select an exam from the dropdown to view and publish marks.
          </p>
        </div>
      ) : (
        // RESULTS GRID
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredResults.length > 0 ? (
            filteredResults.map((res) => (
              <div
                key={res.id}
                onClick={() =>
                  setSelectedStudentResult({
                    ...res,
                    examId: getSelectedExamId(),
                  })
                }
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                    <FileText size={24} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      res.status === "PASS"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {res.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{res.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {res.score}
                  </span>
                  <span className="text-gray-500 mb-1">/ {res.total}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      res.status === "PASS" ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${(res.score / res.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-4 flex items-center justify-between group-hover:text-indigo-600 transition">
                  View Answer Paper <ChevronRight size={16} />
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-400">
              <Users size={48} className="mb-2 opacity-20" />
              <p>No students found for {selectedExamTitle}.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
