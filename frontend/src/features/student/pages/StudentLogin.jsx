import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, Wifi } from "lucide-react";
import useStudent from "../hooks/studentHooks";

const StudentLogin = () => {
  const { studentLogin } = useStudent();
  const navigate = useNavigate();
  const [email, setEmail] = useState("STU7575979");
  const [password, setPassword] = useState("6JM0KYCO");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username: email,
      password,
    };

    await studentLogin(payload);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Mobile Friendly Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center">
          <div className="inline-flex bg-white/20 p-3 rounded-full mb-4">
            <Wifi className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Student Portal</h1>
          <p className="text-indigo-200 text-sm mt-1">
            Please login to start your exam
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="enter your username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95"
            >
              {loading ? "Logging in..." : "Access Exam"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        </div>
      </div>

      {/* Footer info for verification */}
      <div className="mt-8 text-center text-gray-400 text-xs">
        {/* Connected to Server: {apiClient.defaults.baseURL} */}
      </div>
    </div>
  );
};

export default StudentLogin;
