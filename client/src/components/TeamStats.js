import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './TeamStats.css';

const TeamStats = () => {
    const stats = [
        { number: '15+', label: 'Years Experience' },
        { number: '120+', label: 'Expert Staff' },
        { number: '500+', label: 'Satisfied Clients' },
        { number: '10k+', label: 'Plants Delivered' }
    ];

    return (
        <section className="team-stats py-5" style={{ backgroundColor: '#fdfbf9' }}>
            <Container>
                <Row className="text-center">
                    {stats.map((stat, index) => (
                        <Col key={index} xs={6} md={3} className="mb-4 mb-md-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h2 className="stat-number">{stat.number}</h2>
                                <p className="stat-label text-muted">{stat.label}</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TeamStats;
