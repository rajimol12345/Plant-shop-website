import React from 'react';
import { Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { FaChevronLeft, FaChevronRight, FaFacebookF, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section-wrapper">
      <Row className="g-0 h-100">
        {/* Left Column - Lifestyle Image */}
        <Col md={6} className="hero-left">
          {/* Zoom Animation Background */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="hero-bg-anim"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/hero-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }}
          />
          {/* Overlay — sits above the bg, below the content */}
          <div className="hero-overlay"></div>
          <Fade triggerOnce>
            <div className="hero-content">
              <span className="hero-subtitle">WELCOME TO Greenova</span>
              <h1 className="hero-title">DISCOVER PLANT <br /> FOR YOUR INTERIOR</h1>
              <p className="hero-desc">
                We provide the best quality plants for your interior decoration.
              </p>
              <Button className="btn-hero-shop" size="lg" onClick={() => navigate('/shop')}>Explore More &rarr;</Button>
            </div>
          </Fade>
        </Col>

        {/* Right Column - Product Slider */}
        <Col md={6} className="hero-right d-flex align-items-center justify-content-center position-relative">
          <div className="hero-product-card text-center">
            <div className="position-relative d-inline-block">
              <Badge bg="danger" className="hero-sale-badge">SALE</Badge>
              <img src="/images/ficus-new.jpg" alt="Ficus Benjamina" className="hero-product-img img-fluid" />
            </div>
            <h3 className="hero-product-name mt-4">FICUS BENJAMINA</h3>
            <div className="hero-product-price mb-3">
              <span className="text-muted text-decoration-line-through me-2">$65.00</span>
              <span className="fw-bold fs-4">$54.00</span>
            </div>
            <Button className="btn-hero-cart">Add To Cart</Button>

            <div className="hero-arrows mt-4">
              <span className="arrow-icon me-3"><FaChevronLeft /></span>
              <span className="arrow-icon"><FaChevronRight /></span>
            </div>
          </div>

          {/* Social Icons Sidebar */}
          <div className="hero-social-icons d-none d-md-flex flex-column gap-3">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaPinterest /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
