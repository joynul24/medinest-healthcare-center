/**
 * @file endpoints.js
 * @description Centralized REST API endpoints for MediNest.
 * Modify base URLs or route names here to connect to any custom backend (Express, Nest, Django, etc.).
 */

export const API_ENDPOINTS = {
  // Authentication routes
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    LOGOUT: '/api/logout',
    GOOGLE: '/api/auth/google',
    JWT: '/api/jwt',
  },

  // Doctors management
  DOCTORS: {
    BASE: '/api/doctors',
    BY_ID: (id) => `/api/doctors/${id}`,
    SPECIALTIES: '/api/doctors/specialties',
  },

  // Appointment scheduling
  APPOINTMENTS: {
    BASE: '/api/appointments',
    BY_ID: (id) => `/api/appointments/${id}`,
    MY_APPOINTMENTS: '/api/appointments/my',
    PAY: (id) => `/api/appointments/${id}/pay`,
    SLOTS: '/api/appointments/available-slots',
  },

  // Services catalog
  SERVICES: {
    BASE: '/api/services',
    BY_ID: (id) => `/api/services/${id}`,
  },

  // Users administration
  USERS: {
    BASE: '/api/users',
    BY_ID: (id) => `/api/users/${id}`,
    MAKE_ADMIN: (id) => `/api/users/${id}/make-admin`,
  },

  // Reviews and ratings
  REVIEWS: {
    BASE: '/api/reviews',
    BY_ID: (id) => `/api/reviews/${id}`,
  },
};

export default API_ENDPOINTS;
