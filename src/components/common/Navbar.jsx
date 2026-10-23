/**
 * @file Navbar.jsx
 * @description Main header and navigation bar matching the Doc House / MediNest design.
 * Features mobile drawer, active page highlighting, reliable user avatar with referrerPolicy,
 * and authenticated user controls across all device viewports.
 */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Plus, ChevronDown, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from './Button.jsx';

/**
 * Robust User Avatar component that supports Google profile pictures
 * with referrerPolicy="no-referrer" and graceful fallback to user initials.
 */
function UserAvatar({ user, size = 'w-8 h-8', textSize = 'text-xs' }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [user?.photoURL]);

  const initial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();

  if (!user?.photoURL || hasError) {
    return (
      <div
        className={`${size} rounded-full bg-gradient-to-tr from-[#0f4d47] to-[#F7A582] text-white font-bold flex items-center justify-center border border-[#F7A582] shadow-inner select-none shrink-0`}
        title={user?.displayName || user?.email}
      >
        <span className={textSize}>{initial}</span>
      </div>
    );
  }

  return (
    <img
      src={user.photoURL}
      alt={user?.displayName || 'User profile'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`${size} rounded-full object-cover border border-[#F7A582] shrink-0`}
    />
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut, isAdmin, toggleRole } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleLogout = async () => {
    await logOut();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-[#07332F] text-white sticky top-0 z-50 border-b border-[#0f4d47]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform">
              {/* Custom Medical Cross Flower Emblem from design */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-5 h-5 border-2 border-[#F7A582] rounded-md rotate-45" />
                <Plus className="w-4 h-4 text-white relative z-10 stroke-[2.5]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Medi<span className="text-[#F7A582]">Nest</span>
              </span>
              <span className="text-[10px] text-slate-300 font-medium tracking-widest uppercase -mt-1">
                Healthcare Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-[#F7A582] ${
                    isActive ? 'text-[#F7A582] font-semibold' : 'text-slate-200'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA / User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/15 transition-all cursor-pointer"
                >
                  <UserAvatar user={user} size="w-8 h-8" textSize="text-xs" />
                  <div className="text-left text-xs">
                    <p className="font-semibold text-white leading-tight">{user.displayName}</p>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#F7A582]/20 text-[#F7A582] uppercase">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold truncate text-slate-900">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      <span>{isAdmin ? 'Admin Dashboard' : 'My Appointments'}</span>
                    </Link>

                    {/* Quick Role Switcher for preview demonstration */}
                    <button
                      type="button"
                      onClick={() => {
                        toggleRole();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-purple-600" /> Switch Role Mode:
                      </span>
                      <span className="font-bold text-[#F7A582] uppercase">{user.role}</span>
                    </button>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="coral" size="sm" className="rounded-lg shadow-sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button & Profile Avatar */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <Link to="/dashboard" className="p-1" title="Go to Dashboard">
                <UserAvatar user={user} size="w-7 h-7" textSize="text-[11px]" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07332F] border-b border-[#0f4d47] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium bg-white/10 text-white"
                >
                  <LayoutDashboard className="w-5 h-5 text-[#F7A582]" />
                  <span>{isAdmin ? 'Admin Dashboard' : 'My Appointments'}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    toggleRole();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-1.5 text-xs text-[#F7A582] cursor-pointer"
                >
                  Switch Role Mode (Current: {user.role})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-rose-300 hover:bg-rose-900/20 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="coral" className="w-full py-2.5">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
