import React, { useContext, useState } from 'react';
import style from './Login.module.css'
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../Context/Usercontext';
import { AllOrdersContext } from '../../Context/AllordersContext';

export default function Login() {
  let {UserLogin, setUserLogin} = useContext(UserContext);
  let {loadUserOrders} = useContext(AllOrdersContext);
  let navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handelLogin(values) {
    setIsLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setIsLoading(false);
        
        console.log("Full Response:", res.data);
        console.log("User object:", res.data.user);
        console.log("Token:", res.data.token);
        
        if (res.data.message === "success") {
          localStorage.setItem("UserToken", res.data.token);

          const userId = res.data.user?._id || 
                        res.data.user?.id || 
                        res.data.userData?._id || 
                        res.data.userId ||
                        res.data.id;
          
          console.log("Extracted userId:", userId);
          
          if (userId) {
            localStorage.setItem("UserId", userId);
            console.log("✅ UserId saved to localStorage");
          } else {
            console.warn("❌ No userId found in response");
            
            const tokenUserId = getUserIdFromToken(res.data.token);
            if (tokenUserId) {
              localStorage.setItem("UserId", tokenUserId);
              console.log("✅ UserId extracted from token:", tokenUserId);
            }
          }

          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        setApiError(res.response?.data?.message || "Something went wrong");
      });
  }

  function getUserIdFromToken(token) {
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decoded = JSON.parse(jsonPayload);
      console.log("Decoded token:", decoded);
      return decoded.id || decoded.userId || decoded._id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  let myValidation = yup.object().shape({
    email: yup.string()
      .email("not valid Email")
      .required("Email is required"),
    password: yup.string()
      .required("password is required")
      .min(6,"password min length is 6"),
  });

  let formik = useFormik({
    initialValues:{
      email: "",
      password: "", 
    },
    validationSchema: myValidation,
    onSubmit: handelLogin,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl mb-4 shadow-xl transform hover:rotate-12 transition-all duration-300">
              <i className="fa-solid fa-right-to-bracket text-white text-3xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
              Welcome Back
            </h2>
          </div>

          {/* Error Message */}
          {ApiError && (
            <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-xl flex items-center gap-3 shadow-md">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="font-bold text-sm">Error</p>
                <p className="text-sm">{ApiError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-envelope text-gray-400 group-focus-within:text-emerald-600 transition-colors"></i>
              </div>
              <input
                type="email"
                name="email" 
                id="email" 
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full pl-12 pr-4 py-4 text-gray-900 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all peer placeholder-transparent shadow-sm hover:shadow-md" 
                placeholder="Email" 
                required 
              />
              <label 
                htmlFor="email" 
                className="absolute left-12 -top-3 bg-white px-2 text-sm font-semibold text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Email Address
              </label>
              {formik.errors.email && formik.touched.email && (
                <div className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{formik.errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-lock text-gray-400 group-focus-within:text-emerald-600 transition-colors"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formik.values.password} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full pl-12 pr-12 py-4 text-gray-900 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all peer placeholder-transparent shadow-sm hover:shadow-md"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
              <label 
                htmlFor="password" 
                className="absolute left-12 -top-3 bg-white px-2 text-sm font-semibold text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-emerald-600 peer-focus:text-sm"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password && (
                <div className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{formik.errors.password}</span>
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={IsLoading}
              className="w-full relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
            >
              <span className="flex items-center justify-center gap-3">
                {IsLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <i className="fa-solid fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
                  </>
                )}
              </span>
            </button>

            {/* Register Link */}
            <div className="text-center pt-6 border-t-2 border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/Register" 
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors inline-flex items-center gap-2 group"
                >
                  Register Now
                  <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}