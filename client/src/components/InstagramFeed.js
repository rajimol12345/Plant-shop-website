import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Instagram } from 'lucide-react';
import './InstagramFeed.css';

const images = [
  '/images/insta-1.jpg',
  '/images/insta-2.jpg',
  '/images/insta-3.jpg',
  '/images/insta-4.jpg',
  '/images/insta-5.jpg'
];

const InstagramFeed = () => {
  return (
    <section className="instagram-section">
      <div className="text-center mb-5 instagram-header">
        <span className="section-tag-v2">@Greenova.PLANTS</span>
        <h2 className="section-title-v2 mb-2">Greenova ON INSTAGRAM</h2>
        <div className="section-divider-v2"></div>
      </div>

      <div className="instagram-grid-container">
        <Row className="g-0 justify-content-center">
          {images.map((image, index) => (
            <Col key={index} className="insta-col">
              <div className="insta-wrapper">
                <img src={image} alt={`Instagram ${index + 1}`} className="insta-img" />
                <div className="insta-overlay-v2">
                  <Instagram color="#fff" size={32} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default InstagramFeed;
