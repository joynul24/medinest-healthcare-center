/**
 * @file Contact.jsx
 * @description Dedicated Contact Us page for MediNest Healthcare Center.
 * Features clinical address cards, 24/7 emergency hotline, interactive appointment inquiry form,
 * clinic location map view, and patient FAQ accordion.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  PhoneCall,
  MapPin,
  Clock,
  Mail,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  Building,
} from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    department: 'Teeth Orthodontics',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: 'How quickly do you confirm online appointment bookings?',
      a: 'All appointment requests submitted online through MediNest are confirmed by our clinical desk within 15 to 30 minutes via SMS and email.',
    },
    {
      q: 'Do you offer emergency dental trauma and tooth extraction services?',
      a: 'Yes, our emergency dental operatory is equipped 24/7 with dedicated on-call oral surgeons for trauma, acute tooth pain, and immediate restorations.',
    },
    {
      q: 'What payment methods do you accept at MediNest clinic?',
      a: 'We accept all major Visa, Mastercard, American Express cards, online mobile payments, and direct hospital insurance claims.',
    },
    {
      q: 'Is valet parking and wheelchair access available at the clinic?',
      a: 'Yes, our Dhanmondi central clinic provides dedicated complimentary valet parking and complete ramp and elevator access for wheelchairs.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please fill in your name, email, and message.',
        confirmButtonColor: '#07332F',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Message Sent Successfully!',
      html: `Thank you <b>${formData.name}</b>, your message regarding <b>${formData.subject}</b> has been dispatched. Our patient coordinator will contact you at <b>${formData.email}</b> shortly.`,
      confirmButtonColor: '#07332F',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      department: 'Teeth Orthodontics',
      message: '',
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - MediNest Healthcare Center</title>
        <meta
          name="description"
          content="Get in touch with MediNest medical coordinators, consult on-call dentists, or locate our Dhanmondi branch in Dhaka."
        />
      </Helmet>

      <div>
        {/* Banner Section */}
        <section className="bg-[#07332F] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute right-12 top-6 w-44 h-24 border-2 border-white/10 rounded-full rotate-45 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Home / Contact Us</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2 text-white">
              Contact Our Medical Desk
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              We are available round-the-clock for dental inquiries, patient consultations, and specialist appointments.
            </p>
          </div>
        </section>

        {/* 4 Quick Info Contact Cards */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Phone */}
              <div className="bg-[#07332F] text-white p-7 rounded-2xl flex items-start gap-4 shadow-sm hover:translate-y-[-2px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#F7A582]">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold">Call Hotline</h4>
                  <p className="text-xs text-slate-300 mt-1">+88 01750 00 00 00</p>
                  <p className="text-xs text-slate-300">+88 01750 11 11 11</p>
                </div>
              </div>

              {/* Card 2: Email */}
              <div className="bg-slate-50 text-slate-800 p-7 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm hover:translate-y-[-2px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[#FFF0EC] flex items-center justify-center shrink-0 text-[#F7A582]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Email Desk</h4>
                  <p className="text-xs text-slate-500 mt-1">support@medinest.com</p>
                  <p className="text-xs text-slate-500">appointment@medinest.com</p>
                </div>
              </div>

              {/* Card 3: Location */}
              <div className="bg-[#F7A582] text-white p-7 rounded-2xl flex items-start gap-4 shadow-sm hover:translate-y-[-2px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold">Clinic Branch</h4>
                  <p className="text-xs text-white/90 mt-1">House 42, Road 11, Dhanmondi 32</p>
                  <p className="text-xs text-white/90">Dhaka - 1209, Bangladesh</p>
                </div>
              </div>

              {/* Card 4: Working Hours */}
              <div className="bg-slate-50 text-slate-800 p-7 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm hover:translate-y-[-2px] transition-transform">
                <div className="w-12 h-12 rounded-xl bg-[#07332F]/10 flex items-center justify-center shrink-0 text-[#07332F]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Visiting Hours</h4>
                  <p className="text-xs text-slate-500 mt-1">Mon - Sun: 09:00 AM - 08:00 PM</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-0.5">Emergency: 24 Hours Open</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Main Content: Form & Location Details */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Interactive Contact Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#F7A582] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Direct Contact
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                    Send Us a Message
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Fill out the form below and our medical team will get back to you with prompt advice.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+88 01700 000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Department</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                      >
                        <option value="Teeth Orthodontics">Teeth Orthodontics</option>
                        <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                        <option value="Teeth Cleaning">Teeth Cleaning</option>
                        <option value="Cavity Protection">Cavity Protection</option>
                        <option value="Oral Surgery">Oral Surgery</option>
                        <option value="Emergency Care">Emergency Care</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Inquiry Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Braces Consultation or Toothache"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Message / Symptoms</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your medical query, symptoms, or preferred consultation dates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="coral"
                      icon={Send}
                      className="w-full py-3.5 rounded-xl font-bold text-sm shadow-md cursor-pointer"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right Column: Clinic Facilities & Map Representation */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Facility Card */}
                <div className="bg-[#07332F] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#F7A582]">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Central Clinical Branch</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    MediNest Healthcare Center features 6 advanced dental operatories, digital panoramic x-ray rooms, sterile recovery pods, and an in-house pharmacy.
                  </p>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#F7A582] font-semibold">Dhanmondi, Dhaka</span>
                    <span className="text-slate-300">Open 7 Days a Week</span>
                  </div>
                </div>

                {/* Styled Map Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Find Us On Google Maps</h4>
                  <div className="h-56 rounded-2xl overflow-hidden relative border border-slate-100 bg-slate-100">
                    {/* Visual Map Representation */}
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=700"
                      alt="Dhanmondi Area Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#07332F]/30 backdrop-blur-xs flex items-center justify-center p-4">
                      <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl text-center max-w-xs">
                        <MapPin className="w-6 h-6 text-[#F7A582] mx-auto mb-1 animate-bounce" />
                        <p className="text-xs font-bold text-slate-900">MediNest Healthcare Center</p>
                        <p className="text-[10px] text-slate-500">Dhanmondi 32, Dhaka</p>
                        <a
                          href="https://maps.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-2 text-[11px] font-bold text-[#F7A582] hover:underline"
                        >
                          Open in Google Maps →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold text-[#F7A582] uppercase tracking-wider">
                Common Inquiries
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-[#07332F] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#F7A582] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
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
