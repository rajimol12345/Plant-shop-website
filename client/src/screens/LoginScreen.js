import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../actions/userActions';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo) {
            if (userInfo.isAdmin && redirect === '/') {
                navigate('/admin/dashboard');
            } else {
                navigate(redirect);
            }
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="bg-off-white py-5 min-vh-100">
            <Container className="py-5 mt-5">
                <Row className="justify-content-center">
                    <Col lg={5} md={7}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="checkout-card-v2">
                                <h1 className="section-title-v2 text-center mb-5">SIGN IN</h1>

                                {error && (
                                    <div className="alert alert-danger border-0 rounded-1 small py-2 px-3 mb-4">
                                        <i className="fas fa-exclamation-circle me-2"></i> {error}
                                    </div>
                                )}

                                {loading && <p className="text-center small py-2">Authenticating...</p>}

                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-4" controlId="email">
                                        <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            required
                                            className="form-control-v2"
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-5" controlId="password">
                                        <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            required
                                            className="form-control-v2"
                                            onChange={(e) => setPassword(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button type="submit" className="btn-premium w-100">
                                        SIGN IN
                                    </Button>
                                </Form>

                                <div className="text-center mt-4 pt-3 border-top">
                                    <p className="text-muted small mb-0">
                                        New Customer?{' '}
                                        <Link
                                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                            className="text-orange fw-bold text-decoration-none"
                                        >
                                            REGISTER
                                        </Link>
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginScreen;
