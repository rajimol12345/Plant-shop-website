import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './AboutHero.css';

const AboutHero = () => {
    return (
        <section className="about-hero-section">
            <div className="about-hero-wrapper">
                <Row className="g-0 w-100">
                    <Col lg={6} className="p-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="about-hero-img-container"
                        >
                            {/* 
                  Using the new greenhouse image showing a woman tending to plants
                */}
                            <img
                                src="/images/greenhouse-hero.jpg"
                                alt="About Hero - Greenhouse"
                                className="about-hero-img"
                            />
                        </motion.div>
                    </Col>
                    <Col lg={6} className="d-flex align-items-center bg-white">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="about-hero-content p-5"
                        >
                            <h6 className="about-hero-subtitle">ABOUT</h6>
                            <h1 className="about-hero-title">WE ARE Greenova PLANT & FLOWER STORE</h1>
                            <div className="about-hero-underline"></div>
                        </motion.div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default AboutHero;
