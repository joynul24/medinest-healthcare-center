/**
 * @file apiServices.js
 * @description API service methods for doctors, appointments, users, and reviews.
 * Connects directly to the backend MongoDB endpoints with automatic fallback
 * and synchronization to localStorage for persistent offline/resilient access.
 */

import axiosInstance from '../api/axiosInstance.js';
import API_ENDPOINTS from '../api/endpoints.js';
import {
  DOCTORS_DATA,
  INITIAL_APPOINTMENTS,
  INITIAL_USERS,
  SERVICES_DATA,
  TESTIMONIALS_DATA,
} from '../data/mockData.js';

// Helper to get or initialize localStorage cached items
const getStorageItem = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(`medinest_${key}`);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStorageItem = (key, val) => {
  try {
    localStorage.setItem(`medinest_${key}`, JSON.stringify(val));
  } catch (err) {
    console.error('Storage write error', err);
  }
};

// Initialize default storage data on first run
if (!localStorage.getItem('medinest_doctors')) {
  setStorageItem('doctors', DOCTORS_DATA);
}
if (!localStorage.getItem('medinest_appointments')) {
  setStorageItem('appointments', INITIAL_APPOINTMENTS);
}
if (!localStorage.getItem('medinest_users')) {
  setStorageItem('users', INITIAL_USERS);
}
if (!localStorage.getItem('medinest_reviews')) {
  setStorageItem('reviews', TESTIMONIALS_DATA);
}

// DOCTOR SERVICES
export const doctorService = {
  async getAll() {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.DOCTORS.BASE);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setStorageItem('doctors', res.data);
        return res.data;
      }
      return getStorageItem('doctors', DOCTORS_DATA);
    } catch {
      return getStorageItem('doctors', DOCTORS_DATA);
    }
  },

  async getById(id) {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.DOCTORS.BY_ID(id));
      if (res.data && typeof res.data === 'object' && !Array.isArray(res.data) && (res.data.id || res.data._id)) {
        return res.data;
      }
      const docs = getStorageItem('doctors', DOCTORS_DATA);
      return docs.find((d) => d.id === id || d._id === id) || docs[0];
    } catch {
      const docs = getStorageItem('doctors', DOCTORS_DATA);
      return docs.find((d) => d.id === id || d._id === id) || docs[0];
    }
  },

  async create(doctorData) {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.DOCTORS.BASE, doctorData);
      const docs = getStorageItem('doctors', DOCTORS_DATA);
      setStorageItem('doctors', [res.data, ...docs]);
      return res.data;
    } catch {
      const docs = getStorageItem('doctors', DOCTORS_DATA);
      const newDoc = {
        id: `doc-${Date.now()}`,
        _id: `doc-${Date.now()}`,
        rating: 5,
        reviewsCount: 1,
        location: 'Dhanmondi, Dhaka - Bangladesh',
        availableDate: 'Available All Week',
        price: 15,
        featured: false,
        tags: ['General', doctorData.specialty || 'General Practitioner'],
        about: `${doctorData.name} is a dedicated healthcare specialist in ${doctorData.specialty || 'General Practitioner'}.`,
        education: [{ institution: 'Medical College', degree: 'MBBS', year: '2015' }],
        experience: [{ role: 'MediNest Specialist', period: '2020 - Present' }],
        awards: [],
        services: [doctorData.specialty || 'General Practice', 'Consultation'],
        specializations: [doctorData.specialty || 'General Practice'],
        businessHours: [{ day: 'Monday - Friday', hours: '09:00 AM - 05:00 PM' }],
        ...doctorData,
      };
      const updated = [newDoc, ...docs];
      setStorageItem('doctors', updated);
      return newDoc;
    }
  },

  async delete(id) {
    try {
      const res = await axiosInstance.delete(API_ENDPOINTS.DOCTORS.BY_ID(id));
      const docs = getStorageItem('doctors', DOCTORS_DATA);
      const updated = docs.filter((d) => d.id !== id && d._id !== id);
      setStorageItem('doctors', updated);
      return res.data;
    } catch {
      const docs = getStorageItem('doctors', DOCTORS_DATA);
      const updated = docs.filter((d) => d.id !== id && d._id !== id);
      setStorageItem('doctors', updated);
      return { success: true, id };
    }
  },
};

