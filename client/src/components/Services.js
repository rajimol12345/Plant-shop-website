import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShippingFast, FaHeadset, FaSyncAlt, FaCreditCard } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import './Services.css';

const Services = () => {
  return (
    <Container fluid className="services-section">
      <Row className="justify-content-center">
        <Col lg={3} md={6} className="service-col">
          <Fade direction="up" delay={100}>
            <div className="service-item">
              <div className="service-icon">
                <FaShippingFast />
              </div>
              <div className="service-content">
                <h3>FREE SHIPPING</h3>
                <p>Orders Over $200</p>
              </div>
            </div>
          </Fade>
        </Col>
        <Col lg={3} md={6} className="service-col">
          <Fade direction="up" delay={200}>
            <div className="service-item">
              <div className="service-icon">
                <FaHeadset />
              </div>
              <div className="service-content">
                <h3>24/7 SUPPORT</h3>
                <p>Ready For You</p>
              </div>
            </div>
          </Fade>
        </Col>
        <Col lg={3} md={6} className="service-col">
          <Fade direction="up" delay={300}>
            <div className="service-item">
              <div className="service-icon">
                <FaSyncAlt />
              </div>
              <div className="service-content">
                <h3>14 DAYS RETURN</h3>
                <p>Free Return</p>
              </div>
            </div>
          </Fade>
        </Col>
        <Col lg={3} md={6} className="service-col">
          <Fade direction="up" delay={400}>
            <div className="service-item">
              <div className="service-icon">
                <FaCreditCard />
              </div>
              <div className="service-content">
                <h3>QUICK PAYMENT</h3>
                <p>100% Secure</p>
              </div>
            </div>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
