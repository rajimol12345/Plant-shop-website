import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, logout } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = new URLSearchParams(location.search).get('redirect') || '/admin/dashboard';

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!location.search) toast.success(`Welcome back ${userInfo.name}!`);
      navigate(redirect);
    } else if (userInfo && !userInfo.isAdmin) {
      toast.error('Not authorized as Admin.');
      dispatch(logout());
      window.location.href = 'http://localhost:3000';
    }
  }, [navigate, userInfo, redirect, location.search, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div style={{ width: '100%', maxWidth: '450px', padding: '20px' }}>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <div className="card p-4 p-md-5 border-0 shadow-lg" style={{ borderRadius: '12px' }}>
        <h3 className="text-center mb-4 fw-bold" style={{ letterSpacing: '0.5px', color: '#333', fontSize: '1.5rem', lineHeight: '1.4' }}>
          SIGN IN TO YOUR <br className="d-block d-sm-none" /> ACCOUNT
        </h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="mb-4">
            <Form.Control
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-light border-0 py-3 px-4"
              style={{ fontSize: '0.95rem' }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-light border-0 py-3 px-4"
              style={{ fontSize: '0.95rem' }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="keepSignedIn" className="mb-4">
            <Form.Check
              type="checkbox"
              label="Keep me signed in"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="text-muted"
              style={{ fontSize: '0.9rem' }}
            ></Form.Check>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" className="btn-primary py-3 text-uppercase fw-bold" style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>
              Sign In
            </Button>
          </div>
        </Form>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-muted text-decoration-none" style={{ fontSize: '0.85rem' }}>
            Forgot your password?
          </Link>
        </div>
      </div>
      <div className="text-center mt-3">
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-decoration-none text-muted" style={{ fontSize: '0.9rem' }}>
          New here? <span className="fw-bold text-primary">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
