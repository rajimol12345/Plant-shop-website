import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product';
import { listProducts } from '../actions/productActions';
import './BestSellers.css';

const BestSellers = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Real products from the seeder that match Greenova vibe
  const bestSellerNames = [
    'Ficus Benjamina',
    'Faux Watermelon',
    'Calathea Lancifolia',
    'Rustic Decorative',
    'Bunny Ears Cactus',
    'Pink Ceramic Pot',
    'Monstera Deliciosa',
    'Minimal Brown Ceramic',
  ];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const bestSellers = products
    ? bestSellerNames
      .map((name) => products.find((p) => p.name === name))
      .filter((p) => p !== undefined)
    : [];

  return (
    <section className="best-sellers-section py-5">
      <Container fluid>
        <div className="text-center mb-5">
          <span className="section-tag-v2">DISCOVER OUR ITEM</span>
          <h2 className="section-title-v2">OUR BEST SELLER</h2>
          <div className="section-divider-v2"></div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-theme-orange" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <Row className="g-4">
            {bestSellers.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default BestSellers;
