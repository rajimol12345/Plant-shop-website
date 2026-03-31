import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Send } from 'lucide-react';
import axios from 'axios';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/newsletter/subscribe', { email });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  }

  return (
    <section className="newsletter-section-v2">
      <Container fluid>
        <div className="newsletter-card-v2">
          <div className="newsletter-text-content">
            <h6 className="newsletter-tagline">MODERN HOUSE PLANT</h6>
            <h2 className="newsletter-main-title">SUBSCRIBE & GET 10% OFF</h2>
            <p className="newsletter-info-text">
              Join our community and get the latest updates on new plant collections and special offers delivered straight to your inbox.
            </p>
          </div>

          <div className="newsletter-form-container">
            <Form onSubmit={submitHandler} className="newsletter-v3-form position-relative">
              <Form.Control
                type="email"
                placeholder="Your Email Address"
                className="newsletter-v3-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <button type="submit" className="newsletter-v3-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'SUBMITTING...' : 'SUBSCRIBE'} <Send className="ms-3" size={18} />
              </button>
            </Form>
            {status === 'success' && <p className="text-success mt-3 small fw-bold">Thank you! You've successfully subscribed.</p>}
            {status === 'error' && <p className="text-danger mt-3 small fw-bold">Something went wrong. Please try again.</p>}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;
