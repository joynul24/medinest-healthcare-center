/**
 * @file MyAppointments.jsx
 * @description Patient appointments table and interactive payment modal strictly matching Screenshots 13 and 12.
 * Allows patients to view upcoming appointments and complete the $200 treatment checkout.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X, CreditCard, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import Button from '../../components/common/Button.jsx';
import { useAppointments, usePayAppointment } from '../../hooks/useAppointments.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { INITIAL_APPOINTMENTS } from '../../data/mockData.js';

export default function MyAppointments() {
  const { user } = useAuth();
  const { data: rawAppointments, isLoading } = useAppointments();
  const appointments = Array.isArray(rawAppointments) ? rawAppointments : INITIAL_APPOINTMENTS;
  const payAppointmentMutation = usePayAppointment();

  // Payment modal state
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expCvc: '12/28  345',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpenPay = (appointment) => {
    setSelectedAppointment(appointment);
    setPaymentForm({
      cardNumber: '4242 •••• •••• 4242',
      expCvc: '12/28  345',
    });
  };

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await payAppointmentMutation.mutateAsync({
        id: selectedAppointment.id,
        paymentInfo: paymentForm,
      });

      setIsProcessing(false);
      const paidApt = selectedAppointment;
      setSelectedAppointment(null);

      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        html: `Payment of <b>$${paidApt.price || 200}</b> for <b>${paidApt.treatment}</b> has been verified.`,
        confirmButtonColor: '#07332F',
      });
    } catch (err) {
      setIsProcessing(false);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: 'Unable to process transaction. Please retry.',
        confirmButtonColor: '#07332F',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>My Appointments - MediNest Patient Portal</title>
      </Helmet>

      <div className="space-y-6">
        {/* Title from Screenshot 13 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            My Appointments : {String(appointments.length).padStart(2, '0')}
          </h2>
        </div>

        {/* Appointments Table (Matching Screenshot 13) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6 w-16">#</th>
                  <th className="py-4 px-6">NAME</th>
                  <th className="py-4 px-6">DATE</th>
                  <th className="py-4 px-6">TIME</th>
                  <th className="py-4 px-6">TREATMENT</th>
                  <th className="py-4 px-6 text-right">PAYMENT</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      Loading your appointment records...
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt, index) => {
                    const serial = String(index + 1).padStart(2, '0');
                    const isPaid = apt.status === 'paid';

                    return (
                      <tr
                        key={apt.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Serial Number */}
                        <td className="py-4 px-6 text-slate-400 font-medium text-xs">
                          {serial}
                        </td>

                        {/* Name */}
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          {apt.name}
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm">
                          {apt.date}
                        </td>

                        {/* Time */}
                        <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm">
                          {apt.time}
                        </td>

                        {/* Treatment */}
                        <td className="py-4 px-6 text-slate-700 font-medium">
                          {apt.treatment}
                        </td>

                        {/* Payment Column (Paid id or Pay button) */}
                        <td className="py-4 px-6 text-right">
                          {isPaid ? (
                            <div className="inline-block text-right">
                              <span className="text-xs font-bold text-[#F7A582] block">
                                Paid
                              </span>
                              <span className="text-[10px] text-slate-400 block font-mono">
                                id : {apt.transactionId || 'dfadfjaksdjf24sdfds'}
                              </span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleOpenPay(apt)}
                              className="bg-[#07332F] hover:bg-[#0a4640] text-white text-xs font-semibold px-5 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                            >
                              Pay
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PAYMENT MODAL (Matching Screenshot 12 precisely)          */}
        {/* ========================================================= */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="absolute top-6 right-6 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Greeting in Coral (Screenshot 12) */}
              <div className="space-y-1 mb-4">
                <p className="text-xs font-bold text-[#F7A582]">
                  Hello, {user?.displayName?.split(' ')[0] || 'Awlad'}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Please Pay for {selectedAppointment.treatment}
                </h3>
                <p className="text-xs text-amber-600 font-medium">
                  Your Appointment: {selectedAppointment.date} at {selectedAppointment.time}
                </p>
                <p className="text-base font-extrabold text-slate-900 pt-1">
                  Please Pay: ${selectedAppointment.price || 200}
                </p>
              </div>

              {/* Payment Card Form (Screenshot 12) */}
              <form onSubmit={handleProcessPayment} className="space-y-4 pt-2">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Card Number"
                      value={paymentForm.cardNumber}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, cardNumber: e.target.value })
                      }
                      className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-4 top-3.5" />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY/CVC"
                    value={paymentForm.expCvc}
                    onChange={(e) =>
                      setPaymentForm({ ...paymentForm, expCvc: e.target.value })
                    }
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-[#07332F] focus:bg-white"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="teal"
                    loading={isProcessing}
                    className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md"
                  >
                    Pay
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit Encrypted Secure Medical Transaction</span>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
