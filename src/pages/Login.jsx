// src/pages/Login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleForgotChange = (e) => {
    setForgotEmail(e.target.value);
    setForgotMsg("");
    setForgotError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.identifier) return setErrorMsg("Username or Email is required.");
    if (!formData.password) return setErrorMsg("Password is required.");

    try {
      const res = await axios.post("http://localhost:5050/api/auth/login", formData);
      const { token } = res.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      setErrorMsg(message);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotMsg("");
    setForgotError("");
    if (!forgotEmail) return setForgotError("Email is required.");

    try {
      const res = await axios.post("http://localhost:5050/api/auth/forgot-password", {
        email: forgotEmail,
      });
      setForgotMsg(res.data.message || "Check your email for reset instructions.");
      setForgotEmail("");
    } catch (err) {
      const message = err.response?.data?.message || "Request failed.";
      setForgotError(message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 text-white px-6 relative">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 z-10"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">Login</h2>

        {errorMsg && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{errorMsg}</div>}

        <input
          type="text"
          name="identifier"
          placeholder="Username or Email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          value={formData.identifier}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleChange}
            value={formData.password}
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-sm text-purple-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition duration-300">
          Login
        </button>

        <div className="text-center">
          <button
            type="button"
            className="text-purple-700 hover:underline mb-4"
            onClick={() => setShowForgotModal(true)}
          >
            Forgot Password?
          </button>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-700 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </motion.form>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="bg-white text-black p-6 rounded-lg max-w-sm w-full space-y-4 relative"
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Reset Password</h3>

            {forgotMsg && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{forgotMsg}</div>}
            {forgotError && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{forgotError}</div>}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleForgotChange}
                value={forgotEmail}
              />
              <div className="flex justify-between items-center">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition duration-300">
                  Send Reset Link
                </button>
                <button type="button" className="text-gray-600 hover:text-gray-800" onClick={() => setShowForgotModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Login;
