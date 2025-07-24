import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from '../components/LoginPopup';

const Login = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsPopupOpen(false);
    navigate('/'); // Redirect to home page when popup is closed
  };

  return (
    <div>
      <LoginPopup isOpen={isPopupOpen} onClose={handleClose} />
    </div>
  );
};

export default Login; 