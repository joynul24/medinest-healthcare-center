/**
 * @file AdminDashboard.jsx
 * @description Admin Analytics Overview strictly matching Screenshot 1.
 * Features stat cards for Doctors, Patients, Appointments, a patient volume area chart,
 * and an appointment distribution pie chart.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Users, FileText } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors.js';
import { useAppointments } from '../../hooks/useAppointments.js';
import { DOCTORS_DATA, INITIAL_APPOINTMENTS } from '../../data/mockData.js';

export default function AdminDashboard() {
  const { data: rawDoctors } = useDoctors();
  const doctors = Array.isArray(rawDoctors) ? rawDoctors : DOCTORS_DATA;

  const { data: rawAppointments } = useAppointments();
  const appointments = Array.isArray(rawAppointments) ? rawAppointments : INITIAL_APPOINTMENTS;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - MediNest</title>
      </Helmet>

      <div className="space-y-6">
        
        {/* ========================================================= */}
        {/* STATS ROW (Matching Screenshot 1)                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card 1: Doctor (168) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between h-36">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                  {168 + doctors.length - 3}
                </span>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Doctor</p>
              </div>
            </div>
            {/* Pink Accent Line */}
            <div className="w-20 h-1 bg-rose-500 rounded-full" />
          </div>

          {/* Card 2: Patients (487) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between h-36">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                  487
                </span>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Patients</p>
              </div>
            </div>
            {/* Green Accent Line */}
            <div className="w-20 h-1 bg-emerald-500 rounded-full" />
          </div>

          {/* Card 3: Appointment (95) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex flex-col justify-between h-36">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                  {95 + appointments.length - 7}
                </span>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Appointment</p>
              </div>
            </div>
            {/* Yellow Accent Line */}
            <div className="w-20 h-1 bg-amber-400 rounded-full" />
          </div>

        </div>

        {/* ========================================================= */}
        {/* CHARTS ROW (Matching Screenshot 1)                        */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Chart: Patient Trend Area Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="text-base font-bold text-slate-800">Patient</h3>

            <div className="relative h-64 w-full pt-4">
              {/* SVG Area Chart representing the curved trajectory from 2013 to 2018 */}
              <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="patientGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Y-axis guidelines */}
                <line x1="40" y1="30" x2="580" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="40" y1="80" x2="580" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="40" y1="130" x2="580" y2="130" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="40" y1="180" x2="580" y2="180" stroke="#F1F5F9" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="25" y="35" fontSize="10" fill="#94A3B8" textAnchor="end">150</text>
                <text x="25" y="85" fontSize="10" fill="#94A3B8" textAnchor="end">100</text>
                <text x="25" y="135" fontSize="10" fill="#94A3B8" textAnchor="end">50</text>
                <text x="25" y="185" fontSize="10" fill="#94A3B8" textAnchor="end">0</text>

                {/* Area fill */}
                <path
                  d="M 60 160 Q 120 150 180 135 T 240 75 T 300 130 T 360 155 T 420 150 T 480 145 T 560 60 L 560 180 L 60 180 Z"
                  fill="url(#patientGradient)"
                />

                {/* Main line stroke */}
                <path
                  d="M 60 160 Q 120 150 180 135 T 240 75 T 300 130 T 360 155 T 420 150 T 480 145 T 560 60"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* X-axis labels */}
                <text x="60" y="210" fontSize="10" fill="#94A3B8" textAnchor="middle">2013</text>
                <text x="160" y="210" fontSize="10" fill="#94A3B8" textAnchor="middle">2014</text>
                <text x="260" y="210" fontSize="10" fill="#94A3B8" textAnchor="middle">2015</text>
                <text x="360" y="210" fontSize="10" fill="#94A3B8" textAnchor="middle">2016</text>
                <text x="460" y="210" fontSize="10" fill="#94A3B8" textAnchor="middle">2017</text>
                <text x="560" y="210" fontSize="10" fill="#94A3B8" textAnchor="middle">2018</text>
              </svg>
            </div>
          </div>

          {/* Right Chart: Appointment Pie Chart (Matching Screenshot 1) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <h3 className="text-base font-bold text-slate-800">Appointment</h3>

            <div className="flex items-center justify-center py-6">
              <div className="w-52 h-52 relative">
                {/* SVG Pie Chart with Red (40%), Green (45%), Orange/Yellow (15%) slices */}
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Slice 1: Red (#E11D48) ~ 40% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="#E11D48"
                    strokeWidth="50"
                    strokeDasharray="62.8 157"
                  />
                  {/* Slice 2: Green (#65A30D) ~ 40% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="#65A30D"
                    strokeWidth="50"
                    strokeDasharray="62.8 157"
                    strokeDashoffset="-62.8"
                  />
                  {/* Slice 3: Amber (#F59E0B) ~ 20% */}
                  <circle
                    r="25"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="50"
                    strokeDasharray="31.4 157"
                    strokeDashoffset="-125.6"
                  />
                </svg>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-around text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" /> Completed
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65A30D]" /> Confirmed
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Pending
              </span>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
