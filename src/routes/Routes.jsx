/**
 * @file Routes.jsx
 * @description React Router DOM v6 route definitions for the MediNest application.
 * Manages public marketing routes, authenticated dashboard views, and 404 fallbacks.
 */

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import Home from '../pages/Home/Home.jsx';
import About from '../pages/About/About.jsx';
import Appointment from '../pages/Appointment/Appointment.jsx';
import DoctorProfile from '../pages/DoctorProfile/DoctorProfile.jsx';
import Reviews from '../pages/Reviews/Reviews.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Login from '../pages/Auth/Login.jsx';
import SignUp from '../pages/Auth/SignUp.jsx';
import DashboardLayout from '../pages/Dashboard/DashboardLayout.jsx';
import DashboardIndex from '../pages/Dashboard/DashboardIndex.jsx';
import AllUsers from '../pages/Dashboard/AllUsers.jsx';
import AddDoctor from '../pages/Dashboard/AddDoctor.jsx';
import ManageDoctors from '../pages/Dashboard/ManageDoctors.jsx';
import MyAppointments from '../pages/Dashboard/MyAppointments.jsx';
import MyReviews from '../pages/Dashboard/MyReviews.jsx';
import MyHistory from '../pages/Dashboard/MyHistory.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AdminRoute from './AdminRoute.jsx';

export const router = createBrowserRouter([
  // Public Marketing Site
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'appointment',
        element: <Appointment />,
      },
      {
        path: 'doctors/:id',
        element: <DoctorProfile />,
      },
      {
        path: 'reviews',
        element: <Reviews />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },

  // Authentication Flows
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },

  // Authenticated Dashboard (Admin & Patient)
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: 'all-users',
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'add-doctor',
        element: (
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        ),
      },
      {
        path: 'manage-doctors',
        element: (
          <AdminRoute>
            <ManageDoctors />
          </AdminRoute>
        ),
      },
      {
        path: 'my-appointments',
        element: <MyAppointments />,
      },
      {
        path: 'my-reviews',
        element: <MyReviews />,
      },
      {
        path: 'my-history',
        element: <MyHistory />,
      },
    ],
  },

  // 404 Catch-All Page
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
