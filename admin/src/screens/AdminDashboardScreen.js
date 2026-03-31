import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listUsers } from '../actions/userActions';
import { listOrders } from '../actions/orderActions';
import { listAdminChats } from '../actions/chatActions';
import DashboardStats from '../components/DashboardStats';
import DashboardSocialStats from '../components/DashboardSocialStats';
import DashboardChart from '../components/DashboardChart';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminDashboardScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading: loadingProducts, error: errorProducts } = productList;

  const userList = useSelector((state) => state.userList);
  const { users, loading: loadingUsers, error: errorUsers } = userList;

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading: loadingOrders, error: errorOrders } = orderList;

  const chatAdminList = useSelector((state) => state.chatAdminList);
  const { chats, loading: loadingChats } = chatAdminList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('', 1)); // Assuming pagination, fetching page 1
      dispatch(listUsers());
      dispatch(listOrders());
      dispatch(listAdminChats());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <h2 className="mb-4 section-title-v2" style={{ fontSize: '2rem' }}>Dashboard</h2>

      {loadingProducts || loadingUsers || loadingOrders || loadingChats ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        <>
          {/* Top Stats Grid */}
          <DashboardStats
            products={products ? (products.products || products) : []}
            users={users}
            orders={orders}
          />

          {/* Middle Social Stats Row */}
          <h4 className="mt-4 mb-3 fw-bold" style={{ fontFamily: 'Playfair Display' }}>Store Status</h4>
          <DashboardSocialStats
            products={products ? (products.products || products) : []}
            orders={orders}
            chatAdminList={chatAdminList}
          />

          {/* Bottom Chart Section */}
          <div className="mt-4">
            <DashboardChart />
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboardScreen;
