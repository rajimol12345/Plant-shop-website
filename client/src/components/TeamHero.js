import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './TeamHero.css';

const TeamHero = () => {
    return (
        <section className="team-hero-v2">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6} className="order-lg-1 order-2">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hero-image-box"
                        >
                            <img src="/images/team-hero.png" alt="Team Hero" className="img-fluid" />
                        </motion.div>
                    </Col>
                    <Col lg={6} className="order-lg-2 order-1 mb-5 mb-lg-0">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hero-text-content ps-lg-5"
                        >
                            <h6 className="hero-subtitle-v2">TEAM</h6>
                            <h1 className="hero-title-v2">OUR TEAM</h1>
                            <div className="hero-breadcrumb-v2">
                                <span>Home</span> <span className="separator">/</span> <span>Team</span>
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TeamHero;
