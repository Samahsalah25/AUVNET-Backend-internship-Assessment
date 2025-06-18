import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import bgImage from "../assets/Register.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });
      toast.success("Login was successful!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => navigate("/products"), 1000);
    } catch (err) {
      const message =
        err.response?.data?.details?.[0] ||
        err.response?.data?.message ||
        "Failed to login";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Image Section */}
      <div className="relative hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src={bgImage}
          alt="Login background"
          className="object-cover w-full h-full opacity-70"
        />
        <div className="absolute text-white text-center p-6">
          <h1 className="text-4xl font-bold drop-shadow-md mb-2"> AUVNET ELECTRIC ⚡</h1>
          <p className="text-lg drop-shadow-sm">
            Welcome Back! Let's Power Up 🔌
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-teal-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;
