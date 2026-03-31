import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './PartnerLogos.css';

const PartnerLogos = () => {
    const partners = [
        { name: 'Partner 1', logo: '/images/partner1.png' },
        { name: 'Partner 2', logo: '/images/partner2.png' },
        { name: 'Partner 3', logo: '/images/partner3.png' },
        { name: 'Partner 4', logo: '/images/partner4.png' },
        { name: 'Partner 5', logo: '/images/partner5.png' }
    ];

    return (
        <section className="partner-logos py-5">
            <Container>
                <Row className="align-items-center justify-content-center opacity-50">
                    {partners.map((partner, index) => (
                        <Col key={index} xs={4} md={2} className="text-center mb-4 mb-md-0">
                            <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="img-fluid grayscale-filter" 
                                style={{ maxHeight: '40px' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<span class="fw-bold">${partner.name}</span>`;
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default PartnerLogos;
