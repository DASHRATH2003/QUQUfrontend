import axios from 'axios';

// Custom event for authentication errors
export const AUTH_ERROR_EVENT = 'auth_error';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is authentication related (401 or 403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.dispatchEvent(new Event(AUTH_ERROR_EVENT));
    }
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api; 

