import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Navbar, Button, Spinner, Alert } from 'react-bootstrap';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    FaHome, FaShoppingCart, FaExclamationTriangle,
    FaClock, FaCheckCircle, FaBars, FaBox, FaUsers, FaClipboardList, FaDollarSign, FaBlog, FaSignOutAlt, FaComments
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../actions/userActions';
import './DashboardScreen.css';

const DashboardScreen = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        monthlySales: [],
        storeStatus: {
            lowStock: 0,
            pending: 0,
            paid: 0,
            blogs: 0,
            subscribers: 0,
            unreadChats: 0
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get('/api/admin/dashboard', config);
                setStats(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        if (userInfo && userInfo.isAdmin) {
            fetchStats();
        }
    }, [userInfo]);

    return (
        <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-brand">
                    <h3 className="serif-font">Admin Panel</h3>
                </div>

                {/* Profile Section */}
                <div className="sidebar-profile text-center mb-4">
                    <div className="profile-img-container mx-auto">
                        <div className="profile-img">
                            {userInfo && userInfo.name ? userInfo.name.substring(0, 2).toUpperCase() : 'AR'}
                        </div>
                    </div>
                    <h5 className="mt-2 mb-0 text-white">{userInfo ? userInfo.name : 'Admin'}</h5>
                    <small className="text-success"><span className="online-dot">●</span> Online</small>
                </div>

                <ul className="sidebar-menu">
                    <li className="active">
                        <Link to="/admin/dashboard" className="text-decoration-none text-white d-block w-100">
                            <FaHome className="menu-icon" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/productlist" className="text-decoration-none text-white d-block w-100">
                            <FaBox className="menu-icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orderlist" className="text-decoration-none text-white d-block w-100">
                            <FaClipboardList className="menu-icon" /> Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/userlist" className="text-decoration-none text-white d-block w-100">
                            <FaUsers className="menu-icon" /> Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/bloglist" className="text-decoration-none text-white d-block w-100">
                            <FaBlog className="menu-icon" /> Blogs
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/newsletterlist" className="text-decoration-none text-white d-block w-100">
                            <FaUsers className="menu-icon" /> Subscribers
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/chat" className="text-decoration-none text-white d-block w-100 d-flex align-items-center justify-content-between">
                            <span><FaComments className="menu-icon" /> Support Chat</span>
                            {stats.storeStatus.unreadChats > 0 && (
                                <span className="badge bg-danger rounded-pill x-small me-2">{stats.storeStatus.unreadChats}</span>
                            )}
                        </Link>
                    </li>
                    <li className="mt-5" onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                        <FaSignOutAlt className="menu-icon" /> Logout
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content-wrapper">
                {/* Top Header */}
                <Navbar bg="white" expand="lg" className="admin-header shadow-sm mb-4">
                    <Container fluid>
                        <Button variant="link" onClick={toggleSidebar} className="sidebar-toggle-btn text-dark p-0">
                            <FaBars size={24} />
                        </Button>
                        <div className="ms-auto d-flex align-items-center">
                            <span className="me-2 text-muted small">{userInfo ? userInfo.name : 'Admin'}</span>
                        </div>
                    </Container>
                </Navbar>

                <Container fluid className="content-container">
                    <h2 className="serif-font mb-4">Dashboard</h2>

                    {loading ? (
                        <Spinner animation="border" />
                    ) : error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : (
                        <>
                            {/* Overview Stats Row */}
                            <Row className="mb-4">
                                <Col md={3} sm={6}>
                                    <Card className="overview-card shadow-sm border-0">
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Sales</h6>
                                                <h3 className="serif-font mb-0">${stats.totalSales}</h3>
                                            </div>
                                            <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <FaDollarSign size={20} className="text-secondary" />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3} sm={6}>
                                    <Card className="overview-card shadow-sm border-0">
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Orders</h6>
                                                <h3 className="serif-font mb-0">{stats.totalOrders}</h3>
                                            </div>
                                            <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <FaShoppingCart size={20} className="text-secondary" />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3} sm={6}>
                                    <Card className="overview-card shadow-sm border-0">
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Products</h6>
                                                <h3 className="serif-font mb-0">{stats.totalProducts}</h3>
                                            </div>
                                            <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <FaBox size={20} className="text-warning" />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3} sm={6}>
                                    <Card className="overview-card shadow-sm border-0">
                                        <Card.Body className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <h6 className="text-muted text-uppercase mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Users</h6>
                                                <h3 className="serif-font mb-0">{stats.totalUsers}</h3>
                                            </div>
                                            <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <FaUsers size={20} className="text-secondary" />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <h4 className="serif-font mb-3">Store Status</h4>

                            {/* KPI Cards Row (Existing) */}
                            <Row className="mb-5">
                                {/* Red Card */}
                                <Col md={3}>
                                    <div className="kpi-card-professional">
                                        <div className="card-top bg-red">
                                            <FaExclamationTriangle size={30} />
                                        </div>
                                        <div className="card-bottom">
                                            <div className="card-split border-right">
                                                <h3 className="serif-font">{stats.storeStatus.lowStock}</h3>
                                                <p>Low Stock</p>
                                            </div>
                                            <div className="card-split">
                                                <h3 className="serif-font">Items</h3>
                                                <p>Attn</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                {/* Yellow Card */}
                                <Col md={3}>
                                    <div className="kpi-card-professional">
                                        <div className="card-top bg-yellow">
                                            <FaClock size={30} />
                                        </div>
                                        <div className="card-bottom">
                                            <div className="card-split border-right">
                                                <h3 className="serif-font">{stats.storeStatus.pending}</h3>
                                                <p>Pending</p>
                                            </div>
                                            <div className="card-split">
                                                <h3 className="serif-font">Orders</h3>
                                                <p>Action</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                {/* Green Card */}
                                <Col md={3}>
                                    <div className="kpi-card-professional">
                                        <div className="card-top bg-green">
                                            <FaCheckCircle size={30} />
                                        </div>
                                        <div className="card-bottom">
                                            <div className="card-split border-right">
                                                <h3 className="serif-font">{stats.storeStatus.paid}</h3>
                                                <p>Paid</p>
                                            </div>
                                            <div className="card-split">
                                                <h3 className="serif-font">Orders</h3>
                                                <p>Done</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                {/* Blue Card */}
                                <Col md={3}>
                                    <div className="kpi-card-professional">
                                        <div className="card-top bg-blue">
                                            <FaComments size={30} />
                                        </div>
                                        <div className="card-bottom">
                                            <div className="card-split border-right">
                                                <h3 className="serif-font">{stats.storeStatus.unreadChats}</h3>
                                                <p>Chats</p>
                                            </div>
                                            <div className="card-split">
                                                <h3 className="serif-font">{stats.storeStatus.subscribers}</h3>
                                                <p>Subs</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="mb-5">
                                <Col md={3}>
                                    <div className="kpi-card-professional" style={{ height: '100px' }}>
                                        <div className="card-bottom h-100">
                                            <div className="card-split">
                                                <h3 className="serif-font">{stats.storeStatus.blogs}</h3>
                                                <p>Total Blogs Published</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {/* Sales Analytics Chart */}
                            <Row>
                                <Col md={12}>
                                    <Card className="chart-card-professional">
                                        <Card.Body>
                                            <h4 className="card-title serif-font mb-4">Sales Analytics (Yearly)</h4>
                                            {stats.monthlySales && stats.monthlySales.length > 0 ? (
                                                <ResponsiveContainer width="100%" height={400} minWidth={0}>
                                                    <AreaChart
                                                        data={stats.monthlySales}
                                                        margin={{
                                                            top: 10,
                                                            right: 30,
                                                            left: 0,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                                        <YAxis axisLine={false} tickLine={false} />
                                                        <Tooltip />
                                                        <Area type="monotone" dataKey="sales" stroke="#7d938a" fill="#7d938a" fillOpacity={0.6} />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <div className="text-center p-5 text-muted">No sales data available for chart</div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default DashboardScreen;
