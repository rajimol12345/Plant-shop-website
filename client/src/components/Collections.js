import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './Collections.css';

// Using the same assets as the previous implementation or placeholders if not found
import featuredGiftGreen from '../assets/images/featured-gift-green.jpg';
import featuredPetFriendly from '../assets/images/featured-pet-friendly.jpg';
import featuredHousePlant from '../assets/images/featured-house-plant.jpg';
import featuredAirPurifying from '../assets/images/featured-air-purifying.jpg';

const collections = [
    {
        id: 1,
        title: 'Gift Green',
        image: featuredGiftGreen,
        link: '/shop?category=Gift Green'
    },
    {
        id: 2,
        title: 'Pet Friendly',
        image: featuredPetFriendly,
        link: '/shop?category=Pet Friendly'
    },
    {
        id: 3,
        title: 'House Plant',
        image: featuredHousePlant,
        link: '/shop?category=House Plant'
    },
    {
        id: 4,
        title: 'Air Purifying',
        image: featuredAirPurifying,
        link: '/shop?category=Air Purifying'
    }
];

const Collections = () => {
    return (
        <section className="collections-section py-5">
            <Container fluid>
                {/* Header Group */}
                <div className="text-center mb-5">
                    <p className="collection-label mb-2">COLLECTION</p>
                    <h2 className="collection-heading">SHOP FAVORITE COLLECTIONS</h2>
                    <div className="collection-underline mx-auto"></div>
                </div>

                {/* Grid Layout */}
                <Row className="g-4">
                    {collections.map((item) => (
                        <Col md={3} key={item.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="collection-card"
                            >
                                <div className="collection-img-wrapper">
                                    <motion.img
                                        src={item.image}
                                        alt={item.title}
                                        className="img-fluid collection-img"
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </div>
                                {/* Optional: Add Overlay Title if desired, though prompt didn't strictly ask for it inside the card, 
                    usually collections have titles visible. I will stick to image per prompt grid but the object 
                    usually implies a label. The reference has titles below or over. 
                    I'll assume just the image grid as specifically requested "collection card with an image".
                    I'll add the title below for clarity matching standard UX. */}
                                <h5 className="mt-3 text-center collection-title">{item.title}</h5>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Collections;
