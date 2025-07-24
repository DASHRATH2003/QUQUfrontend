import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/removebg.png';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isNotifyChecked, setIsNotifyChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const { login, register, error: authError } = useAuth();

  if (!isOpen) return null;

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (!isLogin && !name) {
      toast.error('Please enter your name');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(email.toLowerCase().trim(), password);
        if (success) {
          toast.success('Login successful!');
          onClose();
        }
      } else {
        success = await register({
          email: email.toLowerCase().trim(),
          password,
          name: name.trim()
        });
        if (success) {
          toast.success('Registration successful!');
          onClose();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 z-10"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Main Content */}
        <div className="px-6 pt-6 pb-4">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-4">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-4 p-2 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center">
              {authError}
            </div>
          )}

          {/* Form Title */}
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </h2>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                {isLogin ? '' : 'Password must be at least 6 characters long'}
              </p>
            </div>

            {/* Notification Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="notify"
                checked={isNotifyChecked}
                onChange={(e) => setIsNotifyChecked(e.target.checked)}
                className="mt-1 h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="notify" className="text-xs text-gray-600">
                Notify me about new features, updates & special offers
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>

            {/* Toggle Login/Signup */}
            <p className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={handleToggleMode}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup; 