import axios from 'axios';

// Custom event for authentication errors
export const AUTH_ERROR_EVENT = 'auth_error';
export const TOKEN_REFRESH_EVENT = 'token_refresh';

// Dynamically set base URL
const baseURL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : 'https://ququbackendl.onrender.com';

// Create axios instance with base URL
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Track if we're refreshing the token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request has already been retried, reject
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        window.dispatchEvent(new Event(AUTH_ERROR_EVENT));
      }
      console.error('API Error:', error.response || error);
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // If token refresh is in progress, queue this request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    // Mark this request as retried
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Try to refresh the token
      const response = await api.post('/api/auth/refresh-token');
      const { token } = response.data;

      // Update token in localStorage
      localStorage.setItem('userToken', token);

      // Update headers for the original request
      originalRequest.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Process queued requests
      processQueue(null, token);

      // Dispatch token refresh event
      window.dispatchEvent(new Event(TOKEN_REFRESH_EVENT));

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      
      // Clear auth data and dispatch auth error event
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event(AUTH_ERROR_EVENT));
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
