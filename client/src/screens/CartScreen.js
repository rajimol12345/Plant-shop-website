import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Button, Card, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { addToCart, removeFromCart } from '../actions/cartActions';
import './CartScreen.css';

const CartScreen = () => {
    const { id: productId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const qty = Number(new URLSearchParams(location.search).get('qty')) || 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="cart-page-wrapper bg-off-white min-vh-100 py-5">
            <Container className="py-5 mt-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-5">
                        <span className="section-subtitle-v2">YOUR SELECTION</span>
                        <h2 className="section-title-v2 mt-2">SHOPPING BAG</h2>
                    </div>

                    {cartItems.length === 0 ? (
                        <Card className="empty-cart-card text-center p-5 border-0 shadow-sm rounded-4">
                            <div className="empty-cart-icon mb-4">
                                <FiShoppingBag size={80} color="#0c5b47" opacity={0.2} />
                            </div>
                            <h3 className="mb-3">Your Bag is Empty</h3>
                            <p className="text-muted mb-4">Looks like you haven't added any plants to your collection yet.</p>
                            <Link to="/shop" className="btn btn-Greenova px-5 rounded-pill text-white text-decoration-none py-3">
                                START EXPLORING
                            </Link>
                        </Card>
                    ) : (
                        <Row className="g-4">
                            <Col lg={8}>
                                <div className="cart-items-container">
                                    <div className="cart-header d-none d-md-flex pb-3 mb-4 border-bottom text-muted small fw-bold text-uppercase letter-spacing-1">
                                        <div style={{ flex: 2 }}>PRODUCT</div>
                                        <div style={{ flex: 1 }} className="text-center">PRICE</div>
                                        <div style={{ flex: 1 }} className="text-center">QUANTITY</div>
                                        <div style={{ flex: 1 }} className="text-end">TOTAL</div>
                                    </div>

                                    {cartItems.map((item) => (
                                        <Card key={item.product} className="cart-item-card mb-3 border-0 shadow-sm overflow-hidden rounded-3">
                                            <div className="p-3">
                                                <Row className="align-items-center g-3">
                                                    <Col md={5}>
                                                        <div className="d-flex align-items-center">
                                                            <div className="item-image-box me-3">
                                                                <Image src={item.image} alt={item.name} fluid rounded className="cart-img" />
                                                            </div>
                                                            <div className="item-info">
                                                                <Link to={`/product/${item.product}`} className="item-name text-decoration-none text-dark fw-bold d-block mb-1">
                                                                    {item.name}
                                                                </Link>
                                                                <span className="item-category text-muted small text-uppercase fw-semibold">Nature's Best</span>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col xs={4} md={2} className="text-center">
                                                        <span className="fw-bold">${item.price}</span>
                                                    </Col>

                                                    <Col xs={5} md={3}>
                                                        <div className="qty-selector-v2 d-flex align-items-center justify-content-center">
                                                            <button
                                                                className="qty-btn"
                                                                onClick={(e) => dispatch(addToCart(item.product, Math.max(1, item.qty - 1)))}
                                                            >
                                                                <FiMinus size={14} />
                                                            </button>
                                                            <span className="qty-value mx-3">{item.qty}</span>
                                                            <button
                                                                className="qty-btn"
                                                                onClick={(e) => dispatch(addToCart(item.product, Math.min(item.countInStock, item.qty + 1)))}
                                                            >
                                                                <FiPlus size={14} />
                                                            </button>
                                                        </div>
                                                    </Col>

                                                    <Col xs={3} md={2} className="text-end">
                                                        <div className="d-flex flex-column align-items-end">
                                                            <span className="fw-bold text-primary-green">${(item.qty * item.price).toFixed(2)}</span>
                                                            <button
                                                                className="remove-item-btn mt-2"
                                                                onClick={() => removeFromCartHandler(item.product)}
                                                            >
                                                                <FiTrash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Col>

                            <Col lg={4}>
                                <Card className="cart-summary-card border-0 shadow-lg rounded-4 overflow-hidden p-4 sticky-top" style={{ top: '100px', zIndex: 10 }}>
                                    <h4 className="summary-title mb-4 pb-3 border-bottom text-uppercase letter-spacing-1">Summary</h4>

                                    <div className="summary-details mb-4">
                                        <div className="d-flex justify-content-between mb-3 text-muted">
                                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                            <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3 text-muted">
                                            <span>Estimated Shipping</span>
                                            <span className="text-success small fw-semibold">FREE</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-4 fs-5">
                                            <strong className="text-dark">Grand Total</strong>
                                            <strong className="text-primary-green">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        className="btn btn-Greenova w-100 py-3 rounded-pill d-flex align-items-center justify-content-center"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        PROCEED TO CHECKOUT <FiArrowRight className="ms-2" />
                                    </Button>

                                    <div className="secure-checkout mt-4 text-center text-muted small">
                                        <span className="d-flex align-items-center justify-content-center">
                                            <span className="me-2 text-success">●</span> Secure Checkout & Returns
                                        </span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </motion.div>
            </Container>
        </div>
    );
};

export default CartScreen;
