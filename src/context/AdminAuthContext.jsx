import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import adminApi, { ADMIN_AUTH_ERROR_EVENT } from '../utils/adminAxios';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthError = () => {
      setAdminUser(null);
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminToken');
      // Only redirect within admin area
      if (!location.pathname.startsWith('/admin/login')) {
        navigate('/admin/login');
      }
    };
    window.addEventListener(ADMIN_AUTH_ERROR_EVENT, handleAuthError);
    return () => window.removeEventListener(ADMIN_AUTH_ERROR_EVENT, handleAuthError);
  }, [navigate, location.pathname]);

  useEffect(() => {
    let mounted = true;
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const saved = localStorage.getItem('adminUser');
      if (token && saved) {
        try {
          if (mounted) {
            setAdminUser(JSON.parse(saved));
            setLoading(false);
          }
          const verify = await adminApi.get('/api/auth/verify-token');
          if (mounted && verify.data.valid) {
            const profile = await adminApi.get('/api/auth/profile');
            const userData = profile.data;
            if (!userData?.isAdmin) {
              // Not an admin, reject
              localStorage.removeItem('adminToken');
              localStorage.removeItem('adminUser');
              setAdminUser(null);
              navigate('/admin/login');
              return;
            }
            setAdminUser(userData);
            localStorage.setItem('adminUser', JSON.stringify(userData));
          } else if (mounted) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setAdminUser(null);
            navigate('/admin/login');
          }
        } catch (err) {
          console.error('Admin auth check failed:', err);
          if (mounted) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setAdminUser(null);
          }
        }
      } else {
        if (mounted) {
          setAdminUser(null);
          setLoading(false);
        }
      }
    };
    checkAuth();
    return () => { mounted = false; };
  }, [navigate]);

  const login = async (email, password) => {
    try {
      setError(null);
      // Clear any existing admin auth
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setAdminUser(null);

      const res = await adminApi.post('/api/auth/login', {
        email: String(email).trim(),
        password: String(password).trim()
      });
      const { token, ...userData } = res.data;
      if (!userData?.isAdmin) {
        throw new Error('Access denied: Admin only');
      }
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(userData));
      setAdminUser(userData);
      return true;
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.response?.data?.message || err.message || 'Admin login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{
      user: adminUser,
      loading,
      error,
      login,
      logout,
      isAuthenticated: !!adminUser,
      isAdmin: !!adminUser?.isAdmin
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};