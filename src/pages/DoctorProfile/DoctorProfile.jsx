/**
 * @file DoctorProfile.jsx
 * @description Doctor details and profile page faithfully reproducing Screenshot 7.
 * Includes interactive tab navigation (Overview, Locations, Reviews, Business Hours),
 * credentials display, awards list, and direct appointment CTA.
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Star,
  MapPin,
  Clock,
  Award,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Calendar,
  Share2,
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { useDoctor } from '../../hooks/useDoctors.js';

export default function DoctorProfile() {
  const { id } = useParams();
  const { data: doctor, isLoading } = useDoctor(id || 'doc-1');
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#07332F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'locations', label: 'Locations' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'business-hours', label: 'Business Hours' },
  ];

  return (
    <>
      <Helmet>
        <title>{doctor.name} - Profile & Credentials | MediNest</title>
        <meta
          name="description"
          content={`Book an appointment with ${doctor.name}, specialist in ${doctor.specialty} at MediNest.`}
        />
      </Helmet>

      <div>
        {/* Top Banner */}
        <section className="bg-[#07332F] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Home / Doctor Profile</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2 text-white">
              Doctor Profile
            </h1>
          </div>
        </section>

        {/* Doctor Header Card (Matching Screenshot 7) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Doctor Photo */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-4 border-slate-50 shadow-md">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Bio Details */}
            <div className="space-y-3 text-center md:text-left flex-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{doctor.name}</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{doctor.degree}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(doctor.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-xs font-semibold text-slate-500 ml-1.5">
                  ({doctor.reviewsCount || 35})
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{doctor.location}</span>
                <span className="text-[#F7A582] hover:underline cursor-pointer font-medium ml-1">
                  - Get Directions
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                {(doctor.tags || ['Dental Filling', 'Teeth Whitening']).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md text-xs font-medium border border-slate-200 text-slate-600 bg-slate-50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Booking Link */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link to="/appointment">
                  <Button variant="coral" size="sm" className="font-bold px-6">
                    Book Appointment
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  title="Share profile link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation & Detailed Contents (Matching Screenshot 7) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
            
            {/* Tabs List */}
            <div className="flex flex-wrap gap-2 pb-8 border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#F7A582] text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW (Matching Screenshot 7 precisely) */}
            {activeTab === 'overview' && (
              <div className="pt-8 space-y-10">
                {/* About Me */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">About Me</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {doctor.about}
                  </p>
                </div>

                {/* 2-Column Credentials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Left Column: Education, Work, Services */}
                  <div className="space-y-8">
                    {/* Education */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-[#F7A582]" /> Education
                      </h4>
                      <ul className="space-y-3 text-xs sm:text-sm">
                        {doctor.education?.map((edu, idx) => (
                          <li key={idx} className="border-l-2 border-[#F7A582] pl-3">
                            <p className="font-semibold text-slate-800">{edu.institution}</p>
                            <p className="text-slate-500">{edu.degree}</p>
                            <p className="text-slate-400 text-xs">{edu.year}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Work & Experience */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#07332F]" /> Work & Experience
                      </h4>
                      <ul className="space-y-3 text-xs sm:text-sm">
                        {doctor.experience?.map((exp, idx) => (
                          <li key={idx} className="border-l-2 border-[#07332F] pl-3">
                            <p className="font-semibold text-slate-800">{exp.role}</p>
                            <p className="text-slate-500 text-xs">{exp.period}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-3">Services</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                        {doctor.services?.map((srv, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F7A582]" />
                            <span>{srv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Awards & Specializations */}
                  <div className="space-y-8">
                    {/* Awards */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" /> Awards
                      </h4>
                      <ul className="space-y-4 text-xs sm:text-sm">
                        {doctor.awards?.map((award, idx) => (
                          <li key={idx} className="border-l-2 border-amber-400 pl-3">
                            <p className="text-xs text-slate-400">{award.year}</p>
                            <p className="font-semibold text-slate-800">{award.title}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{award.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specializations */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-3">Specializations</h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
                        {doctor.specializations?.map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#07332F]" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: LOCATIONS */}
            {activeTab === 'locations' && (
              <div className="pt-8 space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-base">MediNest Primary Branch</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    House 42, Road 11, Dhanmondi 32, Dhaka 1209, Bangladesh
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Emergency Hotline: +88 01750 00 00 00</p>
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-700">Valet Parking Available</span>
                    <span className="text-[#F7A582] font-semibold">Elevator & Wheelchair Access</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="pt-8 space-y-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">5.0 / 5.0</h4>
                    <p className="text-xs text-slate-500">Based on 142 Verified Patient Reviews</p>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BUSINESS HOURS */}
            {activeTab === 'business-hours' && (
              <div className="pt-8 max-w-md">
                <div className="space-y-3">
                  {doctor.businessHours?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm"
                    >
                      <span className="font-semibold text-slate-800">{item.day}</span>
                      <span className="text-slate-500">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