// APPOINTMENT SERVICES
export const appointmentService = {
  async getAll(email = null) {
    try {
      const endpoint = email ? `${API_ENDPOINTS.APPOINTMENTS.BASE}?email=${encodeURIComponent(email)}` : API_ENDPOINTS.APPOINTMENTS.BASE;
      const res = await axiosInstance.get(endpoint);
      if (Array.isArray(res.data)) {
        return res.data;
      }
      const apts = getStorageItem('appointments', INITIAL_APPOINTMENTS);
      return email ? apts.filter((a) => a.userEmail === email) : apts;
    } catch {
      const apts = getStorageItem('appointments', INITIAL_APPOINTMENTS);
      return email ? apts.filter((a) => a.userEmail === email) : apts;
    }
  },

  async book(appointmentData) {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.APPOINTMENTS.BASE, appointmentData);
      const apts = getStorageItem('appointments', INITIAL_APPOINTMENTS);
      setStorageItem('appointments', [res.data, ...apts]);
      return res.data;
    } catch {
      const apts = getStorageItem('appointments', INITIAL_APPOINTMENTS);
      const newApt = {
        id: `apt-${Date.now()}`,
        _id: `apt-${Date.now()}`,
        status: 'unpaid',
        price: appointmentData.price || 200,
        createdAt: new Date().toISOString(),
        ...appointmentData,
      };
      const updated = [newApt, ...apts];
      setStorageItem('appointments', updated);
      return newApt;
    }
  },

  async pay(id, paymentInfo) {
    try {
      const res = await axiosInstance.patch(API_ENDPOINTS.APPOINTMENTS.PAY(id), paymentInfo);
      const apts = getStorageItem('appointments', INITIAL_APPOINTMENTS);
      const updated = apts.map((apt) =>
        apt.id === id || apt._id === id
          ? {
              ...apt,
              status: 'paid',
              transactionId: res.data?.transactionId || `tx_${Math.random().toString(36).substring(2, 12)}`,
              paidAt: new Date().toISOString(),
            }
          : apt
      );
      setStorageItem('appointments', updated);
      return res.data;
    } catch {
      const apts = getStorageItem('appointments', INITIAL_APPOINTMENTS);
      const updated = apts.map((apt) =>
        apt.id === id || apt._id === id
          ? {
              ...apt,
              status: 'paid',
              transactionId: `tx_${Math.random().toString(36).substring(2, 12)}`,
              paidAt: new Date().toISOString(),
            }
          : apt
      );
      setStorageItem('appointments', updated);
      return { success: true, id };
    }
  },
};

