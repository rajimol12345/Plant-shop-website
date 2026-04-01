import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import AdminChatWidget from './components/AdminChatWidget';
import Loader from './components/Loader';
import { getCart } from './actions/cartActions';

import Footer from './components/Footer';
import InstagramFeed from './components/InstagramFeed';

// Lazy loading screens
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const ShopScreen = lazy(() => import('./screens/ShopScreen'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));
const CartScreen = lazy(() => import('./screens/CartScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const UserListScreen = lazy(() => import('./screens/UserListScreen'));
const ProductListScreen = lazy(() => import('./screens/ProductListScreen'));
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'));
const OrderScreen = lazy(() => import('./screens/OrderScreen'));
const OrderListScreen = lazy(() => import('./screens/OrderListScreen'));
const OrderSuccessScreen = lazy(() => import('./screens/OrderSuccessScreen'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));
const AboutScreen = lazy(() => import('./screens/AboutScreen'));
const TeamScreen = lazy(() => import('./screens/TeamScreen'));
const FAQScreen = lazy(() => import('./screens/FAQScreen'));
const BlogScreen = lazy(() => import('./screens/BlogScreen'));
const BlogDetailScreen = lazy(() => import('./screens/BlogDetailScreen'));
const ContactScreen = lazy(() => import('./screens/ContactScreen'));
const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
const BlogListScreen = lazy(() => import('./screens/BlogListScreen'));
const BlogEditScreen = lazy(() => import('./screens/BlogEditScreen'));
const NewsletterListScreen = lazy(() => import('./screens/NewsletterListScreen'));
const AdminChatScreen = lazy(() => import('./screens/AdminChatScreen'));
const NotFoundScreen = lazy(() => import('./screens/NotFoundScreen'));

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
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </main>
      <InstagramFeed />
      <Footer />
      <ChatWidget />
      <AdminChatWidget />
    </Router>
  );
}

export default App;
