import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';
import './FeaturedCollection.css';

import featuredGiftGreen from '../assets/images/featured-gift-green.jpg';
import featuredPetFriendly from '../assets/images/featured-pet-friendly.jpg';
import featuredHousePlant from '../assets/images/featured-house-plant.jpg';
import featuredAirPurifying from '../assets/images/featured-air-purifying.jpg';


const collections = [
  {
    title: 'Gift Green',
    image: featuredGiftGreen,
    link: '/products/gifts'
  },
  {
    title: 'Pet Friendly',
    image: featuredPetFriendly,
    link: '/products/pet-friendly'
  },
  {
    title: 'House Plant',
    image: featuredHousePlant,
    link: '/products/house-plant'
  },
  {
    title: 'Air Purifying',
    image: featuredAirPurifying,
    link: '/products/air-purifying'
  }
];

const FeaturedCollection = () => {
  return (
    <Container className="featured-collection-section">
      <div className="collection-header mb-5">
        <h5 className="text-uppercase text-primary-green mb-2">Collection</h5>
        <h2 className="mb-3">SHOP FAVORITE COLLECTIONS</h2>
        <div className="header-underline"></div>
      </div>
      <Row>
        {collections.map((collection, index) => (
          <Col key={index} lg={3} md={6} sm={12} className="collection-card-wrapper">
            <Fade direction="up" delay={index * 100}>
              <Card className="collection-card">
                <div className="card-img-wrapper">
                  <Card.Img variant="top" src={collection.image} />
                </div>
                <div className="collection-overlay">
                  <Card.Title>{collection.title}</Card.Title>
                  <a href={collection.link} className="shop-link">Shop Now &rarr;</a>
                </div>
              </Card>
            </Fade>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedCollection;
