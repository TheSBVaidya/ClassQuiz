import { useState } from "react";

import ResultView from "../components/ResultView";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/Sidebar/SideDashboard";
import Students from "../components/Sidebar/SideStudents";
import Results from "../components/Sidebar/SideResults";
import Management from "../components/Sidebar/SideManagement";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudentResult, setSelectedStudentResult] = useState(null);

  const name = JSON.parse(localStorage.getItem("admin")).username;

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return <Dashboard />;
    }

    if (activeTab === "students") {
      return <Students />;
    }

    if (activeTab === "results") {
      if (selectedStudentResult) {
        return (
          <ResultView
            onBack={() => setSelectedStudentResult(null)}
            studentResult={selectedStudentResult}
          />
        );
      }
      return <Results setSelectedStudentResult={setSelectedStudentResult} />;
    }

    if (activeTab === "management") {
      return <Management />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab} Overview
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-800">{name}</p>
              <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-8">{renderContent()}</main>
      </div>
    </div>
  );
}
