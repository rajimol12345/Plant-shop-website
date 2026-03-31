import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!userInfo) {
            navigate('/login?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
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
                            <CheckoutSteps step1 step2 />

                            <h2 className="section-title-v2 text-center mb-5">SHIPPING DETAILS</h2>

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='address' className="mb-4">
                                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Address</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter address'
                                        value={address}
                                        required
                                        className="form-control-v2"
                                        onChange={(e) => setAddress(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='city' className="mb-4">
                                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">City</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter city'
                                        value={city}
                                        required
                                        className="form-control-v2"
                                        onChange={(e) => setCity(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='postalCode' className="mb-4">
                                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Postal Code</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter postal code'
                                        value={postalCode}
                                        required
                                        className="form-control-v2"
                                        onChange={(e) => setPostalCode(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='country' className="mb-5">
                                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Country</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter country'
                                        value={country}
                                        required
                                        className="form-control-v2"
                                        onChange={(e) => setCountry(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button type='submit' className="btn-premium w-100">
                                    CONTINUE TO PAYMENT
                                </Button>
                            </Form>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShippingScreen;
