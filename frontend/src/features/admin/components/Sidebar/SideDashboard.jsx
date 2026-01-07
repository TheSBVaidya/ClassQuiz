import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ExamControls from "../ExamControls";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ADMIN_ROUTES } from "../../admin.constant";
import useAdmin from "../../hooks/adminHooks";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};
  const {
    givingExamStudents,
    getGivingExam,
    createExam,
    totalStudents,
    getTotalStudent,
    currentBatchStudents,
    getCurrentBatch,
  } = useAdmin();
  // const [step, setStep] = useState(initialState.step || 1);

  const [examConfig, setExamConfig] = useState(
    initialState.examConfig || {
      title: "",
      totalMarks: "",
      plusMarks: "",
      negativeMarks: "",
      durationMinutes: "",
      passingMarks: "",
    }
  );

  useEffect(() => {
    getCurrentBatch();
    getTotalStudent();
  }, []);

  useEffect(() => {
    getGivingExam();
    const interval = setInterval(() => {
      getGivingExam();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // --- HANDLERS ---

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setExamConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToQuestions = async () => {
    // <--- 2. Added totalMarks to validation
    if (
      !examConfig.title ||
      !examConfig.totalMarks ||
      !examConfig.durationMinutes ||
      !examConfig.passingMarks
    ) {
      toast.warning(
        "Please fill in all required fields (Title, Total Marks, Duration, Passing Marks)"
      );
      return;
    }
    await createExam(examConfig);
    navigate(ADMIN_ROUTES.ADD_QUESTIONS, {
      state: {
        examConfig: examConfig,
        initialQuestion: initialState.questions,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Live Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium">Exam Status</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xl font-bold text-gray-800">
                LIVE - ACTIVE
              </span>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-gray-500 text-sm font-medium">Attempting</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {givingExamStudents === null ? 0 : givingExamStudents}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Total Registered
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {totalStudents}
          </p>
          {/* <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +12 this week
            </span> */}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Current Batch</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">
            {currentBatchStudents}
          </p>
          {/* <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
              Top 10% School
            </span> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamControls />

        {/* Quick Actions (Create Exam) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Create New Exam
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Exam Title
              </label>
              <input
                type="text"
                name="title"
                value={examConfig.title}
                onChange={handleConfigChange}
                placeholder="e.g. Math Unit 1 Final"
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <--- 3. Added Total Marks Input Field ---> */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Total Marks
                </label>
                <input
                  type="number"
                  name="totalMarks"
                  value={examConfig.totalMarks}
                  onChange={handleConfigChange}
                  placeholder="e.g. 100"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Right Answer Marks
                </label>
                <input
                  type="number"
                  name="plusMarks"
                  value={examConfig.plusMarks}
                  onChange={handleConfigChange}
                  placeholder="+1"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Wrong Answer Marks
                </label>
                <input
                  type="number"
                  name="negativeMarks"
                  value={examConfig.negativeMarks}
                  onChange={handleConfigChange}
                  placeholder="-0.25"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  name="durationMinutes"
                  value={examConfig.durationMinutes}
                  onChange={handleConfigChange}
                  placeholder="60"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
              {/* PASSING MARKS */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Passing Marks
                </label>
                <input
                  type="number"
                  name="passingMarks"
                  value={examConfig.passingMarks}
                  onChange={handleConfigChange}
                  placeholder="e.g. 35"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleProceedToQuestions}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium text-sm shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
              >
                Next: Add Questions{" "}
                <ArrowLeft className="rotate-180" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }

  // ==========================================
  // VIEW: STEP 2 - MANUAL QUESTION ENTRY
  // ==========================================
  // if (step === 2) {
  //   return (
  //     <AddQuestions
  //       examConfig={examConfig}
  //       setStep={setStep}
  //       initialQuestions={initialState.questions}
  //     />
  //   );
  // }
};

export default Dashboard;
