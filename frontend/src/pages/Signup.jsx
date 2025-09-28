

import { useContext, useState } from "react";
import {
  UserPlus,
  Eye,
  LockKeyhole,
  EyeOff,
  Mail,
  ArrowRight,
  Home,
  Shield,
  Star,
  MapPin,
} from "lucide-react";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData, loading, setLoading } =
    useContext(userDataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student"); // "student" or "professional"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // Include userType in the form data
      const submitData = { ...formData, userType };
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        submitData
      );
      if (result.status === 201) {
        setUserData(result.data);
        setLoading(false);
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left side - Branding and features */}
        <div className="hidden md:block space-y-8 p-8">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">NestHub</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Find Your Perfect  Accommodation
          </h1>

          <p className="text-lg text-gray-600">
            Join thousands of students and professionals who found their ideal
            paying guest accommodation through our platform.
          </p>

          <div className="space-y-4 mt-8">
            {[
              {
                icon: <Home size={18} className="text-green-600" />,
                text: "Verified PG listings with photos",
              },
              {
                icon: <Shield size={18} className="text-green-600" />,
                text: "Secure booking process",
              },
              {
                icon: <Star size={18} className="text-green-600" />,
                text: "Honest tenant & landlord reviews",
              },
              {
                icon: <MapPin size={18} className="text-green-600" />,
                text: "Prime locations near colleges & offices",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  {feature.icon}
                </div>
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Signup form */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <UserPlus size={30} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Create your account
            </h2>
            <p className="text-gray-500 mt-2">
              Find your perfect accommodation in minutes
            </p>
          </div>

          {/* User type selection */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              I am a
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  userType === "student"
                    ? "bg-green-100 border-green-600 text-green-700 font-medium"
                    : "bg-gray-100 border-gray-200 text-gray-600"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType("professional")}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  userType === "professional"
                    ? "bg-green-100 border-green-600 text-green-700 font-medium"
                    : "bg-gray-100 border-gray-200 text-gray-600"
                }`}
              >
                Working Professional
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pl-10"
                  placeholder="Enter your email"
                />
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pl-10"
                  placeholder="Create a secure password"
                />
                <LockKeyhole
                  size={18}
                  className="absolute left-3 right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            {/* Additional field based on user type */}
            {userType === "student" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  College/University Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your college name"
                />
              </div>
            )}

            {userType === "professional" && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            {/* Terms */}
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
