import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);


    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

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
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
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
                                <h1 className="section-title-v2 text-center mb-5">CREATE ACCOUNT</h1>

                                {message && (
                                    <div className="alert alert-warning border-0 rounded-1 small py-2 px-3 mb-4">
                                        <i className="fas fa-exclamation-triangle me-2"></i> {message}
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger border-0 rounded-1 small py-2 px-3 mb-4">
                                        <i className="fas fa-exclamation-circle me-2"></i> {error}
                                    </div>
                                )}

                                {loading && <p className="text-center small py-2">Creating Account...</p>}

                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-4" controlId="name">
                                        <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Full Name</Form.Label>
                                        <Form.Control
                                            type="name"
                                            placeholder="Enter name"
                                            value={name}
                                            required
                                            className="form-control-v2"
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

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

                                    <Form.Group className="mb-4" controlId="password">
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

                                    <Form.Group className="mb-4" controlId="confirmPassword">
                                        <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            required
                                            className="form-control-v2"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>


                                    <Button type="submit" className="btn-premium w-100">
                                        REGISTER
                                    </Button>
                                </Form>

                                <div className="text-center mt-4 pt-3 border-top">
                                    <p className="text-muted small mb-0">
                                        Already have an Account?{' '}
                                        <Link
                                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                            className="text-orange fw-bold text-decoration-none"
                                        >
                                            LOGIN
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

export default RegisterScreen;
