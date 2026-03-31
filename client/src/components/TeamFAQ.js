import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import './TeamFAQ.css';

const TeamFAQ = () => {
    return (
        <section className="team-faq-v2 py-5">
            <Container fluid className="px-lg-5">
                <Row className="align-items-center">
                    <Col lg={6} className="mb-5 mb-lg-0">
                        <div className="faq-img-v2">
                            <img src="/images/faq-img.jpg" alt="Watering Plants" className="img-fluid rounded shadow" />
                        </div>
                    </Col>
                    <Col lg={6} className="px-lg-5">
                        <div className="faq-content-v2">
                            <h6 className="faq-subtitle-v2">FAQ</h6>
                            <h2 className="faq-title-v2">RELATED QUESTIONS</h2>

                            <Accordion defaultActiveKey="0" className="faq-accordion-v2">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>WHAT'S INCLUDED WITH EACH INDOOR PLANT?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>CAN I CANCEL OR CHANGE MY ORDER?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>CAN I RETURN PLANTS?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>MY PLANT ARRIVED! WHAT DO I DO NEXT?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TeamFAQ;
