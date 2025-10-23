import axios from 'axios';

export const ADMIN_AUTH_ERROR_EVENT = 'admin_auth_error';
export const ADMIN_TOKEN_REFRESH_EVENT = 'admin_token_refresh';

const baseURL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : 'https://ququbackendl.onrender.com';

const adminApi = axios.create({
  baseURL,
  withCredentials: true
});

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

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        window.dispatchEvent(new Event(ADMIN_AUTH_ERROR_EVENT));
      }
      console.error('Admin API Error:', error.response || error);
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return adminApi(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await adminApi.post('/api/auth/refresh-token');
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      originalRequest.headers.Authorization = `Bearer ${token}`;
      adminApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      processQueue(null, token);
      window.dispatchEvent(new Event(ADMIN_TOKEN_REFRESH_EVENT));
      return adminApi(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.dispatchEvent(new Event(ADMIN_AUTH_ERROR_EVENT));
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default adminApi;