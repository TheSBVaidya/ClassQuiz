import { useEffect } from "react";
import useAdmin from "../../adminHooks";

const ResultView = ({ onBack, studentResult }) => {
  // 1. Get data and fetch function from hook
  const { answersData, getAllAnsweredQuiz } = useAdmin();

  // 2. Destructure student info safely
  const { examId, name, studentId } = studentResult || {};

  // 3. Fetch data on mount
  useEffect(() => {
    if (examId && studentId) {
      getAllAnsweredQuiz(examId, studentId);
    }
  }, [examId, studentId]);

  // 4. HELPER: Convert 'a','b','c','d' to 0,1,2,3 for array indexing
  const getIndex = (char) => {
    if (!char) return -1;
    return char.toLowerCase().charCodeAt(0) - 97;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium transition-colors"
        >
          ← Back to List
        </button>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {name || "Student Result"}
          </h2>
          <p className="text-xs text-gray-400">ID: {studentId}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 5. Safe Check: Ensure answersData exists and is an array */}
        {answersData && answersData.length > 0 ? (
          answersData.map((q, qIdx) => {
            // 6. Convert letters to indices
            const correctIndex = getIndex(q.correct);
            const studentIndex = getIndex(q.studentAns);

            // Determine Card Color
            const isAnswerCorrect = correctIndex === studentIndex;
            const cardBorderClass = isAnswerCorrect
              ? "border-green-200 bg-green-50/50"
              : "border-red-200 bg-red-50/50";

            return (
              <div
                key={qIdx}
                className={`p-5 rounded-xl border ${cardBorderClass} transition-all`}
              >
                <h4 className="font-bold text-gray-800 mb-3 text-lg">
                  <span className="text-gray-400 mr-2">Q{qIdx + 1}:</span>
                  {q.q}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    let optionClass = "bg-white border-gray-200 text-gray-600";
                    let icon = null;

                    // 7. Styling Logic using INDICES

                    // Is this the CORRECT answer?
                    if (optIdx === correctIndex) {
                      optionClass =
                        "bg-green-100 border-green-500 text-green-800 font-bold ring-1 ring-green-500";
                      icon = (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full ml-2">
                          Correct
                        </span>
                      );
                    }

                    // Is this what the STUDENT picked?
                    if (optIdx === studentIndex) {
                      if (isAnswerCorrect) {
                        // Correct pick (already styled above, add badge)
                        icon = (
                          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full ml-2">
                            Your Answer
                          </span>
                        );
                      } else {
                        // Wrong pick
                        optionClass =
                          "bg-red-100 border-red-500 text-red-800 font-bold ring-1 ring-red-500";
                        icon = (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ml-2">
                            Your Answer
                          </span>
                        );
                      }
                    }

                    return (
                      <div
                        // 8. Fix: Use Index as key to handle duplicate text options
                        key={optIdx}
                        className={`p-3 rounded-lg border flex items-center justify-between ${optionClass}`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Option Letter (A, B, C...) */}
                          <span className="w-6 h-6 rounded-full bg-white/50 border border-current flex items-center justify-center text-xs uppercase font-bold opacity-70 shrink-0">
                            {String.fromCharCode(97 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {icon}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            {answersData
              ? "No answers found for this student."
              : "Loading answer sheet..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultView;
