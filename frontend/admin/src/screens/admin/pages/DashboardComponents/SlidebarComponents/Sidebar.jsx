import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Settings, // Imported Settings icon for the new tab
} from "lucide-react";
import useAdmin from "../../../adminHooks";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAdmin();

  return (
    <div className="w-64 bg-gray-900 text-gray-300 flex flex-col fixed h-full transition-all">
      <div className="p-6 text-white text-2xl font-bold flex items-center gap-2">
        <LayoutDashboard className="text-indigo-400" /> Admin
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {/* 1. Dashboard Tab */}
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === "dashboard"
              ? "bg-indigo-600 text-white shadow-lg"
              : "hover:bg-gray-800"
          }`}
        >
          <LayoutDashboard size={20} /> Dashboard
        </button>

        {/* 2. Students Tab */}
        <button
          onClick={() => setActiveTab("students")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === "students"
              ? "bg-indigo-600 text-white shadow-lg"
              : "hover:bg-gray-800"
          }`}
        >
          <Users size={20} /> Students
        </button>

        {/* 3. Results Tab */}
        <button
          onClick={() => setActiveTab("results")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === "results"
              ? "bg-indigo-600 text-white shadow-lg"
              : "hover:bg-gray-800"
          }`}
        >
          <BarChart3 size={20} /> Results & Papers
        </button>

        {/* 4. NEW: Management Tab (Includes Delete, Update, Soft Delete) */}
        <button
          onClick={() => setActiveTab("management")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            activeTab === "management"
              ? "bg-indigo-600 text-white shadow-lg"
              : "hover:bg-gray-800"
          }`}
        >
          <Settings size={20} /> Management
        </button>
      </nav>

      {/* Bonus Feature: Quick Broadcast */}
      <div className="p-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <Bell size={14} className="text-yellow-400" /> Broadcast Msg
          </h4>
          <p className="text-xs text-gray-400 mb-2">
            Send "Time Remaining" to all active screens.
          </p>
          <button className="w-full bg-gray-700 hover:bg-gray-600 text-xs text-white py-2 rounded">
            Send Notification
          </button>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