// USER MANAGEMENT SERVICES
export const userService = {
  async getAll() {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.USERS.BASE);
      if (Array.isArray(res.data)) {
        return res.data;
      }
      return getStorageItem('users', INITIAL_USERS);
    } catch {
      return getStorageItem('users', INITIAL_USERS);
    }
  },

  async syncUser(userData) {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.USERS.BASE, userData);
      return res.data;
    } catch {
      const users = getStorageItem('users', INITIAL_USERS);
      const existing = users.find((u) => u.email === userData.email);
      if (!existing) {
        const newUser = {
          id: `usr-${Date.now()}`,
          _id: `usr-${Date.now()}`,
          email: userData.email,
          name: userData.name || userData.email.split('@')[0],
          photoURL: userData.photoURL || '',
          role: userData.role || (userData.email.includes('admin') ? 'admin' : 'user'),
          lastLogin: new Date().toISOString(),
        };
        setStorageItem('users', [newUser, ...users]);
        return newUser;
      }
      return existing;
    }
  },

  async makeAdmin(id) {
    try {
      const res = await axiosInstance.patch(API_ENDPOINTS.USERS.MAKE_ADMIN(id));
      const users = getStorageItem('users', INITIAL_USERS);
      const updated = users.map((u) => (u.id === id || u._id === id ? { ...u, role: 'admin' } : u));
      setStorageItem('users', updated);
      return res.data;
    } catch {
      const users = getStorageItem('users', INITIAL_USERS);
      const updated = users.map((u) => (u.id === id || u._id === id ? { ...u, role: 'admin' } : u));
      setStorageItem('users', updated);
      return { success: true, id };
    }
  },

  async removeUser(id) {
    try {
      const res = await axiosInstance.delete(API_ENDPOINTS.USERS.BY_ID(id));
      const users = getStorageItem('users', INITIAL_USERS);
      const updated = users.filter((u) => u.id !== id && u._id !== id);
      setStorageItem('users', updated);
      return res.data;
    } catch {
      const users = getStorageItem('users', INITIAL_USERS);
      const updated = users.filter((u) => u.id !== id && u._id !== id);
      setStorageItem('users', updated);
      return { success: true, id };
    }
  },
};

// REVIEW SERVICES (Direct MongoDB Atlas Integration & Fallback Sync)
export const reviewService = {
  async getAll() {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.REVIEWS.BASE);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setStorageItem('reviews', res.data);
        return res.data;
      }
      return getStorageItem('reviews', TESTIMONIALS_DATA);
    } catch {
      return getStorageItem('reviews', TESTIMONIALS_DATA);
    }
  },

  async create(reviewData) {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.REVIEWS.BASE, reviewData);
      const savedReview = res.data;
      const currentReviews = getStorageItem('reviews', TESTIMONIALS_DATA);
      const filtered = currentReviews.filter((r) => r.id !== savedReview.id && r._id !== savedReview._id);
      setStorageItem('reviews', [savedReview, ...filtered]);
      return savedReview;
    } catch (err) {
      console.warn('Backend review create fallback:', err);
      const currentReviews = getStorageItem('reviews', TESTIMONIALS_DATA);
      const newReview = {
        _id: `rev-${Date.now()}`,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...reviewData,
      };
      setStorageItem('reviews', [newReview, ...currentReviews]);
      return newReview;
    }
  },

  async update(id, reviewData) {
    try {
      const res = await axiosInstance.patch(API_ENDPOINTS.REVIEWS.BY_ID(id), reviewData);
      const currentReviews = getStorageItem('reviews', TESTIMONIALS_DATA);
      const updated = currentReviews.map((r) => (r.id === id || r._id === id ? { ...r, ...reviewData } : r));
      setStorageItem('reviews', updated);
      return res.data;
    } catch {
      const currentReviews = getStorageItem('reviews', TESTIMONIALS_DATA);
      const updated = currentReviews.map((r) => (r.id === id || r._id === id ? { ...r, ...reviewData } : r));
      setStorageItem('reviews', updated);
      return { id, ...reviewData };
    }
  },

  async delete(id) {
    try {
      const res = await axiosInstance.delete(API_ENDPOINTS.REVIEWS.BY_ID(id));
      const currentReviews = getStorageItem('reviews', TESTIMONIALS_DATA);
      const updated = currentReviews.filter((r) => r.id !== id && r._id !== id);
      setStorageItem('reviews', updated);
      return res.data;
    } catch {
      const currentReviews = getStorageItem('reviews', TESTIMONIALS_DATA);
      const updated = currentReviews.filter((r) => r.id !== id && r._id !== id);
      setStorageItem('reviews', updated);
      return { success: true, id };
    }
  },
};

// SERVICES CATALOG
export const clinicService = {
  async getServices() {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.SERVICES.BASE);
      if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }
      return SERVICES_DATA;
    } catch {
      return SERVICES_DATA;
    }
  },

  async getReviews() {
    return reviewService.getAll();
  },
};
