import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axios';
import toast from 'react-hot-toast';

const PAYPAL_CLIENT_ID = "Aau2qe859LPCC3_S1ys_gODUMA8fzJryjawW8-kUGLO7jubui34pJoPs2WBqXq17KQxplyU9aZ1PAVx4";

// UK Postcode regex pattern
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

const PayPalButton = ({ formData }) => {
    const [loading, setLoading] = useState(false);
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Format postcode to standard UK format (e.g., "SW1A 1AA")
    const formatUKPostcode = (postcode) => {
        // Remove all spaces and convert to uppercase
        const clean = postcode.replace(/\s+/g, '').toUpperCase();
        // Add space in the correct position
        return clean.replace(/^(.+?)(\d[A-Z]{2})$/, '$1 $2');
    };

    const handleSuccess = async (details) => {
        try {
            setLoading(true);
            console.log('Payment successful:', details);
            
            // Format the postcode
            const formattedPostcode = formatUKPostcode(formData.postcode);
            
            // Create order data
            const orderData = {
                items: cartItems.map(item => ({
                    name: item.name,
                    price: parseFloat(item.price),
                    quantity: parseInt(item.quantity),
                    image: item.image || item.imageUrl
                })),
                totalAmount: parseFloat(getTotalPrice()),
                shippingAddress: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    street: formData.address,
                    city: formData.city,
                    state: formData.state,
                    postcode: formattedPostcode,
                    country: 'GB'
                },
                paymentMethod: 'PayPal',
                paymentId: details.id,
                paymentStatus: details.status.toLowerCase()
            };

            console.log('Sending order data to backend:', orderData);

            // Save order to backend
            const response = await api.post('/api/orders', orderData);
            console.log('Order created successfully:', response.data);
            
            // Clear the cart
            clearCart();
            
            // Show success message
            toast.success('Order placed successfully! Thank you for your purchase.');
            
            // Redirect to order confirmation
            navigate(`/order-confirmation/${response.data._id}`);
        } catch (error) {
            console.error('Error processing order:', error);
            console.error('Error details:', error.response?.data);
            
            let errorMessage = 'There was a problem saving your order.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                errorMessage += ' ' + Object.values(errors).join(', ');
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Validate form data before showing PayPal button
    const isFormValid = () => {
        if (!formData.name || !formData.email || !formData.phone || 
            !formData.address || !formData.city || !formData.postcode) {
            return false;
        }

        // Validate UK postcode format
        if (!UK_POSTCODE_REGEX.test(formData.postcode)) {
            toast.error('Please enter a valid UK postcode (e.g., SW1A 1AA)');
            return false;
        }

        return true;
    };

    if (!isFormValid()) {
        return (
            <div className="text-red-600 text-sm mb-4">
                Please fill in all delivery information with valid details. UK postcode format required (e.g., SW1A 1AA).
            </div>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-red-600 text-sm mb-4">
                Your cart is empty. Please add items before proceeding to payment.
            </div>
        );
    }

    return (
        <div className="w-full">
            {loading && (
                <div className="flex justify-center items-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            <PayPalScriptProvider options={{
                "client-id": PAYPAL_CLIENT_ID,
                currency: "GBP",
                intent: "capture",
                "buyer-country": "GB"
            }}>
                <PayPalButtons
                    style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                    }}
                    createOrder={(data, actions) => {
                        const total = getTotalPrice();
                        console.log('Creating PayPal order with amount:', total);
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: total.toString(),
                                    currency_code: "GBP"
                                },
                                shipping: {
                                    name: {
                                        full_name: formData.name
                                    },
                                    address: {
                                        address_line_1: formData.address,
                                        admin_area_1: formData.state,
                                        admin_area_2: formData.city,
                                        postal_code: formatUKPostcode(formData.postcode),
                                        country_code: "GB"
                                    }
                                }
                            }],
                            application_context: {
                                shipping_preference: "SET_PROVIDED_ADDRESS",
                                locale: "en-GB",
                                brand_name: "QUQU LONDON",
                                landing_page: "LOGIN",
                                user_action: "PAY_NOW",
                                return_url: window.location.origin + "/order-confirmation",
                                cancel_url: window.location.origin + "/checkout"
                            }
                        });
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            console.log('Payment approved, capturing order...');
                            const order = await actions.order.capture();
                            console.log('Payment captured:', order);
                            await handleSuccess(order);
                        } catch (error) {
                            console.error('Error capturing order:', error);
                            toast.error('Payment failed. Please try again.');
                        }
                    }}
                    onError={(err) => {
                        console.error('PayPal error:', err);
                        toast.error('Payment failed. Please try again.');
                    }}
                    onCancel={() => {
                        console.log('Payment cancelled by user');
                        toast.error('Payment cancelled');
                    }}
                    disabled={loading}
                />
            </PayPalScriptProvider>

            <div className="mt-4 text-center text-sm text-gray-500">
                <p>Test PayPal Account:</p>
                <p>Email: sb-47ej5q29397099@personal.example.com</p>
                <p>Password: your-password</p>
                <p className="mt-2">Example UK Postcode Format: SW1A 1AA</p>
            </div>
        </div>
    );
};

export default PayPalButton; 