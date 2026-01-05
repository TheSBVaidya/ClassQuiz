import { useState, useRef, useEffect } from "react";
import {
  PlayCircle,
  StopCircle,
  ChevronDown,
  Check,
  Globe,
  Wifi,
  Copy,
  ExternalLink,
  ClipboardCheck,
} from "lucide-react";
import useAdmin from "../../adminHooks";
import { ADMIN_STORAGE_KEYS } from "../../admin.constant";

const ExamControls = () => {
  const {
    examStart,
    examEnd,
    examTitles,
    examStatus,
    quetionTitles,
    examData,
  } = useAdmin();

  const [examActive, setExamActive] = useState(
    () => !!localStorage.getItem("selectedExamId")
  );
  const [selectedExam, setSelectedExam] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [examLink, setExamLink] = useState("");
  const [copied, setCopied] = useState(false);

  // --- Effects ---
  useEffect(() => {
    examTitles();
    const storedId = localStorage.getItem("selectedExamId");
    if (storedId) examStatus(storedId);
  }, []);

  useEffect(() => {
    const ip = localStorage.getItem(ADMIN_STORAGE_KEYS.IPV4);
    setExamLink(
      ip ? `http://${ip}:5173/student/login` : "Waiting for Network..."
    );
  }, []);

  useEffect(() => {
    if (examData && examData.id) {
      const isServerLive =
        String(examData.isLive) === "true" || examData.isLive === true;
      if (isServerLive) {
        setExamActive(true);
        setSelectedExam(examData);
        localStorage.setItem("selectedExamId", examData.id);
      } else {
        setExamActive(false);
        setSelectedExam(null);
        localStorage.removeItem("selectedExamId");
      }
    }
  }, [examData]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // --- Handlers ---
  const handleStart = async () => {
    if (selectedExam && selectedExam.id) {
      setExamActive(true);
      localStorage.setItem("selectedExamId", selectedExam.id);
      try {
        await examStart(selectedExam.id);
      } catch (error) {
        setExamActive(false);
        localStorage.removeItem("selectedExamId");
      }
    }
  };

  const handleStop = async () => {
    const idToStop = selectedExam?.id || localStorage.getItem("selectedExamId");
    if (idToStop) {
      try {
        await examEnd(idToStop);
        setExamActive(false);
        setSelectedExam(null);
        localStorage.removeItem("selectedExamId");
      } catch (error) {
        console.error("Stop failed", error);
      }
    }
  };

  const copyToClipboard = () => {
    if (examLink && examLink !== "Waiting for Network...") {
      navigator.clipboard.writeText(examLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#6366f1] rounded-2xl p-6 text-white shadow-xl relative overflow-visible h-full flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Globe className="text-white/80" size={20} /> Exam Controls
        </h2>

        {/* Status Badge */}
        {examActive ? (
          <div className="flex items-center gap-1.5 bg-red-500 px-3 py-1 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] font-bold text-white tracking-wide">
              LIVE
            </span>
          </div>
        ) : (
          <span className="text-white/60 text-xs font-medium bg-black/10 px-3 py-1 rounded-full">
            System Idle
          </span>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col justify-center">
        {examActive ? (
          // === LIVE STATE ===
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-5">
            {/* Link Section */}
            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
                  Student Link
                </span>
                <button
                  onClick={copyToClipboard}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded hover:bg-white/20"
                >
                  {copied ? (
                    <Check size={12} className="text-green-300" />
                  ) : (
                    <Copy size={12} />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-white rounded-lg p-1 flex items-center shadow-lg group relative">
                <div className="bg-gray-50 flex-1 rounded-md px-3 py-3 font-mono text-indigo-900 text-sm font-medium truncate select-all border border-transparent focus:border-indigo-300 transition-colors">
                  {examLink}
                </div>
                <a
                  href={examLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-indigo-400 hover:text-indigo-600 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Stop Button */}
            <button
              onClick={handleStop}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-[#ef4444] hover:bg-[#dc2626] text-white py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_0_rgb(185,28,28)] active:shadow-none active:translate-y-[4px] transition-all"
            >
              <StopCircle
                size={18}
                fill="currentColor"
                className="text-white/20"
              />
              <span>End Exam Session</span>
            </button>

            <div className="pt-2 text-center">
              <p className="text-xs text-indigo-100/70 flex items-center justify-center gap-2">
                <Wifi size={14} className="text-green-300" />
                Broadcasting:{" "}
                <span className="text-white font-bold truncate max-w-[150px]">
                  {selectedExam?.title}
                </span>
              </p>
            </div>
          </div>
        ) : (
          // === IDLE STATE (SELECTION) ===
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-white/70 font-bold px-1">
                Select Exam
              </label>
              {/* Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between shadow-sm
                        ${
                          isDropdownOpen
                            ? "bg-white text-indigo-900 ring-2 ring-indigo-300"
                            : "bg-black/20 text-white hover:bg-black/30"
                        }`}
                >
                  <span
                    className={`truncate ${
                      !selectedExam ? "text-white/60" : "font-bold"
                    }`}
                  >
                    {selectedExam?.title || "Choose an exam..."}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 opacity-60 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-indigo-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100 origin-top">
                    <div className="max-h-48 overflow-y-auto custom-scrollbar p-1">
                      {quetionTitles?.length > 0 ? (
                        quetionTitles.map((exam) => (
                          <div
                            key={exam.id}
                            onClick={() => {
                              setSelectedExam(exam);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-3 py-2.5 rounded-lg cursor-pointer flex items-center justify-between text-sm transition-colors mb-0.5
                                ${
                                  selectedExam?.id === exam.id
                                    ? "bg-indigo-50 text-indigo-700 font-bold"
                                    : "text-gray-600 hover:bg-gray-50"
                                }
                                `}
                          >
                            <span className="truncate">{exam.title}</span>
                            {selectedExam?.id === exam.id && (
                              <Check
                                size={14}
                                className="text-indigo-600 shrink-0"
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-xs text-gray-400">
                          No exams available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={!selectedExam}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] transition-all mt-2
                ${
                  selectedExam
                    ? "bg-white text-indigo-600 hover:bg-indigo-50 cursor-pointer shadow-[0_4px_0_rgb(226,232,240)]"
                    : "bg-black/20 text-white/40 cursor-not-allowed shadow-none active:translate-y-0"
                }
              `}
            >
              <PlayCircle
                size={18}
                fill={selectedExam ? "currentColor" : "none"}
                className={selectedExam ? "text-indigo-200" : "text-white/20"}
              />
              Start Broadcast
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamControls;
