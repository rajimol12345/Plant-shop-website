import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/login';

    useEffect(() => {
        if (userInfo) {
            toast.success('Registration Successful! Please login.');
            dispatch({ type: USER_REGISTER_RESET });
            navigate('/login');
        }
    }, [navigate, userInfo, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password, true));
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '500px', padding: '20px' }}>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <div className="card p-4 p-md-5 border-0 shadow-lg" style={{ borderRadius: '12px' }}>
                <h3 className="text-center mb-4 text-uppercase fw-bold" style={{ letterSpacing: '0.5px', color: '#333', fontSize: '1.5rem', lineHeight: '1.4' }}>
                    Create Account
                </h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Control
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-light border-0 py-3 px-4"
                            style={{ fontSize: '0.95rem' }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-light border-0 py-3 px-4"
                            style={{ fontSize: '0.95rem' }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-light border-0 py-3 px-4"
                            style={{ fontSize: '0.9rem' }}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-light border-0 py-3 px-4"
                            style={{ fontSize: '0.95rem' }}
                        ></Form.Control>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary" className="btn-primary py-3 text-uppercase fw-bold" style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>
                            Register
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="text-center mt-3">
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-decoration-none text-muted" style={{ fontSize: '0.9rem' }}>
                    Have an Account? <span className="fw-bold text-primary">Login</span>
                </Link>
            </div>
        </div>
    );
};

export default RegisterScreen;
