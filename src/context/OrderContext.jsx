import React from 'react';
import { OrderContext, useOrderContext } from './orderContextUtils';

export const OrderProvider = ({ children }) => {
  const {
    orders,
    order,
    loading,
    error,
    getMyOrders,
    createOrder,
    capturePayment,
    getOrderDetails
  } = useOrderContext();

  return (
    <OrderContext.Provider
      value={{
        orders,
        order,
        loading,
        error,
        getMyOrders,
        createOrder,
        capturePayment,
        getOrderDetails
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}; 