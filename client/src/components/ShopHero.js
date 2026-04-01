import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ShopHero.css';

const ShopHero = () => {
    return (
        <section className="shop-hero-section-v2">
            <Container fluid className="p-0">
                <Row className="align-items-center g-0">
                    <Col lg={6} className="order-2 order-lg-1">
                        <div className="shop-hero-img-container">
                            <img src="/images/about-bg-leaves.jpg" alt="Shop Hero" className="shop-hero-img" />
                        </div>
                    </Col>
                    <Col lg={6} className="order-1 order-lg-2">
                        <div className="shop-hero-content-v2 ps-lg-5 py-5 px-4">
                            <span className="shop-hero-subtitle">SHOP</span>
                            <h1 className="shop-hero-title">OUR PRODUCT</h1>
                            <div className="shop-hero-underline"></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ShopHero;
