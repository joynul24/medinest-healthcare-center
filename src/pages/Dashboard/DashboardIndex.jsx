/**
 * @file DashboardIndex.jsx
 * @description Intelligent index route for the dashboard that renders
 * Admin Analytics when logged in as an Admin, or My Appointments when logged in as a Patient.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import MyAppointments from './MyAppointments.jsx';

export default function DashboardIndex() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminDashboard /> : <MyAppointments />;
}
