/**
 * @file AllUsers.jsx
 * @description All Users administration table strictly reproducing Screenshot 11.
 * Allows administrators to promote users to Admin or remove user accounts.
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { userService } from '../../services/apiServices.js';
import { INITIAL_USERS } from '../../data/mockData.js';

export default function AllUsers() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAll();
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        }
      } catch (err) {
        console.warn('Failed to load users from API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (user) => {
    const result = await Swal.fire({
      title: 'Promote User?',
      text: `Grant administrative privileges to ${user.email}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Make Admin',
      confirmButtonColor: '#07332F',
      cancelButtonColor: '#94A3B8',
    });

    if (result.isConfirmed) {
      await userService.makeAdmin(user.id);
      const updated = users.map((u) => (u.id === user.id ? { ...u, role: 'admin' } : u));
      setUsers(updated);
      Swal.fire({
        icon: 'success',
        title: 'Promoted!',
        text: `${user.email} is now an administrator.`,
        confirmButtonColor: '#07332F',
      });
    }
  };

  const handleRemoveUser = async (user) => {
    const result = await Swal.fire({
      title: 'Remove User Account?',
      text: `Are you sure you want to delete ${user.email}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      confirmButtonColor: '#E11D48',
      cancelButtonColor: '#94A3B8',
    });

    if (result.isConfirmed) {
      await userService.removeUser(user.id);
      const updated = users.filter((u) => u.id !== user.id);
      setUsers(updated);
      Swal.fire({
        icon: 'success',
        title: 'Removed',
        text: 'User account has been deleted.',
        confirmButtonColor: '#07332F',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>All Users - MediNest Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Page Title from Screenshot 11 */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          All Users : {String(users.length).padStart(2, '0')}
        </h2>

        {/* Users Table Container (Matching Screenshot 11) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="py-4 px-6 w-16">#</th>
                  <th className="py-4 px-6">NAME</th>
                  <th className="py-4 px-6 text-center">Job</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 text-sm">
                {users.map((userItem, index) => {
                  const serial = String(index + 1).padStart(2, '0');
                  const isCurrentAdmin = userItem.role === 'admin';

                  return (
                    <tr
                      key={userItem.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Serial */}
                      <td className="py-4 px-6 text-slate-400 font-medium text-xs">
                        {serial}
                      </td>

                      {/* Name / Email */}
                      <td className="py-4 px-6 font-medium text-slate-700">
                        <span className="hover:text-[#07332F]">{userItem.email}</span>
                      </td>

                      {/* Job / Make Admin Button */}
                      <td className="py-4 px-6 text-center">
                        {isCurrentAdmin ? (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Admin
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleMakeAdmin(userItem)}
                            className="bg-[#07332F] hover:bg-[#0a4640] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                          >
                            Make Admin
                          </button>
                        )}
                      </td>

                      {/* Action / Remove User Button */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(userItem)}
                          className="bg-[#07332F] hover:bg-rose-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer"
                        >
                          Remove User
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
