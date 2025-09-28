



import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Logo from "@/components/Logo";
import {
  ShieldUser,
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
  Home,
  Shield,
  Star,
  LockKeyhole,
  MapPin,
} from "lucide-react";
import { userDataContext } from "../context/UserContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { serverUrl, setLoading, loading } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", formData);
      if (result.status === 201) {
        setUserData(result.data.user);
        setLoading(false);
        localStorage.setItem("token", result.data.token);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 flex items-center justify-center p-4">
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
            Welcome Back to Your Accomodation Hunting Journey
          </h1>

          <p className="text-lg text-gray-600">
            Log in to continue your search for the perfect paying guest
            accommodation tailored for students and professionals.
          </p>

          <div className="space-y-4 mt-8">
            {[
              {
                icon: <Home size={18} className="text-green-600" />,
                text: "Access your saved PG listings",
              },
              {
                icon: <Shield size={18} className="text-green-600" />,
                text: "Secure account protection",
              },
              {
                icon: <Star size={18} className="text-green-600" />,
                text: "Manage your bookings and inquiries",
              },
              {
                icon: <MapPin size={18} className="text-green-600" />,
                text: "Get personalized recommendations",
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

        {/* Right side - Login form */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <ShieldUser size={30} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-500 mt-2">
              Sign in to your NestHub account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pl-10"
                  placeholder="you@example.com"
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
                  placeholder="Enter your password"
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
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-green-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
            >
              Create account
            </a>
          </div>

          {/* Social login options */}
          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="mx-auto max-w-sm mt-4">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              {/* <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="ml-2">GitHub</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}











