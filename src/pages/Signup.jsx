import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.username) return setErrorMsg("Username is required.");
    if (!formData.email) return setErrorMsg("Email is required.");
    if (!formData.password) return setErrorMsg("Password is required.");

    try {
      const res = await axios.post("http://localhost:5050/api/auth/signup", formData);
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      const error =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Signup failed. Please try again.";
      setErrorMsg(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 text-white px-6">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">Sign Up</h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
            {errorMsg}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          value={formData.username}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
          value={formData.email}
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

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition duration-300"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-700 hover:underline">
            Login here
          </a>
        </p>
      </motion.form>
    </section>
  );
};

export default Signup;
