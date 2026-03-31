import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { motion } from 'framer-motion';
import './NotFoundScreen.css';

const NotFoundScreen = () => {
    return (
        <div className="not-found-screen">
            <Container fluid className="p-0">
                <Row className="g-0 min-vh-100 overflow-hidden">
                    {/* Left Column: Image */}
                    <Col lg={6} className="d-none d-lg-block">
                        <div className="not-found-img-wrapper h-100">
                            <img
                                src="/images/about-us.jpg"
                                alt="Not Found Leaves"
                                className="w-100 h-100 object-fit-cover"
                            />
                        </div>
                    </Col>

                    {/* Right Column: Content */}
                    <Col lg={6} className="d-flex align-items-center justify-content-center bg-white">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center p-5"
                        >
                            <h1 className="not-found-404 mb-0">404</h1>
                            <div className="not-found-title-wrapper mb-5">
                                <h2 className="not-found-title">PAGE NOT FOUND</h2>
                                <div className="not-found-underline"></div>
                            </div>
                            <LinkContainer to="/">
                                <Button className="btn-Greenova px-5 py-3 rounded-pill">
                                    Back To Home <span className="ms-2">→</span>
                                </Button>
                            </LinkContainer>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFoundScreen;
