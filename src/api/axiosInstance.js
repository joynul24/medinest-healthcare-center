/**
 * @file axiosInstance.js
 * @description Configured Axios client with automatic Bearer token injection
 * and graceful fallback handling for local development without active backend.
 */

import axios from 'axios';

// The base URL can be defined in .env as VITE_API_BASE_URL
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token if present in localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('medinest_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Global error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to missing backend server in frontend-only preview
    if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
      console.warn('[MediNest API] Server endpoint unavailable, falling back to local state:', error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
