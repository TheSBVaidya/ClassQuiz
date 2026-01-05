import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  Award,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import useAdmin from "../../adminHooks";
import { ADMIN_ROUTES } from "../../admin.constant";

const QuizReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Destructure editExamId from state
  const { examConfig, questions, editExamId } = location.state || {};

  // Get both add and update functions
  const { addQuiz, updateQuiz } = useAdmin();

  // Safety check
  if (!examConfig || !questions) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-xl font-bold text-gray-700">No Exam Data Found</h2>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // --- HANDLER: PUBLISH OR UPDATE ---
  const handleFinalPublish = async () => {
    setIsSubmitting(true);

    try {
      if (editExamId) {
        // ==============================
        //  UPDATE FLOW
        // ==============================
        const updatePayload = {
          examId: editExamId,
          questions: questions.map((q) => ({
            id: q.id || null, // Send ID for existing Qs, null for new Qs
            question: q.questionText,
            a: q.optionA,
            b: q.optionB,
            c: q.optionC,
            d: q.optionD,
            // Assuming backend expects 'correct' or 'correctOption'
            // We strip 'option' from 'optionA' -> 'a'
            correctOption: q.correctOption.replace("option", "").toLowerCase(),
          })),
        };

        console.log("Sending Update Payload:", updatePayload);
        await updateQuiz(updatePayload); // Ensure this API exists in your hook
      } else {
        // ==============================
        //  CREATE FLOW
        // ==============================
        const createPayload = {
          examTitle: examConfig.title,
          questions: questions.map((q) => ({
            question: q.questionText,
            a: q.optionA,
            b: q.optionB,
            c: q.optionC,
            d: q.optionD,
            correctOption: q.correctOption.replace("option", "").toLowerCase(),
          })),
        };

        console.log("Sending Create Payload:", createPayload);
        await addQuiz(createPayload);
      }

      // Success Redirect
      navigate(ADMIN_ROUTES.DASHBOARD);
    } catch (error) {
      console.error("Failed to submit exam", error);
      // Optional: toast.error("Failed to save exam");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(ADMIN_ROUTES.ADD_QUESTIONS, {
      state: {
        examConfig: examConfig,
        initialQuestions: questions, // Pass questions back so data isn't lost
        editExamId: editExamId, // Maintain edit mode
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={handleBack}
              className="flex items-center text-gray-500 hover:text-indigo-600 mb-2 transition"
            >
              <ArrowLeft size={18} className="mr-1" /> Back to Edit
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {editExamId ? "Update Exam" : "Review New Exam"}
            </h1>
            <p className="text-gray-500">
              Review all details before publishing.
            </p>
          </div>
        </div>

        {/* Config Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">
            Exam Configuration
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Title
              </p>
              <div className="flex items-center gap-2 mt-1">
                <FileText size={18} className="text-indigo-500" />
                <span className="font-medium">{examConfig.title}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Duration
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={18} className="text-indigo-500" />
                <span className="font-medium">
                  {examConfig.durationMinutes} mins
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Marks Scheme
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Award size={18} className="text-green-500" />
                <span className="font-medium text-green-700">
                  +{examConfig.plusMarks}
                </span>
                <span className="font-medium text-red-500">
                  {examConfig.negativeMarks}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Questions
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-xl">{questions.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Preview List */}
        <div className="space-y-4 mb-24">
          {" "}
          {/* Added mb-24 for footer clearance */}
          <h3 className="text-lg font-bold text-gray-800">Questions Preview</h3>
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg border border-gray-200 relative"
            >
              {/* Show ID Badge if editing (Debugging Helper) */}
              {q.id && (
                <span className="absolute top-3 right-3 text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded border">
                  ID: {q.id}
                </span>
              )}

              <div className="flex gap-3">
                <span className="flex-shrink-0 bg-gray-100 text-gray-600 w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 mb-3">
                    {q.questionText}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {[
                      { key: "optionA", label: "A", val: q.optionA },
                      { key: "optionB", label: "B", val: q.optionB },
                      { key: "optionC", label: "C", val: q.optionC },
                      { key: "optionD", label: "D", val: q.optionD },
                    ].map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-2 rounded border flex items-center gap-2 ${
                          q.correctOption === opt.key
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-gray-50 border-gray-100 text-gray-600"
                        }`}
                      >
                        <span
                          className={`font-bold ${
                            q.correctOption === opt.key
                              ? "text-green-700"
                              : "text-gray-400"
                          }`}
                        >
                          {opt.label}.
                        </span>
                        {opt.val}
                        {q.correctOption === opt.key && (
                          <CheckCircle
                            size={14}
                            className="ml-auto text-green-600"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-center gap-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <button
            onClick={handleBack}
            className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50"
          >
            Back to Edit
          </button>
          <button
            onClick={handleFinalPublish}
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center gap-2 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Processing...
              </>
            ) : editExamId ? (
              "Update Exam"
            ) : (
              "Publish Exam"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;
