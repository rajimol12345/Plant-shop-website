import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import BlogListScreen from './screens/BlogListScreen';
import BlogEditScreen from './screens/BlogEditScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminChatScreen from './screens/AdminChatScreen';
import ContactListScreen from './screens/ContactListScreen';

import './App.css'; // Layout styles

// Wrapper for layout with Sidebar and Header
const LayoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userInfo && !userInfo.isAdmin) {
      window.location.href = 'http://localhost:3000';
    }
  }, [userInfo, navigate]);

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="p-4">
          <Container fluid>{children}</Container>
        </main>
      </div>
    </div>
  );
};

// Wrapper for auth screens (no sidebar/header)
const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [userInfo, navigate]);

  return (
    <main className="auth-container d-flex align-items-center justify-content-center w-100" style={{ minHeight: '100vh', backgroundColor: '#fdfbf7' }}>
      {children}
    </main>
  );
}

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<AuthWrapper><LoginScreen /></AuthWrapper>} />
        <Route path="/register" element={<AuthWrapper><RegisterScreen /></AuthWrapper>} />

        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={<LayoutWrapper><AdminDashboardScreen /></LayoutWrapper>} />
        <Route path="/admin/products" element={<LayoutWrapper><ProductListScreen /></LayoutWrapper>} />
        <Route path="/admin/product/create" element={<LayoutWrapper><ProductEditScreen /></LayoutWrapper>} />
        <Route path="/admin/product/:id/edit" element={<LayoutWrapper><ProductEditScreen /></LayoutWrapper>} />
        <Route path="/admin/orders" element={<LayoutWrapper><OrderListScreen /></LayoutWrapper>} />
        <Route path="/admin/order/:id" element={<LayoutWrapper><OrderDetailsScreen /></LayoutWrapper>} />
        <Route path="/admin/users" element={<LayoutWrapper><UserListScreen /></LayoutWrapper>} />
        <Route path="/admin/user/:id/edit" element={<LayoutWrapper><UserEditScreen /></LayoutWrapper>} />
        <Route path="/admin/blogs" element={<LayoutWrapper><BlogListScreen /></LayoutWrapper>} />
        <Route path="/admin/blog/create" element={<LayoutWrapper><BlogEditScreen /></LayoutWrapper>} />
        <Route path="/admin/blog/:id/edit" element={<LayoutWrapper><BlogEditScreen /></LayoutWrapper>} />
        <Route path="/admin/profile" element={<LayoutWrapper><ProfileScreen /></LayoutWrapper>} />
        <Route path="/admin/chat" element={<LayoutWrapper><AdminChatScreen /></LayoutWrapper>} />
        <Route path="/admin/contacts" element={<LayoutWrapper><ContactListScreen /></LayoutWrapper>} />

        <Route path="/" element={<AuthWrapper><LoginScreen /></AuthWrapper>} />
      </Routes>
    </Router>
  );
};

export default App;
// Force rebuild
