import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './InstagramSection.css';

const InstagramSection = () => {
    const images = [
        '/images/insta-1.jpg',
        '/images/insta-2.jpg',
        '/images/insta-3.jpg',
        '/images/insta-4.jpg',
        '/images/insta-5.jpg',
        '/images/insta-2.jpg',
    ];

    return (
        <section className="instagram-section-v2 py-5">
            <Container fluid className="px-0">
                <div className="text-center mb-5">
                    <h6 className="insta-handle-v2">@Greenova.STORE</h6>
                    <h2 className="insta-title-v2">Greenova ON INSTAGRAM</h2>
                    <div className="insta-underline-v2 mx-auto"></div>
                </div>
                <Row className="g-0">
                    {images.map((src, index) => (
                        <Col key={index} xs={6} md={4} lg={2}>
                            <motion.div
                                className="insta-item-v2"
                                whileHover={{ opacity: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image src={src} alt={`Instagram ${index + 1}`} fluid />
                                <div className="insta-overlay-v2">
                                    <i className="fab fa-instagram"></i>
                                </div>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default InstagramSection;
