/**
 * @file Login.jsx
 * @description Authentication Login page matching the MediNest split design style.
 * Includes Firebase auth, Google OAuth, and 1-click test credentials for instant preview.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button.jsx';
import AuthArt from './AuthArt.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(formData.email, formData.password);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.displayName || 'User'}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        toast.success('Signed in with Google successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Google sign in error.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click quick fill helpers for demonstration
  const fillPatientDemo = () => {
    setFormData({
      email: 'awlad@example.com',
      password: 'password123',
    });
  };

  const fillAdminDemo = () => {
    setFormData({
      email: 'admin.doctor@example.com',
      password: 'adminpassword123',
    });
  };

  return (
    <>
      <Helmet>
        <title>Sign In - MediNest Healthcare Center</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-100">
          
          {/* Left Side: Medical Art */}
          <div className="lg:col-span-5 bg-[#07332F]">
            <AuthArt />
          </div>

          {/* Right Side: Sign In Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-6">
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Sign In to MediNest
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Access your appointments, prescriptions, and healthcare records.
                </p>
              </div>

              {/* Quick Demo Helper Tabs */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                <span className="font-semibold text-slate-600">Quick Demo Fill:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={fillPatientDemo}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[#07332F] font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Patient Demo
                  </button>
                  <button
                    type="button"
                    onClick={fillAdminDemo}
                    className="px-2.5 py-1 rounded-md bg-[#07332F] text-white font-semibold hover:bg-[#0a4640] transition-colors cursor-pointer"
                  >
                    Admin Demo
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#F7A582] focus:bg-white"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Password
                    </label>
                    <span className="text-xs text-[#F7A582] hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#F7A582] focus:bg-white"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="coral"
                    loading={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md"
                  >
                    Sign In
                  </Button>
                </div>
              </form>

              {/* Or Google Sign-In */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Register link */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Please register at first.{' '}
                  <Link
                    to="/signup"
                    className="font-bold text-[#F7A582] hover:underline uppercase tracking-wide ml-1"
                  >
                    Go to SIGN UP
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
