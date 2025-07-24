import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { AUTH_ERROR_EVENT } from '../utils/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user data from localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle auth errors
  useEffect(() => {
    const handleAuthError = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      const isAdminRoute = location.pathname.startsWith('/admin');
      if (isAdminRoute) {
        navigate('/admin/login');
      } else if (location.pathname !== '/login') {
        localStorage.setItem('returnPath', location.pathname);
        navigate('/login');
      }
    };

    window.addEventListener(AUTH_ERROR_EVENT, handleAuthError);
    return () => window.removeEventListener(AUTH_ERROR_EVENT, handleAuthError);
  }, [navigate, location.pathname]);

  // Check if user is logged in on mount and token change
  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      const token = localStorage.getItem('userToken');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // First set the saved user data to prevent flicker
          if (isMounted) {
            setUser(JSON.parse(savedUser));
            setLoading(false);
          }
          
          // Then verify with backend
          const response = await api.get('/api/auth/verify-token');
          if (isMounted && response.data.valid) {
            // Token is valid, update user data if needed
            const userResponse = await api.get('/api/auth/profile');
            const userData = userResponse.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          } else if (isMounted) {
            // Token is invalid
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            const isAdminRoute = location.pathname.startsWith('/admin');
            if (isAdminRoute) {
              navigate('/admin/login');
            } else if (location.pathname !== '/login') {
              localStorage.setItem('returnPath', location.pathname);
              navigate('/login');
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          if (isMounted) {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
          }
        }
      } else {
        if (isMounted) {
          setUser(null);
          localStorage.removeItem('user');
          setLoading(false);
        }
      }
    };

    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, [navigate, location.pathname]);

  const login = async (email, password) => {
    try {
      setError(null);

      // Clear any existing auth data before login
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      setUser(null);

      const response = await api.post('/api/auth/login', {
        email: String(email).trim(),
        password: String(password).trim()
      });
      
      const { token, ...userData } = response.data;
      
      // Save both token and user data
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    const isAdminRoute = location.pathname.startsWith('/admin');
    navigate(isAdminRoute ? '/admin/login' : '/');
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/register', userData);
      const { token, ...newUser } = response.data;
      
      // Save both token and user data
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}; 