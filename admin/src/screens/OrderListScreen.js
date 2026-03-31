import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import { FiX, FiCheck } from 'react-icons/fi';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="section-title-v2 mb-0" style={{ fontSize: '1.75rem' }}>Order Management</h2>
          <p className="text-muted small">Monitor and manage all customer orders</p>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="custom-table-container">
          <Table responsive className="custom-table border-0 shadow-sm">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAYMENT</th>
                <th>DELIVERY</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {(orders || []).map((order) => (
                <tr key={order._id}>
                  <td className="text-muted small fw-bold">#{order._id.slice(-8).toUpperCase()}</td>
                  <td>
                    <div className="fw-bold">{order.user && order.user.name}</div>
                    <div className="text-muted small">{order.user && order.user.email}</div>
                  </td>
                  <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="fw-bold text-dark">${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="status-badge status-paid">PAID</span>
                    ) : (
                      <span className="status-badge status-unpaid">UNPAID</span>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <span className="status-badge status-paid">DELIVERED</span>
                    ) : (
                      <span className="status-badge bg-light text-muted">PENDING</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Link to={`/admin/order/${order._id}`}>
                        <button className="btn-premium py-1 px-3" style={{ fontSize: '0.8rem' }}>
                          VIEW DETAILS
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
