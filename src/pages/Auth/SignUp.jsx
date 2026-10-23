/**
 * @file SignUp.jsx
 * @description Registration page replicating the layout and styling in Screenshot 6.
 * Features split-screen view with custom medical art on the left and form on the right.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { UploadCloud, Check, Image as ImageIcon } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import AuthArt from './AuthArt.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { uploadImageToImgBB } from '../../utils/imageUpload.js';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    photoURL: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    setUploadingImage(true);
    try {
      const hostedUrl = await uploadImageToImgBB(file);
      setFormData((prev) => ({ ...prev, photoURL: hostedUrl }));
      toast.success('Photo uploaded to ImgBB successfully!');
    } catch (err) {
      toast.error(err.message || 'Image upload to ImgBB failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const finalPhoto = formData.photoURL?.trim() || DEFAULT_AVATAR;
      const res = await registerUser(
        formData.email,
        formData.password,
        formData.name,
        finalPhoto
      );
      if (res.success) {
        toast.success(`Welcome to MediNest, ${formData.name}!`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res.success) {
        toast.success('Signed in with Google successfully!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error('Google sign in error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up to MediNest - Healthcare Center</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-100">
          
          {/* Left Side: Medical Art (Screenshot 6) */}
          <div className="lg:col-span-5 bg-[#07332F]">
            <AuthArt />
          </div>

          {/* Right Side: Sign Up Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-6">
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Sign Up to MediNest
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Create an account to book specialist appointments and track medical history.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#F7A582] focus:bg-white"
                  />
                </div>

                {/* Profile Photo: ImgBB Device Upload & URL */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Profile Picture
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Hosted on ImgBB
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Live Preview Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#F7A582] shrink-0 bg-slate-100 flex items-center justify-center shadow-xs">
                      {uploadingImage ? (
                        <div className="w-5 h-5 border-2 border-[#07332F] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <img
                          src={formData.photoURL?.trim() || DEFAULT_AVATAR}
                          alt="Avatar preview"
                          onError={(e) => {
                            e.currentTarget.src = DEFAULT_AVATAR;
                          }}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* ImgBB Device File Upload Button */}
                    <div className="flex-1 space-y-2">
                      <label className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 hover:border-[#07332F] rounded-xl text-xs font-semibold text-slate-700 cursor-pointer transition-all">
                        <UploadCloud className="w-4 h-4 text-[#F7A582]" />
                        <span>
                          {uploadingImage
                            ? 'Uploading to ImgBB...'
                            : formData.photoURL
                            ? 'Change Photo on ImgBB'
                            : 'Upload Photo from Device (ImgBB)'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingImage}
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>

                      {/* Or direct URL input */}
                      <input
                        type="url"
                        placeholder="Or paste direct image URL here..."
                        value={formData.photoURL}
                        onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                        className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:border-[#F7A582] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

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
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#F7A582] focus:bg-white"
                  />
                </div>

                {/* Submit Button (Coral `#F7A582` from design) */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="coral"
                    loading={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md"
                  >
                    Create Account
                  </Button>
                </div>
              </form>

              {/* Or Google Sign-In */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
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

              {/* Already registered footer link */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Already registered?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-[#F7A582] hover:underline uppercase tracking-wide ml-1"
                  >
                    Go to SIGN IN
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
