/**
 * @file Home.jsx
 * @description Main landing page for MediNest Healthcare Center.
 * Replicates the complete design in Screenshot 8 with high visual fidelity,
 * AOS scroll animations, interactive tabs, responsive doctor grid, and contact booking.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Clock,
  MapPin,
  PhoneCall,
  Star,
  Calendar,
  DollarSign,
  ArrowRight,
  Quote,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';
import { useDoctors } from '../../hooks/useDoctors.js';
import { useReviews } from '../../hooks/useReviews.js';
import { DOCTORS_DATA, QUICK_INFO_CARDS, TESTIMONIALS_DATA } from '../../data/mockData.js';

export default function Home() {
  const { data: doctorsData } = useDoctors();
  const { data: reviewsData } = useReviews();

  const doctors = Array.isArray(doctorsData) && doctorsData.length > 0 ? doctorsData : DOCTORS_DATA;
  const testimonials =
    Array.isArray(reviewsData) && reviewsData.length > 0 ? reviewsData : TESTIMONIALS_DATA;
  const navigate = useNavigate();

  // Active tab state in "Our Services"
  const [activeServiceTab, setActiveServiceTab] = useState('cavity');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    doctorName: 'Dr. Ruby Perrin',
    date: '2026-10-25',
    time: '10:00 AM',
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Appointment Requested!',
      text: `Thank you ${formData.name}, your request with ${formData.doctorName} on ${formData.date} at ${formData.time} has been received.`,
      confirmButtonColor: '#07332F',
    });
    setFormData({
      name: '',
      email: '',
      mobile: '',
      doctorName: 'Dr. Ruby Perrin',
      date: '2026-10-25',
      time: '10:00 AM',
    });
  };

  return (
    <>
      <Helmet>
        <title>MediNest - Your Best Medical Help Center</title>
        <meta
          name="description"
          content="MediNest provides world-class dental, orthodontic and clinical treatments with certified medical practitioners."
        />
      </Helmet>

      <div className="overflow-hidden">
        {/* ========================================================= */}
        {/* 1. HERO SECTION                                           */}
        {/* ========================================================= */}
        <section className="relative bg-[#07332F] text-white pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute top-10 left-5 w-48 h-24 border border-white/5 rounded-full rotate-45 pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-72 h-36 border border-white/5 rounded-full -rotate-12 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Left Text */}
              <div
                className="lg:col-span-6 space-y-6 text-center lg:text-left"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#F7A582] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Modern Medical Excellence
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight sm:leading-none">
                  Your Best Medical <br className="hidden sm:inline" />
                  <span className="text-[#F7A582]">Help Center</span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Experience compassionate, certified healthcare with painless treatments, cutting-edge technology, and seamless online scheduling tailored to your busy life.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link to="/appointment">
                    <Button variant="coral" size="lg" className="w-full sm:w-auto font-semibold px-8 py-3 rounded-xl shadow-lg shadow-[#F7A582]/20">
                      All Service
                    </Button>
                  </Link>
                  <a
                    href="#contact"
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 py-2"
                  >
                    <span>Contact Medical Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Hero Right Images Collage (Matching Screenshot 8) */}
              <div
                className="lg:col-span-6 relative flex justify-center"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="relative w-full max-w-lg h-[360px] sm:h-[420px] flex items-center justify-center">
                  
                  {/* Doctor Card 1: Top Right */}
                  <div className="absolute top-2 right-4 sm:right-10 w-44 sm:w-52 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300 z-20">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
                      alt="Doctor Female"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Doctor Card 2: Top Left */}
                  <div className="absolute top-8 left-4 sm:left-8 w-40 sm:w-48 h-52 sm:h-60 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-10">
                    <img
                      src="https://images.unsplash.com/photo-1594824813589-98380e227a69?auto=format&fit=crop&q=80&w=400"
                      alt="Doctor Consultant"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Doctor Card 3: Center Bottom */}
                  <div className="absolute bottom-0 w-44 sm:w-52 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform translate-y-2 hover:scale-105 transition-transform duration-300 z-30">
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
                      alt="Doctor Male"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. OUR SERVICES SECTION (Matching Screenshot 8)           */}
        {/* ========================================================= */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Professional Doctor Portrait */}
              <div
                className="lg:col-span-5 flex justify-center"
                data-aos="fade-right"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl max-w-sm border-8 border-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
                    alt="Senior Doctor with Clipboard"
                    className="w-full h-[460px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-md border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">Certified Specialists</p>
                      <p className="text-xs text-slate-500">100% Verified Medical Board</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Service Content & Dynamic Tabs */}
              <div
                className="lg:col-span-7 space-y-6"
                data-aos="fade-left"
              >
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    Our Services
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
                    Select from our clinically approved specialty categories to see tailored treatment protocols and restorative therapies.
                  </p>
                </div>

                {/* Service Filter Tabs */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {[
                    { id: 'cavity', label: 'Cavity Protection' },
                    { id: 'cosmetic', label: 'Cosmetic Dentistry' },
                    { id: 'surgery', label: 'Oral Surgery' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveServiceTab(tab.id)}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        activeServiceTab === tab.id
                          ? 'bg-[#F7A582] text-white shadow-md shadow-[#F7A582]/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Active Tab Card Content (Matching "Electro Gastrology Therapy" from Screenshot 8) */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-5">
                  <div className="rounded-xl overflow-hidden max-h-56">
                    <img
                      src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
                      alt="Dental treatment and diagnostics"
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {activeServiceTab === 'cavity' && 'Cavity Protection & Enamel Restoration'}
                      {activeServiceTab === 'cosmetic' && 'Aesthetic Alignment & Veneers'}
                      {activeServiceTab === 'surgery' && 'Minimal Invasive Oral Surgery'}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      Our modern dental operatory features gentle aerosol reduction, high-definition intraoral cameras, and rapid digital x-rays for immediate diagnoses and comfortable treatments.
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link to="/appointment">
                      <Button variant="outlineCoral" size="sm" className="font-semibold text-xs py-2 px-6">
                        More Details
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. QUICK INFO CARDS ROW (Matching Screenshot 8)           */}
        {/* ========================================================= */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Opening Hours */}
              <div
                className="bg-[#07332F] text-white p-7 rounded-2xl flex items-start gap-5 shadow-sm hover:translate-y-[-2px] transition-transform"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#F7A582]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Opening Hours</h4>
                  <p className="text-slate-300 text-sm mt-1">Open 9.00 am to 5.00pm Everyday</p>
                </div>
              </div>

              {/* Card 2: Our Locations */}
              <div
                className="bg-[#F7A582] text-white p-7 rounded-2xl flex items-start gap-5 shadow-sm hover:translate-y-[-2px] transition-transform"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Our Locations</h4>
                  <p className="text-white/90 text-sm mt-1">Dhanmondi 17, Dhaka - 1200, Bangladesh</p>
                </div>
              </div>

              {/* Card 3: Contact Us */}
              <div
                className="bg-[#07332F] text-white p-7 rounded-2xl flex items-start gap-5 shadow-sm hover:translate-y-[-2px] transition-transform"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6 text-[#F7A582]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Contact Us</h4>
                  <p className="text-slate-300 text-sm mt-1 whitespace-pre-line">+88 01750 00 00 00{'\n'}+88 01750 00 00 00</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. WHAT OUR PATIENTS SAYS (Testimonials)                 */}
        {/* ========================================================= */}
        <section id="reviews" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                What Our Patients Says
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-2">
                Real feedback from individuals and families who received dental care and clinical consultations at MediNest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((item, index) => (
                <div
                  key={item.id || item._id || index}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative flex flex-col justify-between"
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-[#F7A582]/20" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-100">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#F7A582]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. OUR EXPERT DOCTORS SECTION                            */}
        {/* ========================================================= */}
        <section id="doctors" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14" data-aos="fade-up">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our Expert Doctors
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-2">
                Certified doctors with decades of cumulative clinical expertise across general dentistry, surgery, and orthodontics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.slice(0, 3).map((doctor, index) => (
                <div
                  key={doctor.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl border ${
                    index === 0
                      ? 'border-2 border-[#F7A582] ring-4 ring-[#F7A582]/10'
                      : 'border-slate-200'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  {/* Doctor Image Container */}
                  <div className="h-56 overflow-hidden bg-slate-100 relative group">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#07332F] shadow-sm backdrop-blur-sm">
                        {doctor.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{doctor.degree}</p>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      {[...Array(doctor.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                      <span className="text-slate-500 ml-1">({doctor.reviewsCount || 100})</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#F7A582] shrink-0" />
                        <span className="truncate">{doctor.location}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#F7A582] shrink-0" />
                        <span>{doctor.availableDate}</span>
                      </p>
                      <p className="flex items-center gap-2 font-semibold text-slate-900">
                        <DollarSign className="w-3.5 h-3.5 text-[#F7A582] shrink-0" />
                        <span>${doctor.price} Consultation</span>
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link to={`/doctors/${doctor.id}`}>
                        <Button variant="coral" className="w-full py-2.5 font-semibold text-sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. CONTACT WITH US SECTION (Matching Screenshot 8)       */}
        {/* ========================================================= */}
        <section id="contact" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="bg-[#07332F] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
              data-aos="zoom-in"
              data-aos-duration="800"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left side info */}
                <div className="lg:col-span-5 space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Contact With Us
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Have an urgent dental query or wish to consult our specialist team? Leave your details below and our medical coordinators will confirm your booking within 15 minutes.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F7A582]">
                        <PhoneCall className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Call Us Anytime</p>
                        <p className="text-sm font-semibold text-white">+88 01750 00 00 00</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#F7A582]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Clinic Center</p>
                        <p className="text-sm font-semibold text-white">Dhanmondi, Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side form grid matching Screenshot 8 */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/10 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#F7A582]"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/10 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#F7A582]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Number"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          className="w-full bg-white/10 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#F7A582]"
                        />
                      </div>
                      <div>
                        <select
                          value={formData.doctorName}
                          onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                          className="w-full bg-[#0d4540] text-white text-sm rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#F7A582]"
                        >
                          <option value="Dr. Ruby Perrin">Dr. Ruby Perrin (Orthodontics)</option>
                          <option value="Dr. Kazi Rahman">Dr. Kazi Rahman (Oral Surgery)</option>
                          <option value="Dr. Mahfuzur Rahman">Dr. Mahfuzur Rahman (Pediatric)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white/10 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#F7A582]"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.time}
                          placeholder="Time (e.g. 10:00 AM)"
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full bg-white/10 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-[#F7A582]"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="coral"
                        className="w-full py-3.5 font-bold rounded-xl text-base shadow-lg cursor-pointer"
                      >
                        Book Now
                      </Button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
