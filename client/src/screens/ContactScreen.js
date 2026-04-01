import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineHome } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import { createContact } from '../actions/contactActions';
import { CONTACT_CREATE_RESET } from '../constants/contactConstants';
import Loader from '../components/Loader';
import './ContactScreen.css';

const ContactScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const dispatch = useDispatch();

    const contactCreate = useSelector((state) => state.contactCreate);
    const { loading, error, success } = contactCreate;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (success) {
            toast.success('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            dispatch({ type: CONTACT_CREATE_RESET });
        }
    }, [success, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createContact(formData));
    };

    return (
        <div className="contact-screen">
            {/* Custom Contact Hero */}
            <section className="contact-hero py-5" style={{ backgroundColor: '#F9F8F6' }}>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start">
                            <img
                                src="/images/green-fresh-home-plants-in-the-interior-of-the-house-in-natural-light--e1653295838555.jpg"
                                alt="Contact Hero - Indoor Plants"
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                            />
                        </Col>
                        <Col lg={6} className="mt-4 mt-lg-0 ps-lg-5">
                            <h6 className="section-subtitle" style={{ color: '#8DA08E', letterSpacing: '2px', fontWeight: 'bold' }}>CONTACT</h6>
                            <h1 className="display-3 fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0c5b47' }}>
                                CONTACT US
                            </h1>
                            <div style={{ width: '100px', height: '3px', backgroundColor: '#F8B864' }}></div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Get In Touch Section */}
            <section className="py-5 my-5">
                <Container fluid>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-5 mb-lg-0">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    src="/images/team-about.png"
                                    alt="Florist"
                                    className="img-fluid rounded"
                                    style={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }}
                                />
                            </motion.div>
                        </Col>
                        <Col lg={6} className="ps-lg-5">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h6 className="section-subtitle mb-2" style={{ color: '#8DA08E' }}>CONTACT US</h6>
                                <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0c5b47' }}>
                                    GET IN TOUCH
                                </h2>
                                <p className="text-muted mb-5" style={{ lineHeight: '1.8' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>

                                <div className="contact-grid-v2">
                                    <div className="contact-item-v2">
                                        <HiOutlineHome size={30} className="text-warning mb-3" />
                                        <h5 className="fw-bold fs-5 mb-2" style={{ fontFamily: 'Playfair Display' }}>DENPASAR</h5>
                                        <p className="text-muted small">Jl. Hang Tuah, Denpasar, Bali 80239</p>
                                    </div>
                                    <div className="contact-item-v2">
                                        <HiOutlineHome size={30} className="text-warning mb-3" />
                                        <h5 className="fw-bold fs-5 mb-2" style={{ fontFamily: 'Playfair Display' }}>CANGGU</h5>
                                        <p className="text-muted small">Jl. Pantai Batu Bolong No.69, Canggu</p>
                                    </div>
                                    <div className="contact-item-v2">
                                        <HiOutlinePhone size={30} className="text-warning mb-3" />
                                        <h5 className="fw-bold fs-5 mb-2" style={{ fontFamily: 'Playfair Display' }}>DENPASAR</h5>
                                        <p className="text-muted small mb-0">+62 361 234 4567</p>
                                        <p className="text-muted small">+62 213 256 4567</p>
                                    </div>
                                    <div className="contact-item-v2">
                                        <HiOutlineMail size={30} className="text-warning mb-3" />
                                        <h5 className="fw-bold fs-5 mb-2" style={{ fontFamily: 'Playfair Display' }}>CANGGU</h5>
                                        <p className="text-muted small mb-0">support@domain.com</p>
                                        <p className="text-muted small">contact@domain.com</p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <h5 className="fw-bold mb-3" style={{ fontSize: '1.2rem' }}>SOCIAL MEDIA</h5>
                                    <p className="text-muted small mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                                    <div className="d-flex gap-3">
                                        <button className="social-icon-btn"><FaFacebookF /></button>
                                        <button className="social-icon-btn"><FaTwitter /></button>
                                        <button className="social-icon-btn"><FaInstagram /></button>
                                        <button className="social-icon-btn"><FaPinterestP /></button>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Map and Form Section */}
            <section className="py-5" style={{ backgroundColor: '#fff' }}>
                <Container fluid>
                    <Row className="g-0 shadow-lg" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                        <Col lg={7}>
                            <div className="h-100">
                                <iframe
                                    title="Google Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.33144565701!2d115.13110260464843!3d-8.672545802111516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b0e5e8025%3A0x2bad93206f3655b3!2sDenpasar%2C%20Bali%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1653034989012!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '500px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </Col>
                        <Col lg={5} className="bg-white p-4 p-md-5">
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit} className="contact-form-v2">
                                <div className="mb-4">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="contact-field-v2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Control
                                        type="email"
                                        placeholder="Your Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="contact-field-v2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="contact-field-v2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Your Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="contact-field-v2"
                                    />
                                </div>
                                <Button type="submit" className="btn-contact-v2 w-100 py-3" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>

        </div>
    );
};

export default ContactScreen;
