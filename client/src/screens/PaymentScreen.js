import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/payment');
        } else if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [userInfo, shippingAddress, navigate]);

    // DEFAULT TO PAYPAL
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="bg-off-white py-5 min-vh-100">
            <Container className="py-5 mt-5">
                <Row className="justify-content-center">
                    <Col lg={6} md={8}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="checkout-card-v2"
                        >
                            <CheckoutSteps step1 step2 step3 />

                            <h2 className="section-title-v2 text-center mb-5">PAYMENT METHOD</h2>

                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-5">
                                    <Form.Label as='legend' className="small fw-bold text-muted text-uppercase letter-spacing-1 mb-4">Select Method</Form.Label>
                                    <div className="payment-options">
                                        <div className="payment-option-item p-3 border mb-3 rounded-1 d-flex align-items-center">
                                            <Form.Check
                                                type='radio'
                                                label='PayPal (Test Mode)'
                                                id='PayPal'
                                                name='paymentMethod'
                                                value='PayPal'
                                                checked={paymentMethod === 'PayPal'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="custom-radio-v2"
                                            ></Form.Check>
                                        </div>
                                        <div className="payment-option-item p-3 border mb-3 rounded-1 d-flex align-items-center">
                                            <Form.Check
                                                type='radio'
                                                label='Cash on Delivery (COD)'
                                                id='COD'
                                                name='paymentMethod'
                                                value='COD'
                                                checked={paymentMethod === 'COD'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="custom-radio-v2"
                                            ></Form.Check>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Button type='submit' className="btn-premium w-100">
                                    CONTINUE TO REVIEW
                                </Button>
                            </Form>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PaymentScreen;
