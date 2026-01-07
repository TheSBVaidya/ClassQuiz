import { useState } from "react";
import useAdmin from "../hooks/adminHooks";

const LoginPage = () => {
  const { authStatus, login } = useAdmin();
  const [email, setEmail] = useState("sanjay");
  const [password, setPassword] = useState("Sanjay@180");

  const handleSignIn = () => {
    login(email, password);
  };

  return (
    // Background with a subtle gradient
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
        {/* Header Section */}
        <div className="p-8 pb-0 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white/50"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {/* <a
                  href="#"
                  className="text-xs text-indigo-600 hover:text-indigo-500 font-semibold"
                >
                  Forgot password?
                </a> */}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white/50"
                placeholder="••••••••"
              />
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              type="button" // Change to 'submit' when handling logic
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
