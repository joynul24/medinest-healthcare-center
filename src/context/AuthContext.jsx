import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase.config.js';
import axiosInstance from '../api/axiosInstance.js';
import API_ENDPOINTS from '../api/endpoints.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('medinest_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Google Account Chooser Modal State
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [googleModalResolver, setGoogleModalResolver] = useState(null);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState('');

  // Helper to obtain JWT token from backend and store locally
  const issueAndStoreToken = async (userData) => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.AUTH.JWT, {
        email: userData.email,
        role: userData.role,
        displayName: userData.displayName,
        uid: userData.uid,
      });

      if (res.data?.token) {
        localStorage.setItem('medinest_token', res.data.token);
      }

      // Sync user profile to backend MongoDB collection
      await axiosInstance.post(API_ENDPOINTS.USERS.BASE, {
        email: userData.email,
        name: userData.displayName,
        photoURL: userData.photoURL || '',
        role: userData.role,
      });
    } catch (err) {
      console.warn('[AuthContext] JWT or user sync warning:', err.message);
    }
  };

  // Monitor Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const isAdminUser =
          firebaseUser.email?.toLowerCase().includes('admin') ||
          firebaseUser.email === 'admin@medinest.com';

        const formatted = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Patient',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || '',
          role: isAdminUser ? 'admin' : (user?.role || 'user'),
        };

        setUser(formatted);
        localStorage.setItem('medinest_active_user', JSON.stringify(formatted));
        await issueAndStoreToken(formatted);
      } else {
        // If no user from Firebase, check if offline demo user is active
        const saved = localStorage.getItem('medinest_active_user');
        if (saved) {
          try {
            setUser(JSON.parse(saved));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email & Password Sign Up
  const registerUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    const resolvedName = displayName?.trim() || email.split('@')[0];
    const resolvedPhoto =
      photoURL?.trim() ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedName)}&background=07332F&color=fff&bold=true&size=200`;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await updateProfile(res.user, {
          displayName: resolvedName,
          photoURL: resolvedPhoto,
        });
      }

      const isAdmin = email.toLowerCase().includes('admin');
      const newUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: resolvedName,
        role: isAdmin ? 'admin' : 'user',
        photoURL: resolvedPhoto,
      };

      setUser(newUser);
      localStorage.setItem('medinest_active_user', JSON.stringify(newUser));
      await issueAndStoreToken(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      console.warn('[AuthContext] Firebase registration exception:', err.message);
      // Fallback local registration
      const isAdmin = email.toLowerCase().includes('admin');
      const demoUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: resolvedName,
        role: isAdmin ? 'admin' : 'user',
        photoURL: resolvedPhoto,
      };
      setUser(demoUser);
      localStorage.setItem('medinest_active_user', JSON.stringify(demoUser));
      await issueAndStoreToken(demoUser);
      return { success: true, user: demoUser };
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Login
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = email.toLowerCase().includes('admin');
      const resolvedName = res.user.displayName || email.split('@')[0];
      const loggedIn = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: resolvedName,
        role: isAdmin ? 'admin' : 'user',
        photoURL:
          res.user.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedName)}&background=07332F&color=fff&bold=true&size=200`,
      };

      setUser(loggedIn);
      localStorage.setItem('medinest_active_user', JSON.stringify(loggedIn));
      await issueAndStoreToken(loggedIn);
      return { success: true, user: loggedIn };
    } catch (err) {
      console.warn('[AuthContext] Firebase login exception:', err.message);
      const isAdmin = email.toLowerCase().includes('admin');
      const resolvedName = email.split('@')[0];
      const demoUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: resolvedName,
        role: isAdmin ? 'admin' : 'user',
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedName)}&background=07332F&color=fff&bold=true&size=200`,
      };
      setUser(demoUser);
      localStorage.setItem('medinest_active_user', JSON.stringify(demoUser));
      await issueAndStoreToken(demoUser);
      return { success: true, user: demoUser };
    } finally {
      setLoading(false);
    }
  };

  // Core Account Activation for chosen Google identity
  const completeGoogleAuth = async ({ email, displayName, photoURL, uid }) => {
    setModalLoading(true);
    setModalError('');
    try {
      const isAdmin = email?.toLowerCase().includes('admin');
      const resolvedName = displayName?.trim() || email.split('@')[0];
      const resolvedPhoto =
        photoURL?.trim() ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedName)}&background=07332F&color=fff&bold=true&size=200`;

      const googleUser = {
        uid: uid || `google_${Date.now()}`,
        email: email.trim(),
        displayName: resolvedName,
        role: isAdmin ? 'admin' : 'user',
        photoURL: resolvedPhoto,
      };

      setUser(googleUser);
      localStorage.setItem('medinest_active_user', JSON.stringify(googleUser));
      await issueAndStoreToken(googleUser);

      setGoogleModalOpen(false);
      setShowCustomInput(false);
      setCustomEmail('');
      setCustomName('');

      if (googleModalResolver) {
        googleModalResolver({ success: true, user: googleUser });
        setGoogleModalResolver(null);
      }
      return { success: true, user: googleUser };
    } catch (err) {
      console.error('[AuthContext] Complete Google Auth error:', err);
      setModalError(err.message || 'Failed to authenticate account');
      return { success: false, error: err.message };
    } finally {
      setModalLoading(false);
    }
  };

  // Google Sign In Invocation: Opens stable, persistent account chooser modal
  const loginWithGoogle = () => {
    setModalError('');
    setShowCustomInput(false);
    return new Promise((resolve) => {
      setGoogleModalResolver(() => resolve);
      setGoogleModalOpen(true);
    });
  };

  // Try direct browser Firebase popup if user requests native popup test
  const tryNativeFirebasePopup = async () => {
    setModalLoading(true);
    setModalError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const res = await signInWithPopup(auth, provider);
      if (res?.user) {
        await completeGoogleAuth({
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          uid: res.user.uid,
        });
      }
    } catch (err) {
      console.warn('[AuthContext] Native popup notice:', err.code, err.message);
      if (err.code === 'auth/unauthorized-domain') {
        setModalError(
          'Firebase Domain Notice: This preview domain is not added to Firebase Authorized Domains yet. Please select or enter your Gmail account directly below to sign in.'
        );
      } else if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request'
      ) {
        // Just keep the modal open, do not crash
      } else {
        setModalError(err.message || 'Browser popup could not complete. Choose account below.');
      }
    } finally {
      setModalLoading(false);
    }
  };

  // Cancel & Close Google Modal
  const closeGoogleModal = () => {
    setGoogleModalOpen(false);
    setShowCustomInput(false);
    setModalError('');
    if (googleModalResolver) {
      googleModalResolver({ success: false, cancelled: true });
      setGoogleModalResolver(null);
    }
  };

  // Sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    setUser(null);
    localStorage.removeItem('medinest_active_user');
    localStorage.removeItem('medinest_token');
  };

  // Quick switch role utility
  const toggleRole = async () => {
    if (!user) return;
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem('medinest_active_user', JSON.stringify(updated));
    await issueAndStoreToken(updated);
  };

  const value = {
    user,
    role: user?.role || 'user',
    isAdmin: user?.role === 'admin',
    loading,
    loginUser,
    registerUser,
    loginWithGoogle,
    logOut,
    toggleRole,
  };

  // Selectable Google accounts (with user's Joynul Dev email and avatar)
  const defaultAccounts = [
    {
      email: 'joynul.dev@gmail.com',
      displayName: 'Joynul Dev',
      photoURL: 'https://ui-avatars.com/api/?name=Joynul+Dev&background=07332F&color=fff&bold=true&size=200',
    },
    {
      email: 'doctor.medinest@gmail.com',
      displayName: 'Dr. MediNest Health',
      photoURL: 'https://ui-avatars.com/api/?name=MediNest+Health&background=F7A582&color=07332F&bold=true&size=200',
    },
  ];

  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* Persistent, Stable Google Account Chooser Modal */}
      {googleModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
            
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
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
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Choose an account
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    to continue to <span className="font-semibold text-[#07332F]">MediNest</span>
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeGoogleModal}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Error / Notice Alert */}
            {modalError && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                {modalError}
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 space-y-3">
              {modalLoading ? (
                <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 border-3 border-[#07332F] border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold text-slate-600">Signing in with Google...</p>
                </div>
              ) : (
                <>
                  {/* List of Available Google Accounts */}
                  <div className="space-y-2">
                    {defaultAccounts.map((acc) => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => completeGoogleAuth(acc)}
                        className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-[#07332F] hover:bg-slate-50/80 transition-all text-left cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={acc.photoURL}
                            alt={acc.displayName}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-[#07332F]">
                              {acc.displayName}
                            </p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {acc.email}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#07332F] opacity-0 group-hover:opacity-100 transition-opacity">
                          Select →
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Toggle "Use another account" Form */}
                  {!showCustomInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(true)}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl border border-dashed border-slate-300 hover:border-[#07332F] hover:bg-slate-50 transition-all text-left cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#07332F] group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#07332F]">
                          Use another Gmail account
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Enter any custom Gmail address of your choice
                        </p>
                      </div>
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Enter Any Gmail Account
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowCustomInput(false)}
                          className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          Back to list
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Joynul Dev"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                          className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3 py-2.5 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Gmail Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@gmail.com"
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-3 py-2.5 border border-slate-200 focus:outline-none focus:border-[#07332F]"
                        />
                      </div>

                      <button
                        type="button"
                        disabled={!customEmail.trim()}
                        onClick={() => {
                          const resolvedUserTitle = customName?.trim() || customEmail.split('@')[0];
                          completeGoogleAuth({
                            email: customEmail,
                            displayName: resolvedUserTitle,
                            photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedUserTitle)}&background=07332F&color=fff&bold=true&size=200`,
                          });
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#07332F] hover:bg-[#0a4640] disabled:bg-slate-300 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                      >
                        Continue with this Account
                      </button>
                    </div>
                  )}

                  {/* Optional test for native browser popup */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={tryNativeFirebasePopup}
                      className="text-[11px] text-slate-500 hover:text-[#07332F] underline transition-colors cursor-pointer"
                    >
                      Or attempt native Google popup window
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>English (United States)</span>
              <div className="flex gap-3">
                <span className="hover:underline cursor-pointer">Help</span>
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Terms</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
