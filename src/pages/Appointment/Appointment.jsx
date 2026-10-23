/**
 * @file Appointment.jsx
 * @description Complete interactive Appointment Booking page replicating Screenshots 2, 3, and 4.
 * Features dynamic month calendar picker, service selection cards, time slots grid,
 * and the exact popup booking modal with validation and persistence.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Smile,
  Sparkles,
  ShieldCheck,
  Activity,
  HeartHandshake,
  Stethoscope,
} from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';
import { useServices } from '../../hooks/useServices.js';
import { SERVICES_DATA } from '../../data/mockData.js';
import { useBookAppointment } from '../../hooks/useAppointments.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Appointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const bookAppointmentMutation = useBookAppointment();
  const { data: servicesData } = useServices();

  const servicesList =
    Array.isArray(servicesData) && servicesData.length > 0 ? servicesData : SERVICES_DATA;

  // Selected date state
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 9, 28)); // Oct 28, 2026
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // Oct 2026

  // Selected service state (defaults to Teeth Orthodontics)
  const [selectedServiceId, setSelectedServiceId] = useState('teeth-orthodontics');

  // Modal booking state
  const [activeSlot, setActiveSlot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    email: user?.email || '',
  });

  const selectedService =
    servicesList.find((s) => s.id === selectedServiceId) || servicesList[0];

  // Helper icons mapper
  const getServiceIcon = (name) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-6 h-6 text-rose-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-orange-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-pink-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-cyan-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-purple-500" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-emerald-500" />;
      default:
        return <Activity className="w-6 h-6 text-[#F7A582]" />;
    }
  };

  // Calendar calculations
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDateDisplay = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleOpenBooking = (slot) => {
    setActiveSlot(slot);
    setFormData({
      name: user?.displayName || '',
      phone: '',
      email: user?.email || '',
    });
    setModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Please provide your name, phone number, and email address.',
        confirmButtonColor: '#07332F',
      });
      return;
    }

    try {
      await bookAppointmentMutation.mutateAsync({
        name: formData.name,
        userEmail: formData.email,
        phone: formData.phone,
        date: formatDateDisplay(selectedDate),
        time: activeSlot.time,
        treatment: selectedService.title,
        price: selectedService.price || 200,
      });

      setModalOpen(false);

      Swal.fire({
        icon: 'success',
        title: 'Appointment Booked!',
        html: `Your appointment for <b>${selectedService.title}</b> on <b>${formatDateDisplay(selectedDate)}</b> at <b>${activeSlot.time}</b> has been booked successfully!`,
        showCancelButton: true,
        confirmButtonText: 'Go to Dashboard',
        cancelButtonText: 'Book Another',
        confirmButtonColor: '#07332F',
        cancelButtonColor: '#F7A582',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard');
        }
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Unable to register appointment. Please retry.',
        confirmButtonColor: '#07332F',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Appointment Booking - MediNest Healthcare Center</title>
        <meta
          name="description"
          content="Select a clinical service and pick an available slot to book your appointment online."
        />
      </Helmet>

      <div>
        {/* ========================================================= */}
        {/* TOP BANNER (Matching Screenshot 3 & 4)                    */}
        {/* ========================================================= */}
        <section className="bg-[#07332F] text-white py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute right-12 top-8 w-44 h-20 border-2 border-white/10 rounded-full rotate-45 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Home / Appointment</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mt-2 text-white">
              Appointment
            </h1>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CALENDAR & CLINIC PHOTO (Matching Screenshot 3 & 4)       */}
        {/* ========================================================= */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Interactive Calendar Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 w-full max-w-md">
                  {/* Calendar Month Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 py-4">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* Day Numbers Grid */}
                  <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                    {/* Empty placeholder days */}
                    {[...Array(firstDayIndex)].map((_, i) => (
                      <div key={`empty-${i}`} className="p-2" />
                    ))}

                    {/* Active days */}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const dayNumber = i + 1;
                      const isSelected =
                        selectedDate.getDate() === dayNumber &&
                        selectedDate.getMonth() === currentMonth.getMonth() &&
                        selectedDate.getFullYear() === currentMonth.getFullYear();

                      return (
                        <button
                          key={`day-${dayNumber}`}
                          type="button"
                          onClick={() => {
                            setSelectedDate(
                              new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber)
                            );
                          }}
                          className={`p-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#07332F] text-white shadow-md scale-105'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                      Selected Date:{' '}
                      <span className="font-bold text-[#07332F]">{formatDateDisplay(selectedDate)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinic Operatory Photo (Matching Screenshot) */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-xl w-full">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=900"
                    alt="MediNest Dental Operatory Clinic"
                    className="w-full h-[340px] sm:h-[400px] object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SERVICE SELECTION (Matching Screenshot 3 & 4)             */}
        {/* ========================================================= */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm text-[#F7A582] font-semibold tracking-wide uppercase">
                Available Services on {formatDateDisplay(selectedDate)}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Please select a service.
              </h2>
            </div>

            {/* 6 Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((service) => {
                const isSelected = service.id === selectedServiceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`bg-white rounded-2xl p-6 text-left shadow-sm border transition-all cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? 'border-2 border-[#F7A582] shadow-lg ring-4 ring-[#F7A582]/10 scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${service.badgeColor}`}>
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{service.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{service.shortDesc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* AVAILABLE SLOTS (Matching Screenshot 3)                   */}
        {/* ========================================================= */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Available slots for {selectedService.title}.
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Choose a suitable time slot for {formatDateDisplay(selectedDate)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedService.slots.map((slot) => (
                <div
                  key={slot.id}
                  className="bg-white rounded-2xl p-7 text-center shadow-sm border border-slate-200 hover:shadow-lg transition-all flex flex-col items-center justify-between space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FFF0EC] flex items-center justify-center text-[#F7A582]">
                    <Clock className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{selectedService.title}</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">
                      {slot.time}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">
                      {slot.spaces} SPACES AVAILABLE
                    </p>
                  </div>

                  <div className="w-full pt-2">
                    <Button
                      onClick={() => handleOpenBooking(slot)}
                      variant="coral"
                      className="w-full py-2.5 font-bold uppercase tracking-wider text-xs rounded-xl"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BOOKING POPUP MODAL (Matching Screenshot 2)               */}
        {/* ========================================================= */}
        {modalOpen && activeSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedService.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#07332F] text-white flex items-center justify-center hover:bg-[#0a4640] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Booking Form (Matching screenshot layout) */}
              <form onSubmit={handleModalSubmit} className="space-y-4 mt-6">
                {/* Readonly Date Input */}
                <div>
                  <input
                    type="text"
                    readOnly
                    value={formatDateDisplay(selectedDate)}
                    className="w-full bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 border border-slate-200 cursor-not-allowed"
                  />
                </div>

                {/* Readonly Time Input */}
                <div>
                  <input
                    type="text"
                    readOnly
                    value={activeSlot.time}
                    className="w-full bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 border border-slate-200 cursor-not-allowed"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:ring-1 focus:ring-[#07332F]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:ring-1 focus:ring-[#07332F]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:ring-1 focus:ring-[#07332F]"
                  />
                </div>

                {/* Submit Button (Dark Green button as shown in Screenshot 2) */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="teal"
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md"
                    loading={bookAppointmentMutation.isPending}
                  >
                    Submit
                  </Button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
