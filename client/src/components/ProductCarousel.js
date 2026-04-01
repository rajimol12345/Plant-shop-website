import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { listProducts } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import './ProductCarousel.css';

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    useEffect(() => {
        if (!products || products.length === 0) {
            if (!productList.loading && !productList.error) {
                dispatch(listProducts());
            }
        }
    }, [dispatch, products, productList.loading, productList.error]);

    // Use top 3 products or actual featured products
    const featuredProducts = products && products.length > 0 ? products.slice(0, 3) : [];

    const prevSlide = () => {
        if (featuredProducts.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        if (featuredProducts.length === 0) return;
        setCurrentIndex((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
    };

    const addToCartHandler = (id) => {
        dispatch(addToCart(id, 1));
    };

    const product = featuredProducts[currentIndex];

    return (
        <section className="product-carousel-section">
            <div className="container-fluid h-100">
                <Row className="h-100 g-0">
                    {/* Left Side: Welcome Text */}
                    <Col lg={6} className="carousel-left d-flex align-items-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="carousel-text-content">
                            <span className="welcome-tag">WELCOME TO Greenova</span>
                            <h1 className="main-heading">
                                DISCOVER PLANT <br /> FOR YOUR INTERIOR
                            </h1>
                            <p className="description-text">
                                Explore our curated collection of premium indoor plants. From air-purifying wonders to low-maintenance succulents, find the perfect green companion for your home or office.
                            </p>
                            <button className="btn-shop-now" onClick={() => navigate('/shop')}>
                                Shop Now <ArrowRight size={18} className="ms-2" />
                            </button>
                        </div>
                    </Col>

                    {/* Right Side: Product Slider */}
                    <Col lg={6} className="carousel-right d-flex align-items-center justify-content-center position-relative">
                        {product ? (
                            <div className="carousel-wrapper text-center">
                                <div className="product-slide-card">
                                    {product.onSale && (
                                        <div className="sale-badge">SALE</div>
                                    )}
                                    <div className="product-image-container" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product._id}`)}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-main-img"
                                        />
                                    </div>
                                    <div className="product-info-area mt-4">
                                        <h3 className="product-title" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product._id}`)}>{product.name}</h3>
                                        <div className="product-price">${product.price.toFixed(2)}</div>
                                        <button className="btn-add-cart" onClick={() => addToCartHandler(product._id)}>
                                            <ShoppingCart size={16} className="me-1" /> Add To Cart
                                        </button>
                                    </div>
                                    <div className="carousel-nav-arrows mt-4 w-100 d-flex justify-content-start ps-4">
                                        <button className="nav-btn prev-btn me-2" onClick={prevSlide}>
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button className="nav-btn next-btn" onClick={nextSlide}>
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-muted">Loading featured plants...</div>
                        )}

                        {/* Social Sidebar */}
                        <div className="social-sidebar">
                            <button type="button" aria-label="Facebook"><FaFacebookF /></button>
                            <button type="button" aria-label="Instagram"><FaInstagram /></button>
                            <button type="button" aria-label="Pinterest"><FaPinterestP /></button>
                            <button type="button" aria-label="Youtube"><FaYoutube /></button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section >
    );
};

export default ProductCarousel;
