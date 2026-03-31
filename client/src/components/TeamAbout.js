import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Award, Wallet } from 'lucide-react';
import './TeamAbout.css';

const TeamAbout = () => {
    return (
        <section className="team-about-v2 py-5">
            <Container fluid className="px-lg-5">
                <Row className="align-items-center">
                    <Col lg={6} className="mb-5 mb-lg-0 px-lg-5">
                        <div className="team-about-content-v2">
                            <h6 className="about-subtitle-v2">ABOUT US</h6>
                            <h2 className="about-title-v2">PLANTS MAKE LIFE BETTER. WE MAKE PLANTS EASY</h2>
                            <p className="about-text-v2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>

                            <Row className="mb-5">
                                <Col sm={6} className="mb-4 mb-sm-0">
                                    <div className="about-badge-v2 d-flex align-items-center">
                                        <div className="badge-icon-v2 me-3">
                                            <Award size={40} color="#F8B864" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h6 className="badge-title-v2 mb-1">BEST QUALITY</h6>
                                            <p className="badge-desc-v2 mb-0">Lorem ipsum dolor sit amet, consectetur.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="about-badge-v2 d-flex align-items-center">
                                        <div className="badge-icon-v2 me-3">
                                            <Wallet size={40} color="#F8B864" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h6 className="badge-title-v2 mb-1">BEST PRICE</h6>
                                            <p className="badge-desc-v2 mb-0">Lorem ipsum dolor sit amet, consectetur.</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="about-quote-v2 mb-5">
                                <div className="quote-icon-v2 mb-3">
                                    <span style={{ fontSize: '4rem', color: '#F8B864', lineHeight: '1', fontFamily: 'serif' }}>“</span>
                                </div>
                                <p className="quote-text-v2">
                                    We make buying plants easy by delivering healthy plants to your door and setting you up with the tips and tricks you need to help your plants grow
                                </p>
                            </div>

                            <button className="btn-stories-v2" onClick={() => window.location.href = '/about'}>
                                Our Stories <span className="ms-2">&rarr;</span>
                            </button>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="about-images-v2 position-relative">
                            <div className="main-img-v2 shadow-lg">
                                <img src="/images/about-us.jpg" alt="Planting" className="img-fluid" />
                            </div>
                            <div className="stats-badge-v2">
                                <h3 className="stats-number-v2">20 <sup>+</sup></h3>
                                <p className="stats-label-v2">YEARS OF EXPERIENCES</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TeamAbout;
