import React, { useEffect } from 'react';
import AboutHero from '../components/AboutHero';
import AboutUs from '../components/AboutUs';
import FaqSection from '../components/FaqSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import CollectionGrid from '../components/CollectionGrid';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaHeadset, FaUndo, FaCreditCard, FaArrowRight } from 'react-icons/fa';
import './AboutScreen.css';

const AboutScreen = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-screen">
            <AboutHero />

            {/* Reusing the AboutUs component (Plants Make Life Better) */}
            <AboutUs />

            {/* Promo Banners Section */}
            <section className="py-5">
                <Container fluid>
                    <Row>
                        <Col md={6} className="mb-4 mb-md-0">
                            <div className="promo-banner" style={{ backgroundImage: "url('/images/insta-2.jpg')" }}>
                                <div>
                                    <h6 className="promo-subtitle">NEW ARRIVALS</h6>
                                    <h3 className="promo-title">MODERN HOUSE PLANTS</h3>
                                    <a href="/shop" className="promo-link">Shop Now</a>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="promo-banner" style={{ backgroundImage: "url('/images/insta-3.jpg')" }}>
                                <div>
                                    <h6 className="promo-subtitle">MINIMALIST</h6>
                                    <h3 className="promo-title">TABLE DECOR PLANTS</h3>
                                    <a href="/shop" className="promo-link">Shop Now</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Services/Icons Bar */}
            <section className="services-section">
                <Container fluid>
                    <Row className="text-center">
                        <Col md={3} sm={6} className="mb-4 mb-md-0">
                            <div className="service-item-v2">
                                <FaTruck size={40} className="service-icon-v2" />
                                <h6 className="service-title-v2">FREE SHIPPING</h6>
                                <p className="service-text-v2">Free shipping on all US orders or order above $100</p>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="mb-4 mb-md-0">
                            <div className="service-item-v2">
                                <FaHeadset size={40} className="service-icon-v2" />
                                <h6 className="service-title-v2">24/7 SUPPORT</h6>
                                <p className="service-text-v2">Contact us 24 hours a day, 7 days a week</p>
                            </div>
                        </Col>
                        <Col md={3} sm={6} className="mb-4 mb-md-0">
                            <div className="service-item-v2">
                                <FaUndo size={40} className="service-icon-v2" />
                                <h6 className="service-title-v2">30 DAYS RETURN</h6>
                                <p className="service-text-v2">Simply return it within 30 days for an exchange.</p>
                            </div>
                        </Col>
                        <Col md={3} sm={6}>
                            <div className="service-item-v2">
                                <FaCreditCard size={40} className="service-icon-v2" />
                                <h6 className="service-title-v2">100% PAYMENT SECURE</h6>
                                <p className="service-text-v2">We ensure secure payment with PEV</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials */}
            <section className="py-5" style={{ backgroundColor: '#F9F8F6' }}>
                <Container fluid>
                    <div className="text-center mb-5">
                        <h6 style={{ color: '#8DA08E', fontWeight: 600, letterSpacing: '2px' }}>TESTIMONIALS</h6>
                        <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '2.5rem' }}>WHAT THEY SAY ABOUT US</h2>
                    </div>
                    <TestimonialCarousel />
                </Container>
            </section>

            {/* Team Preview Section */}
            <section className="team-preview-section text-center">
                <Container fluid>
                    <div className="team-preview-content mx-auto">
                        <h6 style={{ color: '#8DA08E', fontWeight: 600, letterSpacing: '2px' }}>OUR TEAM</h6>
                        <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '2.5rem', marginBottom: '30px' }}>
                            WE HAVE THE BEST PROFESSIONAL GARDENERS
                        </h2>
                        <a href="/team" className="btn-about" style={{ textDecoration: 'none' }}>
                            Meet Our Team <FaArrowRight className="ms-2" size={12} />
                        </a>
                    </div>
                </Container>
            </section>

            {/* FAQ Section */}
            <FaqSection />

            {/* Shop Collections */}
            <div className="py-0">
                <CollectionGrid />
            </div>

        </div>
    );
};

export default AboutScreen;
