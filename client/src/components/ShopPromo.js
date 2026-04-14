import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ShopPromo.css';

const ShopPromo = () => {
    return (
        <section className="shop-promo-section mb-5 mt-4">
            <Container fluid>
                <Row className="g-4">
                    <Col md={6}>
                        <div className="shop-promo-card color-1">
                            <div className="promo-text">
                                <span className="promo-subtitle-v2 color-1">SELECT</span>
                                <h3 className="promo-title-v2">HOUSE PLANT</h3>
                                <Link to="/shop" className="promo-link-v2">Shop Now &rarr;</Link>
                            </div>
                            <div className="promo-img-v2">
                                <img src={`${process.env.REACT_APP_API_URL || ''}/images/featured-house-plant.jpg`} alt="House Plant" />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="shop-promo-card color-2">
                            <div className="promo-text">
                                <span className="promo-subtitle-v2 color-2">MINIMAL</span>
                                <h3 className="promo-title-v2">TABLE PLANT DECOR</h3>
                                <Link to="/shop" className="promo-link-v2">Shop Now &rarr;</Link>
                            </div>
                            <div className="promo-img-v2">
                                <img src="/images/about-bg-woman.png" alt="Table Plant Decor" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ShopPromo;
