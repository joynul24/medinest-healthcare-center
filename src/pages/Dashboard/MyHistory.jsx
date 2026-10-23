/**
 * @file MyHistory.jsx
 * @description Patient Medical & Consultation History view in the dashboard.
 * Displays past procedures, clinical diagnosis summaries, prescriptions, and follow-up reminders.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  Printer,
  X,
  Stethoscope,
  Pill,
  Download,
} from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function MyHistory() {
  const { user } = useAuth();

  const [historyRecords] = useState([
    {
      id: 'rec-01',
      date: 'Oct 12, 2026',
      time: '10:30 AM',
      doctor: 'Dr. Ruby Perrin',
      specialty: 'Teeth Orthodontics',
      treatment: 'Orthodontic Archwire Adjustment',
      diagnosis: 'Moderate Class II Malocclusion correction in progress.',
      status: 'Completed',
      fee: '$150',
      prescriptions: [
        { name: 'Chlorhexidine 0.2% Oral Rinse', dosage: '10ml twice daily for 7 days' },
        { name: 'Orthodontic Relief Wax', dosage: 'Apply to brackets as needed for irritation' },
      ],
      clinicalNotes:
        'Archwire exchanged to 0.016 NiTi. Canine retraction proceeding normally. Patient instructed on elastic wear compliance.',
      nextVisit: 'Nov 14, 2026',
    },
    {
      id: 'rec-02',
      date: 'Sep 10, 2026',
      time: '02:00 PM',
      doctor: 'Dr. Ruby Perrin',
      specialty: 'Cosmetic Dentistry',
      treatment: 'Ultrasonic Scaling & Enamel Polishing',
      diagnosis: 'Mild supragingival plaque without periodontal pocketing.',
      status: 'Completed',
      fee: '$120',
      prescriptions: [
        { name: 'Potassium Nitrate Desensitizing Paste', dosage: 'Brush gently twice daily' },
      ],
      clinicalNotes:
        'Full mouth ultrasonic scaling completed. Fluoride foam application for 2 minutes. Oral hygiene score: Excellent.',
      nextVisit: 'March 10, 2027 (Routine 6-Month Recall)',
    },
    {
      id: 'rec-03',
      date: 'Aug 02, 2026',
      time: '11:15 AM',
      doctor: 'Dr. Kazi Rahman',
      specialty: 'Oral Surgery',
      treatment: 'Impacted Wisdom Tooth Evaluation & Panoramic OPG',
      diagnosis: 'Mesioangular impacted mandibular third molar (#38).',
      status: 'Follow-up Scheduled',
      fee: '$180',
      prescriptions: [
        { name: 'Amoxicillin 500mg', dosage: '1 capsule every 8 hours for 5 days' },
        { name: 'Ibuprofen 400mg', dosage: '1 tablet after meals if throbbing pain occurs' },
      ],
      clinicalNotes:
        'OPG x-ray analyzed. Roots close to inferior alveolar nerve canal. Surgical extraction scheduled post-inflammation reduction.',
      nextVisit: 'Nov 02, 2026',
    },
  ]);

  const [selectedRecord, setSelectedRecord] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Medical History - Patient Portal | MediNest</title>
      </Helmet>

      <div className="space-y-6">
        
        {/* Title Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Medical & Consultation History
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete archive of clinical visits, diagnostic summaries, and active prescriptions for {user?.displayName || 'Patient'}.
          </p>
        </div>

        {/* 4 Metric Summary Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Total Consultations</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#07332F] mt-1 block">
              {historyRecords.length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Completed</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 block">
              {historyRecords.filter((r) => r.status === 'Completed').length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Prescriptions</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#F7A582] mt-1 block">
              5
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Next Follow-Up</span>
            <span className="text-sm font-bold text-slate-800 mt-2 block truncate">
              Nov 02, 2026
            </span>
          </div>
        </div>

        {/* History Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6">DATE & TIME</th>
                  <th className="py-4 px-6">PHYSICIAN</th>
                  <th className="py-4 px-6">PROCEDURE / DIAGNOSIS</th>
                  <th className="py-4 px-6">STATUS</th>
                  <th className="py-4 px-6 text-right">ACTION</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {historyRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Date */}
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">{item.date}</p>
                      <span className="text-[11px] text-slate-400 font-medium">{item.time}</span>
                    </td>

                    {/* Physician */}
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-800 text-xs sm:text-sm">{item.doctor}</p>
                      <span className="text-[11px] text-[#F7A582] font-semibold">{item.specialty}</span>
                    </td>

                    {/* Procedure */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="font-medium text-slate-900 text-xs sm:text-sm">{item.treatment}</p>
                      <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.diagnosis}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {item.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> Scheduled
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedRecord(item)}
                        className="bg-[#07332F] hover:bg-[#0a4640] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Clinical Report & Prescription Summary */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#07332F]" />
                  <h3 className="text-lg font-bold text-slate-900">Clinical Consultation Record</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Consultation Details */}
              <div className="space-y-5 pt-4 text-xs sm:text-sm">
                
                {/* Meta info box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold block">Consulting Doctor</span>
                    <span className="font-bold text-slate-800">{selectedRecord.doctor}</span>
                    <span className="text-[10px] text-[#F7A582] block">{selectedRecord.specialty}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold block">Date & Time</span>
                    <span className="font-bold text-slate-800">{selectedRecord.date}</span>
                    <span className="text-[10px] text-slate-500 block">{selectedRecord.time}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-200">
                    <span className="text-[11px] text-slate-400 font-semibold block">Diagnosis</span>
                    <span className="font-semibold text-slate-800">{selectedRecord.diagnosis}</span>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                    <Stethoscope className="w-4 h-4 text-[#07332F]" /> Physician Clinical Notes
                  </h4>
                  <p className="text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed text-xs">
                    {selectedRecord.clinicalNotes}
                  </p>
                </div>

                {/* Prescribed Medications */}
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                    <Pill className="w-4 h-4 text-[#F7A582]" /> Prescriptions (Rx)
                  </h4>
                  <div className="space-y-2">
                    {selectedRecord.prescriptions.map((rx, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-800 text-xs">{rx.name}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{rx.dosage}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Recall */}
                <div className="p-3 bg-[#FFF0EC] rounded-xl border border-[#F7A582]/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#07332F]">Next Scheduled Visit:</span>
                  <span className="font-bold text-[#F7A582]">{selectedRecord.nextVisit}</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <Button
                    onClick={handlePrint}
                    variant="teal"
                    size="sm"
                    icon={Printer}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs"
                  >
                    Print Summary
                  </Button>
                  <Button
                    onClick={() => setSelectedRecord(null)}
                    variant="outlineTeal"
                    size="sm"
                    className="py-2.5 rounded-xl font-semibold text-xs"
                  >
                    Close
                  </Button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
