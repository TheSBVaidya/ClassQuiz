import {
  Plus,
  ArrowLeft,
  Trash2,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "../../admin.constant";
import useAdmin from "../../adminHooks";

const AddQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { quiz, fetchQuiz } = useAdmin();

  const {
    examConfig = { title: "Update Exam", totalMarks: 0, plusMarks: 1 },
    initialQuestions,
    editExamId,
  } = location.state || {};

  // --- 1. Calculate Target Questions ---
  const totalMarks = parseFloat(examConfig.totalMarks) || 0;
  const marksPerQuestion = parseFloat(examConfig.plusMarks) || 1;
  const targetQuestionCount =
    marksPerQuestion > 0 ? Math.floor(totalMarks / marksPerQuestion) : 0;

  const [isLoading, setIsLoading] = useState(!!editExamId);
  // --- 2. Initialize State with Auto-Generated Blocks ---
  const [questions, setQuestions] = useState(() => {
    // If we are coming back from Review, use those
    if (initialQuestions && initialQuestions.length > 0) {
      return initialQuestions;
    }

    if (editExamId) {
      return [];
    }
    // Otherwise, generate the exact number of blank questions needed
    const initialCount = targetQuestionCount > 0 ? targetQuestionCount : 1;

    return Array.from({ length: initialCount }).map(() => ({
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "optionA",
    }));
  });

  // Track which question is currently expanded (open) for editing
  // Default to the first question (index 0)
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (editExamId) {
      fetchQuiz(editExamId);
    }
  }, [editExamId]);

  useEffect(() => {
    console.log("QUIZ: ", quiz);
    if (editExamId && quiz && quiz.length > 0) {
      console.log("Populating Form with API Data:", quiz);

      const mappedQuestions = quiz.map((q) => {
        // Helper to determine correct option from API (handles "a", "A", "optionA", etc.)
        let correctVal = "optionA";
        if (q.correct) {
          const val = q.correct.toLowerCase();
          if (val === "a" || val === "optiona") correctVal = "optionA";
          else if (val === "b" || val === "optionb") correctVal = "optionB";
          else if (val === "c" || val === "optionc") correctVal = "optionC";
          else if (val === "d" || val === "optiond") correctVal = "optionD";
        }

        return {
          id: q.id,
          // Fix 1: Map 'question' from API to 'questionText' in state
          questionText: q.question || q.q || "",

          // Fix 2: Map 'a', 'b', 'c', 'd' directly
          optionA: q.a || (q.options && q.options[0]) || "",
          optionB: q.b || (q.options && q.options[1]) || "",
          optionC: q.c || (q.options && q.options[2]) || "",
          optionD: q.d || (q.options && q.options[3]) || "",

          correctOption: correctVal,
        };
      });

      setQuestions(mappedQuestions);
      setIsLoading(false);
    }
  }, [quiz, editExamId]);

  const handleReviewClick = () => {
    // Validation
    if (questions.length === 0) {
      alert("Please add at least one question before reviewing.");
      return;
    }

    const isValid = questions.every(
      (q) => q.questionText.trim() !== "" && q.optionA.trim() !== ""
    );

    if (!isValid) {
      if (
        !window.confirm(
          "Some questions appear incomplete. Proceed to review anyway?"
        )
      )
        return;
    }

    navigate("/admin/quiz-review", {
      state: {
        examConfig: examConfig,
        questions: questions,
        editExamId: editExamId,
      },
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestionBlock = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "optionA",
      },
    ]);
    // Automatically open the new question
    setExpandedIndex(questions.length);
  };

  const removeQuestionBlock = (index, e) => {
    e.stopPropagation(); // Prevent toggling accordion when clicking delete
    if (questions.length <= 1) return;
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    // Adjust expanded index if needed
    if (expandedIndex === index) setExpandedIndex(null);
  };

  // Helper to check if a specific question is filled out (for UI status)
  const isQuestionFilled = (q) => {
    return q.questionText.trim() !== "" && q.optionA.trim() !== "";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* --- Sticky Header with Stats --- */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(ADMIN_ROUTES.DASHBOARD)}
            className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1 mb-1"
          >
            <ArrowLeft size={14} /> Back to Config
          </button>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {examConfig.title}
          </h2>
        </div>

        {/* Progress Bar / Stats */}
        <div className="flex items-center gap-6 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Target
            </p>
            <p className="font-bold text-gray-800">{targetQuestionCount} Qs</p>
          </div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Current
            </p>
            <p
              className={`font-bold ${
                questions.length === targetQuestionCount
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {questions.length} Qs
            </p>
          </div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Marks
            </p>
            <p className="font-bold text-indigo-600">
              {questions.length * marksPerQuestion} / {totalMarks}
            </p>
          </div>
        </div>
      </div>

      {/* --- Questions List (Accordion Style) --- */}
      <div className="space-y-4">
        {questions.map((q, index) => {
          const isOpen = expandedIndex === index;
          const isFilled = isQuestionFilled(q);

          return (
            <div
              key={index}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "shadow-md border-indigo-500 ring-1 ring-indigo-500"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(index)}
                className="p-4 flex items-center justify-between cursor-pointer bg-gray-50/50 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                      isFilled
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700">
                      {q.questionText ? (
                        q.questionText.length > 50 ? (
                          q.questionText.substring(0, 50) + "..."
                        ) : (
                          q.questionText
                        )
                      ) : (
                        <span className="text-gray-400 italic">
                          Empty Question
                        </span>
                      )}
                    </span>
                    {!isOpen && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        {isFilled ? (
                          <CheckCircle2 size={12} className="text-green-500" />
                        ) : (
                          <AlertCircle size={12} className="text-orange-400" />
                        )}
                        {isFilled ? "Ready" : "Incomplete"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => removeQuestionBlock(index, e)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove Question"
                  >
                    <Trash2 size={16} />
                  </button>
                  {isOpen ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              {/* Accordion Body (Form) - Only rendered if open */}
              {isOpen && (
                <div className="p-6 border-t border-gray-100 animate-fadeIn">
                  <div className="space-y-4">
                    {/* Question Text */}
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                        Question Text
                      </label>
                      <textarea
                        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-shadow"
                        rows="2"
                        placeholder="Type the question here..."
                        value={q.questionText}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "questionText",
                            e.target.value
                          )
                        }
                        autoFocus
                      ></textarea>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["A", "B", "C", "D"].map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-400 w-6 text-center">
                            {opt}.
                          </span>
                          <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder={`Option ${opt}`}
                            value={q[`option${opt}`]}
                            onChange={(e) =>
                              handleQuestionChange(
                                index,
                                `option${opt}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {/* Correct Answer */}
                    <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg border border-indigo-100 mt-2">
                      <label className="text-sm font-bold text-indigo-900">
                        Correct Answer:
                      </label>
                      <div className="flex gap-2">
                        {["optionA", "optionB", "optionC", "optionD"].map(
                          (optValue, i) => (
                            <button
                              key={optValue}
                              onClick={() =>
                                handleQuestionChange(
                                  index,
                                  "correctOption",
                                  optValue
                                )
                              }
                              className={`px-3 py-1 rounded text-xs font-bold border ${
                                q.correctOption === optValue
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"
                              }`}
                            >
                              {["A", "B", "C", "D"][i]}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Controls (Static at bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-8 border-t border-gray-200">
        <button
          onClick={addNewQuestionBlock}
          className="py-3.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add Extra Question
        </button>

        <button
          onClick={handleReviewClick}
          className="py-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <FileText size={20} /> Review & Submit
        </button>
      </div>
    </div>
  );
};

export default AddQuestions;
