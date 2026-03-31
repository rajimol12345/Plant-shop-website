import React, { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrderAfterPayment } from '../actions/orderActions';

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [paymentError, setPaymentError] = useState(null);
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/placeorder');
        }
        if (success) {
            navigate(`/ordersuccess?id=${order._id}`);
        }
    }, [navigate, userInfo, success, order]);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/payment/paypal/config', {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            paypalDispatch({
                type: 'resetOptions',
                value: {
                    'client-id': clientId,
                    currency: 'USD',
                },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
        };

        if (userInfo) {
            addPayPalScript();
        }
    }, [userInfo, paypalDispatch]);

    const confirmPaymentAndCreateOrder = (paymentResult) => {
        dispatch(createOrderAfterPayment({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod, // Use cart.paymentMethod dynamically
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            paymentResult,
        }));
    };

    const successPaymentHandler = (details) => {
        confirmPaymentAndCreateOrder({
            id: details.id,
            status: details.status,
            update_time: details.update_time,
            email_address: details.payer.email_address,
            gateway: 'PAYPAL'
        });
    };

    const placeOrderHandler = () => {
        if (cart.paymentMethod === 'COD') {
            confirmPaymentAndCreateOrder({
                id: 'COD_' + Date.now(),
                status: 'PENDING',
                gateway: 'COD',
            });
        }
    };

    return (
        <div className="bg-off-white py-5 min-vh-100">
            <Container className="py-5 mt-5">
                <CheckoutSteps step1 step2 step3 step4 />
                <Row>
                    <Col lg={8}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="checkout-card-v2 mb-4">
                                <h3 className="summary-title text-uppercase letter-spacing-1">SHIPPING INFORMATION</h3>
                                <p className="mb-0 text-muted">
                                    <strong className="text-dark">Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </Card>

                            <Card className="checkout-card-v2 mb-4">
                                <h3 className="summary-title text-uppercase letter-spacing-1">PAYMENT METHOD</h3>
                                <p className="mb-0 text-muted">
                                    <strong className="text-dark">Method:</strong> {cart.paymentMethod}
                                </p>
                            </Card>

                            <Card className="checkout-card-v2">
                                <h3 className="summary-title text-uppercase letter-spacing-1">ORDER ITEMS</h3>
                                {cart.cartItems.length === 0 ? (
                                    <div className="alert alert-info border-0 rounded-1">Your cart is empty</div>
                                ) : (
                                    <ListGroup variant='flush' className="bg-transparent">
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index} className="bg-transparent px-0 py-3 border-bottom">
                                                <Row className="align-items-center">
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`} className="text-decoration-none fw-bold text-dark h6 mb-0">
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4} className="text-end">
                                                        <span className="text-muted">{item.qty} x ${item.price} = </span>
                                                        <span className="fw-bold text-dark">${(item.qty * item.price).toFixed(2)}</span>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </Card>
                        </motion.div>
                    </Col>

                    <Col lg={4}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="checkout-card-v2">
                                <h3 className="summary-title text-uppercase letter-spacing-1">ORDER SUMMARY</h3>
                                <div className="summary-row">
                                    <span className="text-muted">Items Subtotal</span>
                                    <span className="fw-bold">${cart.itemsPrice}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="text-muted">Shipping</span>
                                    <span className="fw-bold">${cart.shippingPrice}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="text-muted">Tax (15%)</span>
                                    <span className="fw-bold">${cart.taxPrice}</span>
                                </div>
                                <div className="summary-row summary-total">
                                    <span className="h5 mb-0 fw-bold">Grand Total</span>
                                    <span className="h5 mb-0 fw-bold text-dark">${cart.totalPrice}</span>
                                </div>

                                {paymentError && <div className="alert alert-danger border-0 mt-3 p-2 small">{paymentError}</div>}
                                {error && <div className="alert alert-danger border-0 mt-3 p-2 small">{error}</div>}

                                <div className="mt-4">
                                    {cart.paymentMethod === 'PayPal' ? (
                                        isPending ? <p>Loading PayPal...</p> : (
                                            <PayPalButtons
                                                style={{ layout: 'vertical' }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [{
                                                            amount: {
                                                                value: cart.totalPrice,
                                                            },
                                                        }],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then(successPaymentHandler);
                                                }}
                                                onError={(err) => {
                                                    setPaymentError('PayPal Checkout failed. Please try again.');
                                                }}
                                            />
                                        )
                                    ) : (
                                        <Button
                                            type='button'
                                            className='btn-premium w-100'
                                            disabled={cart.cartItems.length === 0 || (orderCreate && orderCreate.loading)}
                                            onClick={placeOrderHandler}
                                        >
                                            {orderCreate && orderCreate.loading ? 'Placing Order...' : 'PLACE ORDER'}
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PlaceOrderScreen;
