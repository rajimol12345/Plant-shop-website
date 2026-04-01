import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import { getOrderDetails, deliverOrder, payOrderManual, payOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { success: successDeliver } = orderDeliver;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    if (!loading && order) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
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
                addPayPalScript();
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order, userInfo, paypalDispatch]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    const payManualHandler = () => {
        dispatch(payOrderManual(orderId));
    };

    const successPaymentHandler = (details) => {
        dispatch(payOrder(orderId, {
            id: details.id,
            status: details.status,
            update_time: details.update_time,
            email_address: details.payer.email_address,
            gateway: 'PAYPAL'
        }));
    };

    return loading ? (
        <p>Loading...</p>
    ) : error ? (
        <p className="text-danger">{error}</p>
    ) : !order ? (
        <p>Order not found</p>
    ) : (
        <div className="bg-off-white py-5 min-vh-100">
            <Container className="py-5 mt-5">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="section-title-v2 mb-5"
                >
                    ORDER <span style={{ color: '#F8B864' }}>#{order && order._id ? order._id.slice(-8).toUpperCase() : ''}</span>
                </motion.h2>

                <Row>
                    <Col lg={8}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Card className="checkout-card-v2 mb-4">
                                <h3 className="summary-title text-uppercase letter-spacing-1">SHIPPING DETAILS</h3>
                                <div className="mb-3">
                                    <p className="mb-1 text-muted"><strong className="text-dark">Name:</strong> {order.user.name}</p>
                                    <p className="mb-1 text-muted"><strong className="text-dark">Email:</strong> <a href={`mailto:${order.user.email}`} className="text-primary-green">{order.user.email}</a></p>
                                    <p className="mb-3 text-muted"><strong className="text-dark">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                </div>
                                {order.isDelivered ? (
                                    <div className="alert alert-success border-0 rounded-1 small py-2 px-3 d-flex align-items-center">
                                        <i className="fas fa-check-circle me-2"></i> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                    </div>
                                ) : (
                                    <div className="alert alert-danger border-0 rounded-1 small py-2 px-3 d-flex align-items-center">
                                        <i className="fas fa-clock me-2"></i> Not Yet Delivered
                                    </div>
                                )}
                            </Card>

                            <Card className="checkout-card-v2 mb-4">
                                <h3 className="summary-title text-uppercase letter-spacing-1">PAYMENT STATUS</h3>
                                <div className="mb-3">
                                    <p className="mb-3 text-muted"><strong className="text-dark">Method:</strong> {order.paymentMethod}</p>
                                </div>
                                {order.isPaid ? (
                                    <div className="alert alert-success border-0 rounded-1 small py-2 px-3 d-flex align-items-center">
                                        <i className="fas fa-check-circle me-2"></i> Paid on {new Date(order.paidAt).toLocaleDateString()}
                                    </div>
                                ) : order.paymentMethod === 'COD' ? (
                                    <div className="alert alert-warning border-0 rounded-1 small py-2 px-3 d-flex align-items-center">
                                        <i className="fas fa-info-circle me-2"></i> Cash on Delivery: Please pay <strong>${order.totalPrice}</strong> to the delivery person.
                                    </div>
                                ) : (
                                    <div className="alert alert-danger border-0 rounded-1 small py-2 px-3 d-flex align-items-center">
                                        <i className="fas fa-exclamation-circle me-2"></i> Awaiting Online Payment
                                    </div>
                                )}
                            </Card>

                            <Card className="checkout-card-v2">
                                <h3 className="summary-title text-uppercase letter-spacing-1">ORDER ITEMS</h3>
                                <ListGroup variant='flush' className="bg-transparent">
                                    {order.orderItems.map((item, index) => (
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
                            </Card>
                        </motion.div>
                    </Col>

                    <Col lg={4}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Card className="checkout-card-v2 mb-4">
                                <h3 className="summary-title text-uppercase letter-spacing-1">ORDER SUMMARY</h3>
                                <div className="summary-row">
                                    <span className="text-muted">Items Subtotal</span>
                                    <span className="fw-bold">${order.itemsPrice}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="text-muted">Shipping</span>
                                    <span className="fw-bold">${order.shippingPrice}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="text-muted">Tax (15%)</span>
                                    <span className="fw-bold">${order.taxPrice}</span>
                                </div>
                                <div className="summary-row summary-total">
                                    <span className="h5 mb-0 fw-bold">Total Amount</span>
                                    <span className="h5 mb-0 fw-bold text-dark">${order.totalPrice}</span>
                                </div>

                                {!order.isPaid && (
                                    <div className="mt-4">
                                        {isPending ? <p>Loading PayPal...</p> : (
                                            <PayPalButtons
                                                style={{ layout: 'vertical' }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [{
                                                            amount: {
                                                                value: order.totalPrice,
                                                            },
                                                        }],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then(successPaymentHandler);
                                                }}
                                            />
                                        )}
                                        {loadingPay && <p className="text-center small py-2 text-muted">Processing Payment...</p>}
                                    </div>
                                )}

                                {userInfo && userInfo.isAdmin && !order.isPaid && (
                                    <Button
                                        type="button"
                                        className="btn-premium w-100 mt-4"
                                        style={{ backgroundColor: '#F8B864', color: '#000' }}
                                        onClick={payManualHandler}
                                    >
                                        MARK AS PAID (MANUAL)
                                    </Button>
                                )}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <Button
                                        type="button"
                                        className="btn-premium w-100 mt-4"
                                        style={{ backgroundColor: '#0c5b47' }}
                                        onClick={deliverHandler}
                                    >
                                        MARK AS DELIVERED
                                    </Button>
                                )}
                            </Card>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderScreen;
