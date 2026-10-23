/**
 * @file Footer.jsx
 * @description Complete 4-column footer component matching the Doc House / MediNest layout.
 * Fully responsive across mobile, tablet, and desktop viewports.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from './Button.jsx';

export default function Footer() {
  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Service', path: '/appointment' },
    { label: 'Doctors', path: '/#doctors' },
    { label: 'Departments', path: '/appointment' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Online Payment', path: '/dashboard' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'My Account', path: '/dashboard' },
  ];

  const services = [
    'Pediatric Clinic',
    'Diagnosis Clinic',
    'Cardiac Clinic',
    'Laboratory Analysis',
    'Gynecological Clinic',
    'Personal Counseling',
    'Dental Clinic',
  ];

  const workingHours = [
    { day: 'Monday', hours: '10 am to 7 pm' },
    { day: 'Tuesday', hours: '10 am to 7 pm' },
    { day: 'Wednesday', hours: '10 am to 7 pm' },
    { day: 'Thursday', hours: '10 am to 7 pm' },
    { day: 'Friday', hours: '10 am to 7 pm' },
    { day: 'Saturday', hours: '10 am to 7 pm' },
    { day: 'Sunday', hours: '10 am to 7 pm' },
  ];

  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 text-slate-600 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#07332F] flex items-center justify-center">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <div className="absolute w-4 h-4 border-2 border-[#F7A582] rounded-sm rotate-45" />
                  <Plus className="w-3.5 h-3.5 text-white relative z-10 stroke-[2.5]" />
                </div>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Medi<span className="text-[#F7A582]">Nest</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Providing patient-first dental, clinical and emergency healthcare solutions. Advanced diagnostic tools, certified expert physicians, and frictionless appointments.
            </p>

            <div className="pt-2">
              <Link to="/appointment">
                <Button variant="outlineCoral" size="sm" className="font-semibold text-xs py-2 px-5">
                  Appointment
                </Button>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-slate-500 hover:text-[#F7A582] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: MediNest Services */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
              MediNest Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/appointment"
                    className="text-slate-500 hover:text-[#F7A582] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Working Hours */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 tracking-tight">
              Working Hours
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {workingHours.map((item) => (
                <li key={item.day} className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-medium text-slate-700">{item.day}</span>
                  <span className="text-slate-500">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 text-center text-xs text-slate-400">
          <p>Copyright © 2026 - All right reserved by MediNest Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
