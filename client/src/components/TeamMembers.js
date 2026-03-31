import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './TeamMembers.css';

const TeamMembers = () => {
    const members = [
        { name: 'CHARLIE POWELL', role: 'Employee', image: '/images/team-member-1.png' },
        { name: 'JOYCE KNIGHT', role: 'Greenova Owner', image: '/images/team-member-2.png' },
        { name: 'EVAN FABRE', role: 'Employee', image: '/images/team-member-1.png' },
        { name: 'WALTER FRANKLIN', role: 'Employee', image: '/images/team-member-2.png' },
        { name: 'RACHEL CASTRO', role: 'Employee', image: '/images/team-member-1.png' },
        { name: 'BENJAMIN FOX', role: 'Employee', image: '/images/team-member-2.png' },
    ];

    return (
        <section className="team-members-v2 py-5">
            <Container>
                <div className="text-center mb-5 mt-5">
                    <h6 className="team-subtitle-v2">OUR TEAM</h6>
                    <h2 className="team-title-v2">MEET OUR BEST TEAM</h2>
                    <div className="title-bar-v2 mx-auto"></div>
                </div>
                
                <Row className="g-4">
                    {members.map((member, index) => (
                        <Col key={index} xs={12} md={6} lg={4}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="team-card-v2"
                            >
                                <div className="team-img-wrapper-v2">
                                    <img src={member.image} alt={member.name} className="img-fluid" />
                                    <div className="team-info-box-v2">
                                        <h4 className="member-name-v2">{member.name}</h4>
                                        <p className="member-role-v2">{member.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TeamMembers;
