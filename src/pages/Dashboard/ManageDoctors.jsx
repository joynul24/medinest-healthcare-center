/**
 * @file ManageDoctors.jsx
 * @description Manage Doctors administration table strictly matching Screenshot 9.
 * Shows list of doctors with circular avatars, specialties, and red Delete action with confirmation.
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { useDoctors, useDeleteDoctor } from '../../hooks/useDoctors.js';
import { DOCTORS_DATA } from '../../data/mockData.js';

export default function ManageDoctors() {
  const { data: rawDoctors, isLoading } = useDoctors();
  const doctors = Array.isArray(rawDoctors) ? rawDoctors : DOCTORS_DATA;
  const deleteDoctorMutation = useDeleteDoctor();

  const handleDelete = (doctor) => {
    Swal.fire({
      title: 'Delete Doctor?',
      text: `Are you sure you want to remove ${doctor.name} from MediNest?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#E11D48',
      cancelButtonColor: '#94A3B8',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoctorMutation.mutateAsync(doctor.id);
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: `${doctor.name} has been removed.`,
          confirmButtonColor: '#07332F',
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Doctors - MediNest Admin</title>
      </Helmet>

      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Manage Doctors: {String(doctors.length).padStart(2, '0')}
        </h2>

        {/* Table Container (Matching Screenshot 9) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6 w-16">#</th>
                  <th className="py-4 px-6">AVATAR</th>
                  <th className="py-4 px-6">NAME</th>
                  <th className="py-4 px-6">SPECIALITY</th>
                  <th className="py-4 px-6 text-right">ACTION</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400">
                      Loading staff records...
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor, index) => {
                    const serial = String(index + 1).padStart(2, '0');

                    return (
                      <tr
                        key={doctor.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        {/* Serial Number */}
                        <td className="py-4 px-6 text-slate-400 font-medium text-xs">
                          {serial}
                        </td>

                        {/* Circular Avatar */}
                        <td className="py-4 px-6">
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs"
                          />
                        </td>

                        {/* Name */}
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          {doctor.name}
                        </td>

                        {/* Specialty */}
                        <td className="py-4 px-6 text-slate-600">
                          {doctor.specialty}
                        </td>

                        {/* Red Delete Button (Matching Screenshot 9) */}
                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(doctor)}
                            className="bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-all shadow-xs cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
