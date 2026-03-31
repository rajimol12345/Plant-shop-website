import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Message } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { payOrder } from '../actions/orderActions';

const StripeCheckoutForm = ({ orderId, totalPrice, userInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            dispatch(
                payOrder(orderId, {
                    id: paymentIntent.id,
                    status: paymentIntent.status,
                    update_time: new Date().toISOString(),
                    email_address: userInfo ? userInfo.email : 'paid@example.com',
                })
            );
            setMessage('Payment Succeeded!');
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                type="submit"
                variant="primary"
                className="w-100 mt-3 btn-success"
            >
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : `Pay $${totalPrice}`}
                </span>
            </Button>
            {message && <div id="payment-message" className="text-danger mt-2">{message}</div>}
        </form>
    );
};

export default StripeCheckoutForm;
