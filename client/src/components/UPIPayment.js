import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { payOrder } from '../actions/orderActions';

const UPIPayment = ({ orderId, totalPrice, orderItems }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // 1. Create Razorpay Order
            const { data: order } = await axios.post(
                '/api/payment/razorpay/create-order',
                { amount: totalPrice, currency: 'INR', items: orderItems },
                config
            );

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'your_razorpay_key_id',
                amount: order.amount,
                currency: order.currency,
                name: 'Plant Shop',
                description: 'Order Payment',
                order_id: order.id,
                handler: async (response) => {
                    try {
                        // 3. Verify payment on backend
                        await axios.post('/api/payment/razorpay/verify', response, config);

                        // 4. Update order status in Redux/DB
                        dispatch(payOrder(orderId, {
                            id: response.razorpay_payment_id,
                            status: 'COMPLETED',
                            update_time: new Date().toISOString(),
                            email_address: userInfo.email,
                            orderId: response.razorpay_order_id,
                            gateway: 'RAZORPAY'
                        }));
                    } catch (err) {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: userInfo.name,
                    email: userInfo.email,
                },
                theme: {
                    color: '#003d29',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Razorpay Error');
            alert('Failed to initiate Razorpay payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-0 bg-light p-4 rounded-3 shadow-sm mt-4 text-center">
            <h5 className="fw-bold mb-3" style={{ color: '#0c5b47' }}>PAY WITH RAZORPAY (UPI/CARDS)</h5>
            <p className="small text-muted mb-4">
                Secure payment via Razorpay. Supports all UPI apps (GPay, PhonePe, Paytm), Cards, and Netbanking.
            </p>
            <Button
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="btn-premium w-100 py-3 fw-bold"
                style={{ backgroundColor: '#003d29', border: 'none' }}
            >
                {loading ? 'INITIALIZING...' : `PAY $${totalPrice}`}
            </Button>
        </Card>
    );
};

export default UPIPayment;
