/**
 * @file About.jsx
 * @description About Us page for MediNest Healthcare Center.
 * Highlights mission, clinical hygiene standards, verified board physicians, and modern dental equipment.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Award, Users, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button.jsx';

export default function About() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Certified Sterilization',
      desc: 'All surgical and dental instruments undergo 4-tier autoclave sterilization meeting ISO standards.',
    },
    {
      icon: HeartHandshake,
      title: 'Painless Dentistry',
      desc: 'Advanced topical anesthetics, gentle vibration scalers, and soothing patient environment.',
    },
    {
      icon: Award,
      title: 'Award-Winning Specialists',
      desc: 'Our senior surgical team includes accredited members of international oral health associations.',
    },
    {
      icon: Users,
      title: 'Family Healthcare Plans',
      desc: 'Complete preventative checkups, pediatric dental fluoride, and geriatric tooth restorations.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - MediNest Healthcare Center</title>
      </Helmet>

      <div>
        {/* Banner */}
        <section className="bg-[#07332F] text-white py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Home / About Us</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2 text-white">
              About MediNest Healthcare
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-4">
              Dedicated to delivering international standard healthcare, compassionate patient care, and frictionless digital appointments since 2012.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold text-[#F7A582] uppercase tracking-wider">
                  Our Mission & Values
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Modern Medicine with a Human Touch
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Founded with a vision to eliminate the stress and anxiety associated with dental and clinical treatments, MediNest combines modern technology with genuine clinical empathy.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Every patient benefits from personalized treatment plans, transparent pricing, zero hidden charges, and continuous post-operative monitoring.
                </p>

                <div className="pt-2">
                  <Link to="/appointment">
                    <Button variant="coral" size="md">
                      Book a Consultation
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900"
                    alt="MediNest Reception & Clinical Facility"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFF0EC] flex items-center justify-center text-[#F7A582] mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
