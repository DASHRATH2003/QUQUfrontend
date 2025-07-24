import React, { createContext, useContext, useState } from 'react';
import { useCart } from './CartContext';
import toast from 'react-hot-toast';
import api from '../utils/axios';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const { getTotalPrice, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (cardDetails) => {
    try {
      setProcessing(true);
      setError(null);

      const amount = parseFloat(getTotalPrice());
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid order amount. Please check your cart.');
      }

      // Create order in your backend
      const orderResponse = await api.post('/api/orders/create', {
        amount: amount.toFixed(2),
        currency: 'GBP',
        paymentMethod: 'lloyds_bank',
        cardDetails: {
          number: cardDetails.cardNumber.replace(/\s/g, ''),
          expiry: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
          name: cardDetails.cardholderName
        }
      });

      const orderData = orderResponse.data;

      // Process payment
      const paymentResponse = await api.post('/api/orders/process-payment', {
        orderId: orderData.id
      });

      const paymentResult = paymentResponse.data;

      if (paymentResult.status === 'success') {
        toast.success('Payment successful! Order confirmed.');
        clearCart();
        return true;
      } else {
        throw new Error(paymentResult.message || 'Payment failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      if (error.response?.status === 401) {
        // Handle unauthorized error
        toast.error('Please log in to complete your order');
        return false;
      }
      setError(error.message || 'Payment failed. Please try again.');
      return false;
    } finally {
      setProcessing(false);
    }
  };

  const value = {
    processing,
    error,
    handlePayment,
    clearError: () => setError(null)
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}; 

