import React, { useState, useEffect, useRef } from "react";
// 1. Import useParams to read the ID from URL
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  AlertCircle,
} from "lucide-react";
import useStudent from "../hooks/studentHooks"; // Adjust path as needed

const QuizInterface = () => {
  const navigate = useNavigate();
  // 2. Get the examId from the URL
  const { examId } = useParams();

  // 3. Get the fetch function from your hook
  const { examData, studentGetExamQuiz, submitAnswer, studentHeartbeat } =
    useStudent();

  // --- STATE ---
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      studentHeartbeat();
    }, 30000); // 30 sec

    return () => clearInterval(interval);
  }, []);

  // --- 4. FETCH DATA ON MOUNT ---
  useEffect(() => {
    if (examId) {
      // Call the API when the component loads
      studentGetExamQuiz(examId);
    }
  }, [examId]);

  // --- 5. SYNC DATA TO STATE ---
  useEffect(() => {
    if (examData && examData.questions && examData.questions.length > 0) {
      console.log("Quiz Loaded in Interface:", examData);

      setQuestions(examData.questions);

      if (examData.exam && examData.exam.durationMinutes) {
        setTimeLeft(examData.exam.durationMinutes * 60);
      }
    }
  }, [examData]);

  // --- TIMER LOGIC ---
  useEffect(() => {
    // Only start timer if we have time set > 0
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [timeLeft > 0]); // Dependency ensures timer starts once time is set

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // ... Rest of your handlers (handleOptionSelect, handleNext, etc.) ...

  const handleOptionSelect = (optionKey) => {
    const currentQId = questions[currentQuestionIndex].id;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQId]: optionKey,
    }));
  };

  const handleFlagToggle = () => {
    const currentQId = questions[currentQuestionIndex].id;
    setFlaggedQuestions((prev) =>
      prev.includes(currentQId)
        ? prev.filter((id) => id !== currentQId)
        : [...prev, currentQId]
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setIsSidebarOpen(false);
  };

  const handleAutoSubmit = () => {
    alert("Time Up! Submitting automatically...");
    submitQuiz();
  };

  const submitQuiz = async () => {
    clearInterval(timerRef.current);

    const storedStudent = localStorage.getItem("student");
    if (!storedStudent) {
      alert("User not logged in!");
      return;
    }
    const studentId = JSON.parse(storedStudent).id;

    const formattedAnswers = Object.entries(selectedAnswers).map(
      ([qId, ans]) => ({
        quizId: parseInt(qId), // Maps to the Question ID (Long)
        selectedAnswer: ans, // Maps to the selected option (String)
      })
    );

    const payload = {
      studentId: studentId,
      examId: examData.exam.id,
      answers: formattedAnswers,
    };

    console.log("Submitting Payload:", payload);

    await submitAnswer(payload);
  };

  // --- RENDER ---

  // Show loading if no data
  if (!examData || questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-700">Loading Exam...</h2>
        </div>
      </div>
    );
  }

  // --- HELPERS ---
  const getPaletteButtonClass = (index) => {
    const qId = questions[index].id;
    const isCurrent = index === currentQuestionIndex;
    const isAnswered = selectedAnswers[qId];
    const isFlagged = flaggedQuestions.includes(qId);

    if (isCurrent)
      return "ring-2 ring-offset-2 ring-indigo-600 bg-indigo-600 text-white font-bold";
    if (isFlagged) return "bg-yellow-400 text-white border-yellow-500";
    if (isAnswered) return "bg-green-500 text-white border-green-600";
    return "bg-white text-gray-700 border-gray-200 hover:bg-gray-50";
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent =
    (Object.keys(selectedAnswers).length / questions.length) * 100;
  const isUrgent = timeLeft < 300;

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div>
            <h1 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Exam In Progress
            </h1>
            <h2 className="text-lg font-bold text-gray-800 leading-none">
              {examData.exam.title}
            </h2>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-xl transition-colors ${
            isUrgent
              ? "bg-red-50 text-red-600 animate-pulse"
              : "bg-indigo-50 text-indigo-700"
          }`}
        >
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                {Object.keys(selectedAnswers).length} / {questions.length}{" "}
                Answered
              </span>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <button
                  onClick={handleFlagToggle}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    flaggedQuestions.includes(currentQuestion.id)
                      ? "text-yellow-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Flag
                    size={18}
                    fill={
                      flaggedQuestions.includes(currentQuestion.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                  {flaggedQuestions.includes(currentQuestion.id)
                    ? "Flagged"
                    : "Flag"}
                </button>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-snug">
                  {currentQuestion.question}
                </h3>
                <div className="grid gap-4">
                  {["a", "b", "c", "d"].map((optionKey) => {
                    const isSelected =
                      selectedAnswers[currentQuestion.id] === optionKey;
                    return (
                      <button
                        key={optionKey}
                        onClick={() => handleOptionSelect(optionKey)}
                        className={`group relative flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/50"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-gray-300 group-hover:border-indigo-400"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                          )}
                        </div>
                        <span
                          className={`text-base md:text-lg ${
                            isSelected
                              ? "font-semibold text-indigo-900"
                              : "text-gray-700"
                          }`}
                        >
                          {currentQuestion[optionKey]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all flex items-center gap-2 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col lg:relative lg:translate-x-0 lg:shadow-none lg:w-96 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-800">Question Palette</h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-500"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold border transition-all ${getPaletteButtonClass(
                    idx
                  )}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5 border-t border-gray-200 bg-gray-50">
            <button
              onClick={submitQuiz}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:from-emerald-600 hover:to-green-700 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} /> SUBMIT EXAM
            </button>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
