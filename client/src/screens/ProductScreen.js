import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button, Form, Nav, Tab } from 'react-bootstrap';
import { listProductDetails, listProducts, createProductReview } from '../actions/productActions';
import { openChatWithMessage } from '../actions/chatActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { Search, Star, MessageSquare } from 'lucide-react';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import './ProductScreen.css';

const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('reviews'); // Default to reviews as per screenshot often or standard
    // Actually screenshot shows 'Reviews (0)' as a tab.

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { success: successProductReview, error: errorProductReview } = productReviewCreate;

    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted!');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(id));
        dispatch(listProducts());
        window.scrollTo(0, 0);
    }, [dispatch, id, successProductReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(id, {
            rating,
            comment
        }));
    };

    const chatExpertHandler = () => {
        const initialMsg = `Hi! I'm interested in the "${product.name}". Could you tell me more about it?`;
        dispatch(openChatWithMessage(initialMsg));
    };

    const relatedProducts = products ? products.filter(p => p.category === product.category && p._id !== id).slice(0, 3) : [];

    return (
        <div className="product-page">
            {loading ? (
                <Container className="py-5"><Loader /></Container>
            ) : error ? (
                <Container className="py-5"><Message variant="danger">{error}</Message></Container>
            ) : (
                <>
                    {/* Breadcrumb - Simple Text */}
                    <div className="breadcrumb-area py-4">
                        <Container fluid>
                            <span className="text-muted small">
                                <Link to="/" className="text-muted text-decoration-none">Home</Link> /
                                <Link to="/shop" className="text-muted text-decoration-none mx-1">Shop</Link> /
                                <span className="mx-1">{product.category}</span> /
                                <span className="mx-1 text-dark">{product.name}</span>
                            </span>
                        </Container>
                    </div>

                    <Container className="pb-5">
                        <Row>
                            {/* Left Column: Product Image */}
                            <Col md={6} className="pe-lg-5 mb-5 mb-md-0 position-relative">
                                <div className="product-image-wrapper">
                                    <Image src={product.image} alt={product.name} fluid className="product-main-img" />
                                    <button className="zoom-icon-btn">
                                        <Search size={18} />
                                    </button>
                                </div>
                            </Col>

                            {/* Right Column: Product Info */}
                            <Col md={6} className="ps-lg-4">
                                <div className="product-info-column">
                                    <h1 className="product-display-title mb-2">{product.name ? product.name.toUpperCase() : ''}</h1>

                                    <h2 className="product-display-price mb-4 text-theme-green">
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </h2>

                                    {product.countInStock > 0 && (
                                        <div className="purchase-section mb-4">
                                            <div className="d-flex align-items-center mb-4 gap-3">
                                                <div className="qty-control d-flex align-items-center">
                                                    <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                                                    <input type="text" value={qty} readOnly className="qty-input" />
                                                    <button className="qty-btn" onClick={() => setQty(Math.min(product.countInStock, qty + 1))}>+</button>
                                                </div>
                                                <Button
                                                    className="btn-add-to-cart"
                                                    onClick={addToCartHandler}
                                                >
                                                    Add to cart
                                                </Button>
                                                <Button
                                                    variant="outline-secondary"
                                                    className="btn-chat-expert"
                                                    onClick={chatExpertHandler}
                                                >
                                                    <MessageSquare size={18} className="me-2" />
                                                    Chat with an expert
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="product-meta mt-4">
                                        <p className="mb-2"><span className="text-muted">Category:</span> <span className="text-theme-orange">{product.category}</span></p>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/* Tabs Section (Reviews / Description) */}
                        <div className="product-tabs-section mt-5 pt-5">
                            <Tab.Container id="product-tabs" defaultActiveKey="reviews">
                                <Nav variant="tabs" className="justify-content-start border-bottom mb-4">
                                    <Nav.Item>
                                        <Nav.Link eventKey="reviews" className="tab-link">Reviews ({product.numReviews})</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="reviews">
                                        <div className="reviews-content">
                                            <h3 className="section-title-alt mb-4">REVIEWS</h3>
                                            {product.reviews.length === 0 ? (
                                                <p className="text-muted mb-4">There are no reviews yet.</p>
                                            ) : (
                                                <ListGroup variant="flush" className="mb-4">
                                                    {product.reviews.map(review => (
                                                        <ListGroup.Item key={review._id} className="px-0 py-3 bg-transparent border-bottom">
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <strong className="text-dark">{review.name}</strong>
                                                                <div className="text-warning small">
                                                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                                </div>
                                                            </div>
                                                            <p className="text-muted small mb-1">{review.createdAt ? review.createdAt.substring(0, 10) : ''}</p>
                                                            <p className="review-comment mb-0">{review.comment}</p>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            )}

                                            {/* Write Review Form */}
                                            <div className="review-form-wrapper bg-light p-4 border rounded-1">
                                                {userInfo ? (
                                                    <Form onSubmit={submitHandler}>
                                                        <Form.Group controlId="rating" className="mb-3">
                                                            <Form.Label>Your Rating <span className="text-danger">*</span></Form.Label>
                                                            <div className="star-rating-input">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <span
                                                                        key={star}
                                                                        className={`star-icon ${rating >= star ? 'text-warning' : 'text-muted'}`}
                                                                        onClick={() => setRating(star)}
                                                                        style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '5px' }}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Group controlId="comment" className="mb-3">
                                                            <Form.Label>Your Review <span className="text-danger">*</span></Form.Label>
                                                            <Form.Control
                                                                as="textarea"
                                                                row="3"
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                className="rounded-0"
                                                                required
                                                            ></Form.Control>
                                                        </Form.Group>
                                                        <Button type="submit" className="btn-theme-dark rounded-0 px-4">Submit</Button>
                                                    </Form>
                                                ) : (
                                                    <Message>Please <Link to="/login">sign in</Link> to write a review</Message>
                                                )}
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="related-products-section mt-5 pt-5 border-top">
                                <h3 className="section-title-alt mb-4">RELATED PRODUCTS</h3>
                                <Row>
                                    {relatedProducts.map(p => (
                                        <Col key={p._id} lg={3} md={6} className="mb-4">
                                            <Product product={p} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </Container>
                </>
            )}
        </div>
    );
};

export default ProductScreen;
