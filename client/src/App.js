import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import AdminChatWidget from './components/AdminChatWidget';
import HomeScreen from './screens/HomeScreen';
import { getCart } from './actions/cartActions';

import Footer from './components/Footer';
import InstagramFeed from './components/InstagramFeed';

import ShopScreen from './screens/ShopScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import AdminRoute from './components/AdminRoute';
import AboutScreen from './screens/AboutScreen';
import TeamScreen from './screens/TeamScreen';
import FAQScreen from './screens/FAQScreen';
import BlogScreen from './screens/BlogScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import ContactScreen from './screens/ContactScreen';
import DashboardScreen from './screens/DashboardScreen';
import BlogListScreen from './screens/BlogListScreen';
import BlogEditScreen from './screens/BlogEditScreen';
import NewsletterListScreen from './screens/NewsletterListScreen';
import AdminChatScreen from './screens/AdminChatScreen';
import NotFoundScreen from './screens/NotFoundScreen';

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(getCart());
    }
  }, [dispatch, userInfo]);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/team" element={<TeamScreen />} />
          <Route path="/faq" element={<FAQScreen />} />
          <Route path="/blog" element={<BlogScreen />} />
          <Route path="/blog/:id" element={<BlogDetailScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/shop/search/:keyword" element={<ShopScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/ordersuccess" element={<OrderSuccessScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route
            path="/admin/userlist"
            element={
              <AdminRoute>
                <UserListScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/productlist"
            element={
              <AdminRoute>
                <ProductListScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <DashboardScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product/:id/edit"
            element={
              <AdminRoute>
                <ProductEditScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orderlist"
            element={
              <AdminRoute>
                <OrderListScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/bloglist"
            element={
              <AdminRoute>
                <BlogListScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/blog/:id/edit"
            element={
              <AdminRoute>
                <BlogEditScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/newsletterlist"
            element={
              <AdminRoute>
                <NewsletterListScreen />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/chat"
            element={
              <AdminRoute>
                <AdminChatScreen />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>
      <InstagramFeed />
      <Footer />
      <ChatWidget />
      <AdminChatWidget />
    </Router>
  );
}

export default App;
