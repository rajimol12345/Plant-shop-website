import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col, Container, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails || {};

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile || {};

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success || (user._id !== userInfo._id)) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.image || '');
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, image, password }));
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      const errorMsg = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      setMessage(errorMsg);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="bg-off-white py-5 min-vh-100">
      <Container className="py-5 mt-5">
        <Row>
          <Col md={4} lg={3}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="checkout-card-v2">
                <h2 className="summary-title text-uppercase letter-spacing-1 mb-4">USER PROFILE</h2>
                {message && <div className="alert alert-warning border-0 rounded-1 small py-2 px-3 mb-3">{message}</div>}
                {error && <div className="alert alert-danger border-0 rounded-1 small py-2 px-3 mb-3">{error}</div>}
                {success && <div className="alert alert-success border-0 rounded-1 small py-2 px-3 mb-3">Profile Updated</div>}
                {loading && <p className="small text-muted mb-3">Updating profile...</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId='name'>
                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      className="form-control-v2"
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId='email'>
                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      className="form-control-v2"
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId='password'>
                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">New Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      className="form-control-v2"
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId='confirmPassword'>
                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Confirm Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm password'
                      value={confirmPassword}
                      className="form-control-v2"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId='image'>
                    <Form.Label className="small fw-bold text-muted text-uppercase letter-spacing-1">Profile Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="form-control-v2 mb-2"
                    ></Form.Control>
                    <Form.Control
                      type="file"
                      onChange={uploadFileHandler}
                      className="form-control-v2"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                    ></Form.Control>
                    {uploading && <div className="text-muted small mt-1">Uploading...</div>}
                    {image && (
                      <div className="mt-3 text-center text-md-start">
                        <p className="small fw-bold text-muted mb-2 text-uppercase letter-spacing-1">Image Preview</p>
                        <img
                          src={`http://localhost:5000${image}`}
                          alt="Profile Preview"
                          className="shadow-sm"
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '3px solid #fff',
                            boxShadow: '0 0 0 1px #eee'
                          }}
                        />
                      </div>
                    )}
                  </Form.Group>

                  <Button type='submit' className="btn-premium w-100">
                    UPDATE PROFILE
                  </Button>
                </Form>
              </Card>
            </motion.div>
          </Col>

          <Col md={8} lg={9}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="checkout-card-v2">
                <h2 className="summary-title text-uppercase letter-spacing-1 mb-4">MY ORDERS</h2>
                <div className="table-responsive">
                  <Table hover className="align-middle custom-table">
                    <thead className="bg-light">
                      <tr>
                        <th className="text-uppercase small letter-spacing-1 py-3 px-4">Order ID</th>
                        <th className="text-uppercase small letter-spacing-1 py-3">Date</th>
                        <th className="text-uppercase small letter-spacing-1 py-3">Total</th>
                        <th className="text-uppercase small letter-spacing-1 py-3">Paid</th>
                        <th className="text-uppercase small letter-spacing-1 py-3">Delivered</th>
                        <th className="py-3 text-end px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingOrders ? (
                        <tr><td colSpan="6" className="text-center">Loading orders...</td></tr>
                      ) : errorOrders ? (
                        <tr><td colSpan="6" className="text-center text-danger">{errorOrders}</td></tr>
                      ) : (orders || []).length === 0 ? (
                        <tr><td colSpan="6" className="text-center">No orders found</td></tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td className="px-4 fw-bold">#{order._id.slice(-8).toUpperCase()}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td className="fw-bold">${order.totalPrice.toFixed(2)}</td>
                            <td>
                              {order.isPaid ? (
                                <Badge bg="success" className="rounded-1 fw-normal px-2 py-1">{order.paidAt.substring(0, 10)}</Badge>
                              ) : (
                                <Badge bg="danger" className="rounded-1 fw-normal px-2 py-1">Not Paid</Badge>
                              )
                              }
                            </td>
                            <td>
                              {order.isDelivered ? (
                                <Badge bg="success" className="rounded-1 fw-normal px-2 py-1">{order.deliveredAt.substring(0, 10)}</Badge>
                              ) : (
                                <Badge bg="danger" className="rounded-1 fw-normal px-2 py-1">Not Delivered</Badge>
                              )
                              }
                            </td>
                            <td className="text-end px-4">
                              <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm btn-outline-dark rounded-pill px-3'>DETAILS</Button>
                              </LinkContainer>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
                <p className="text-muted small mt-3 px-2 d-none">Order history will be displayed here.</p>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;
