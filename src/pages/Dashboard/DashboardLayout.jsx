/**
 * @file DashboardLayout.jsx
 * @description Master dashboard shell replicating the dark green header and sidebar layout
 * from Screenshots 1, 9, 10, 11, 13, and 14.
 * Adapts navigation items based on whether the active user is an Admin or Patient.
 */

import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Home,
  Users,
  UserPlus,
  Stethoscope,
  CalendarCheck,
  Star,
  Clock,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Shield,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function DashboardLayout() {
  const { user, isAdmin, toggleRole, logOut } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  // Admin specific navigation links (Screenshots 1, 9, 10, 11)
  const adminNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'All Users', path: '/dashboard/all-users', icon: Users },
    { label: 'Add a Doctor', path: '/dashboard/add-doctor', icon: UserPlus },
    { label: 'Manage Doctors', path: '/dashboard/manage-doctors', icon: Stethoscope },
    { label: 'Home', path: '/', icon: Home },
  ];

  // Patient / User navigation links (Screenshots 13, 14)
  const patientNavItems = [
    { label: 'My Appointments', path: '/dashboard', icon: CalendarCheck },
    { label: 'My Reviews', path: '/dashboard/my-reviews', icon: Star },
    { label: 'My History', path: '/dashboard/my-history', icon: Clock },
    { label: 'Home', path: '/', icon: Home },
  ];

  const currentNavItems = isAdmin ? adminNavItems : patientNavItems;

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER BAR (Dark Green #07332F from Screenshots)  */}
      {/* ========================================================= */}
      <header className="bg-[#07332F] text-white sticky top-0 z-40 border-b border-[#0b4842] shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Sidebar"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <div className="absolute w-3.5 h-3.5 border border-[#F7A582] rounded-xs rotate-45" />
                  <Plus className="w-3 h-3 text-white relative z-10 stroke-[2.5]" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Medi<span className="text-[#F7A582]">Nest</span>
              </span>
            </Link>
          </div>

          {/* Center/Right: Navigation Links & Profile Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-medium text-slate-200">
              <Link to="/" className="hover:text-[#F7A582] transition-colors">Home</Link>
              <Link to="/about" className="hover:text-[#F7A582] transition-colors">About</Link>
              <Link to="/appointment" className="hover:text-[#F7A582] transition-colors">Appointment</Link>
              <Link to="/reviews" className="hover:text-[#F7A582] transition-colors">Reviews</Link>
              <Link to="/contact" className="hover:text-[#F7A582] transition-colors">Contact Us</Link>
            </nav>

            {/* Notification Bell (from Screenshot 1) */}
            <div className="relative">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/15 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F7A582] rounded-full" />
              </button>
            </div>

            {/* User Profile Avatar & Role Indicator */}
            <div className="flex items-center gap-3">
              <img
                src={
                  user?.photoURL ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
                }
                alt={user?.displayName || 'User'}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                }}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#F7A582]"
              />
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-rose-300 hover:text-rose-100 hidden sm:flex items-center gap-1 cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. BODY LAYOUT: SIDEBAR + MAIN CONTENT AREA               */}
      {/* ========================================================= */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 self-start sticky top-24 space-y-6">
          
          {/* Role Mode Banner */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${isAdmin ? 'text-purple-600' : 'text-emerald-600'}`} />
              <span className="text-xs font-bold text-slate-800 capitalize">
                {isAdmin ? 'Admin Console' : 'Patient View'}
              </span>
            </div>
            <button
              type="button"
              onClick={toggleRole}
              className="text-[10px] font-semibold text-[#F7A582] hover:underline cursor-pointer"
              title="Toggle between Patient & Admin view"
            >
              Switch
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/'
                  ? false
                  : location.pathname === item.path ||
                    (item.path === '/dashboard' && location.pathname === '/dashboard');

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive: matchActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      matchActive
                        ? 'bg-slate-100 text-slate-900 shadow-sm font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Exit */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="font-bold text-slate-900 text-base">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Mode: <span className="text-[#F7A582] uppercase">{user?.role}</span>
                  </span>
                  <button
                    type="button"
                    onClick={toggleRole}
                    className="text-xs text-[#07332F] font-bold"
                  >
                    Switch
                  </button>
                </div>

                <nav className="space-y-2">
                  {currentNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-rose-600 text-sm font-semibold p-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Main Workspace Outlet */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
