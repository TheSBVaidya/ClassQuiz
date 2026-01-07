import { useState, useEffect } from "react";
import { Upload, ChevronDown } from "lucide-react";
import useAdmin from "../../adminHooks";

const UploadQuestionsModel = ({ setShowUploadModal }) => {
  const { examTitles, quetionTitles } = useAdmin();

  const [selectedExamId, setSelectedExamId] = useState("");

  useEffect(() => {
    examTitles();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Upload Question Bank</h2>
        <div className="space-y-4">
          {/* --- CHANGED: Dropdown for Exam Title --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Exam
            </label>
            <div className="relative">
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  -- Select an Exam --
                </option>
                {/* Checking if exams exist before mapping. 
                   Make sure your exam object uses 'id' (or '_id') and 'title' 
                */}
                {quetionTitles && quetionTitles.length > 0 ? (
                  quetionTitles.map((exam) => (
                    <option
                      key={exam._id || exam.id}
                      value={exam._id || exam.id}
                    >
                      {exam.title}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading exams...</option>
                )}
              </select>
              {/* Dropdown Icon for style */}
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-500">
              Click to upload Excel File (.xlsx)
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-white rounded transition-colors ${
                selectedExamId
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
              disabled={!selectedExamId}
            >
              Upload & Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadQuestionsModel;
