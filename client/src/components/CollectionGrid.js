import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CollectionGrid.css';

// Importing images (using public folder)
const imgGift = '/images/featured-gift-green.jpg';
const imgPet = '/images/featured-pet-friendly.jpg';
const imgHouse = '/images/featured-house-plant.jpg';
const imgAir = '/images/featured-air-purifying.jpg';

const collections = [
    { title: 'GIFT GREEN', image: imgGift },
    { title: 'PET FRIENDLY', image: imgPet },
    { title: 'HOUSE PLANT', image: imgHouse },
    { title: 'AIR PURIFYING', image: imgAir },
];

const CollectionGrid = () => {
    const navigate = useNavigate();

    return (
        <section className="collection-section py-5">
            <Container fluid className="px-0">
                <div className="text-center mb-5 collection-header">
                    <p className="collection-tag">COLLECTION</p>
                    <h2 className="collection-main-title">SHOP FAVORITE COLLECTIONS</h2>
                    <div className="collection-divider"></div>
                </div>

                <Row className="g-4 mx-0">
                    {collections.map((item, index) => (
                        <Col lg={3} md={6} key={index}>
                            <div className="collection-card-v2" onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>
                                <div className="collection-image-wrapper">
                                    <img src={item.image} alt={item.title} className="collection-img-v2" />
                                </div>
                                <div className="collection-label-box">
                                    <div className="collection-label-content">
                                        <h3 className="collection-label-title">{item.title}</h3>
                                        <span className="shop-now-link">Shop Now &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default CollectionGrid;
