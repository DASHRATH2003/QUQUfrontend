import { createContext, useState, useContext, useCallback } from 'react';
import api from '../utils/axios';

export const OrderContext = createContext();

export const useOrderContext = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMyOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching orders...');
      const response = await api.get('/api/orders/my-orders');
      console.log('Orders response:', response.data);
      setOrders(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        setError('Please log in to view your orders');
      } else {
        setError(error.message || 'Could not fetch orders. Please try again.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any external values

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/orders', orderData);
      setOrder(response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Please log in to create an order');
      } else {
        setError(error.message || 'Could not create order. Please try again.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const capturePayment = async (orderId, paymentDetails) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/orders/${orderId}/payment`, paymentDetails);
      setOrder(response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Please log in to complete payment');
      } else {
        setError(error.message || 'Payment failed. Please try again.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetails = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      setOrder(response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Please log in to view order details');
      } else {
        setError(error.message || 'Could not fetch order details.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    order,
    loading,
    error,
    getMyOrders,
    createOrder,
    capturePayment,
    getOrderDetails
  };
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 