import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const OrderSuccessScreen = () => {
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-off-white py-5 min-vh-100 d-flex align-items-center">
            <Container fluid>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <Card className="checkout-card-v2 border-0 shadow-lg mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="success-icon-wrapper mb-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.3 }}
                            >
                                <FiCheckCircle size={100} color="#F8B864" />
                            </motion.div>
                        </div>

                        <span className="section-subtitle-v2">SUCCESSFULLY PLACED</span>
                        <h1 className="display-5 fw-bold mb-3" style={{ color: '#0c5b47' }}>THANK YOU FOR YOUR ORDER!</h1>
                        <p className="text-muted fs-5 mb-5 px-md-4">
                            Your order has been placed successfully. You will receive an email confirmation shortly with your order details.
                        </p>

                        <div className="order-brief p-4 bg-light rounded-3 mb-5 border">
                            <div className="d-flex justify-content-between align-items-center mb-0">
                                <span className="text-muted small text-uppercase letter-spacing-1">Order Number</span>
                                <span className="fw-bold text-dark">#{orderId ? orderId.slice(-8).toUpperCase() : 'N/A'}</span>
                            </div>
                        </div>

                        <div className="d-grid gap-3">
                            <Link to={`/order/${orderId}`} className="text-decoration-none">
                                <Button className="btn-premium w-100 d-flex align-items-center justify-content-center">
                                    <FiPackage className="me-2" /> VIEW ORDER DETAILS
                                </Button>
                            </Link>
                            <Link to="/shop" className="text-decoration-none">
                                <Button variant="outline-dark" className="w-100 py-3 rounded-pill d-flex align-items-center justify-content-center border-2 fw-bold">
                                    <FiShoppingBag className="me-2" /> CONTINUE SHOPPING <FiArrowRight className="ms-2" />
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <div className="mt-5 text-muted small">
                        Need help? <Link to="/contact" className="text-primary-green fw-bold">Contact Our Support Team</Link>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default OrderSuccessScreen;
