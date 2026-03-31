import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Rating from './Rating';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import './Product.css';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(product._id, 1));
  };

  return (
    <Card className="my-3 border-0 product-card-v2 h-100 shadow-sm-hover">
      <div className="product-card-inner">
        <Link to={`/product/${product._id}`} className="product-card-link text-decoration-none">
          <div className="product-img-link overflow-hidden d-block position-relative">
            <Card.Img src={product.image} variant="top" className="product-img-v2" />

            {/* Sale Badge */}
            {product.onSale && <div className="sale-badge-v2">-30%</div>}

            {/* Action Overlay */}
            <div className="add-to-cart-overlay-v3">
              <Button
                className="btn-cart-pill"
                onClick={addToCartHandler}
              >
                ADD TO CART
              </Button>
            </div>
          </div>

          <Card.Body className="text-center px-0 pb-3 pt-3">
            <Card.Title as="div" className="product-title-v2 mb-2 px-2">
              {product.name}
            </Card.Title>

            <Card.Text as="div" className="product-price-v2">
              {product.onSale ? (
                <>
                  <span className="price-old me-2 text-muted text-decoration-line-through">${product.price}</span>
                  <span className="price-new highlight-orange">${product.priceOnSale}</span>
                </>
              ) : (
                <span className="price-standard">${product.price}</span>
              )}
            </Card.Text>
          </Card.Body>
        </Link>
      </div>
    </Card>
  );
};

export default Product;
