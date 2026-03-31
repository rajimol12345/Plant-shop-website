import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Wallet } from 'lucide-react';
import './AboutUs.css';

// Asset paths
const aboutMain = '/images/about-us.jpg';
const bgLeaves = '/images/about-bg-leaves.jpg'; // New asset
const bgWoman = '/images/about-bg-woman.png';   // New asset

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="about-us-section py-5">
      <Container fluid className="px-lg-5">
        <Row className="align-items-center">
          {/* Left Column: Text Content */}
          <Col lg={6} className="pe-lg-5 mb-5 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h6 className="about-subtitle">ABOUT US</h6>
              <h2 className="about-title">
                WE MAKE <br /> PLANTS EASY
              </h2>
              <div className="about-divider"></div>

              <p className="about-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <Row className="about-features g-4 mb-4">
                <Col sm={6}>
                  <div className="feature-item-v2">
                    <div className="feature-icon-wrapper">
                      <Award size={48} color="#F8B864" strokeWidth={1.5} />
                    </div>
                    <div className="feature-info">
                      <h5 className="feature-name">BEST QUALITY</h5>
                      <p className="feature-sub">Lorem ipsum dolor sit amet <br /> consectetur.</p>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="feature-item-v2">
                    <div className="feature-icon-wrapper">
                      <Wallet size={48} color="#F8B864" strokeWidth={1.5} />
                    </div>
                    <div className="feature-info">
                      <h5 className="feature-name">BEST PRICE</h5>
                      <p className="feature-sub">Lorem ipsum dolor sit amet <br /> consectetur.</p>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="about-quote-wrapper mb-5">
                <div className="quote-icon">
                  <span className="quote-marks">66</span>
                </div>
                <p className="about-quote-text">
                  We make buying plants easy by delivering healthy plants to your door and setting you up with the tips and tricks you need to help your plants grow
                </p>
              </div>

              <Button className="btn-stories" onClick={() => navigate('/about')}>
                Our Stories <ArrowRight className="ms-3" size={18} />
              </Button>
            </motion.div>
          </Col>

          {/* Right Column: Final Refined Composition */}
          <Col lg={6}>
            <motion.div
              className="about-composition-final"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Layer 1: Large Decorative Background (Leaves) */}
              <div className="composition-bg-layer">
                <img src={bgLeaves} alt="Natural Texture" className="img-fluid" />
              </div>

              {/* Layer 2: Main Foreground Image (Woman with Plant) */}
              <div className="composition-fg-frame">
                <img src={bgWoman} alt="Plant Care Life" className="main-fg-img" />
              </div>

              {/* Experience Badge */}
              <div className="experience-badge-darker">
                <div className="exp-content">
                  <span className="exp-num">20<span className="plus">+</span></span>
                  <span className="exp-label">YEARS OF EXPERIENCES</span>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
