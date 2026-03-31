import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const StripePaymentForm = ({ amount, items, userInfo, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // 1. Create Payment Intent on backend
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                '/api/payment/stripe/create-intent',
                { amount, items },
                config
            );

            const clientSecret = data.clientSecret;

            // 2. Confirm payment on frontend
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: userInfo.name,
                        email: userInfo.email,
                    },
                },
            });

            if (result.error) {
                onError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    onSuccess({
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        gateway: 'STRIPE',
                    });
                }
            }
        } catch (error) {
            onError(error.response && error.response.data.message ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4 p-3 border rounded bg-white">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>
            <Button
                type="submit"
                className="btn-premium w-100"
                disabled={!stripe || loading}
            >
                {loading ? 'Processing...' : `Pay $${amount}`}
            </Button>
        </form>
    );
};

export default StripePaymentForm;
