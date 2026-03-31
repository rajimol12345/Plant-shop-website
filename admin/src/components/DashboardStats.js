import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FiDollarSign, FiShoppingCart, FiPackage, FiUsers } from 'react-icons/fi';

const StatCard = ({ title, value, icon, color }) => (
    <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="d-flex align-items-center">
            <div className={`rounded-circle p-3 mr-3 d-flex align-items-center justify-content-center`} style={{ backgroundColor: `${color}20`, color: color, width: '60px', height: '60px', marginRight: '15px', fontSize: '24px' }}>
                {icon}
            </div>
            <div>
                <h6 className="text-muted mb-1 text-uppercase small font-weight-bold" style={{ letterSpacing: '1px' }}>{title}</h6>
                <h3 className="mb-0 fw-bold">{value}</h3>
            </div>
        </Card.Body>
    </Card>
);

const DashboardStats = ({ products, users, orders }) => {
    // Calculate some basic stats
    const totalSales = orders ? orders.reduce((acc, order) => acc + order.totalPrice, 0) : 0;
    const totalOrders = orders ? orders.length : 0;
    const totalProducts = products ? products.length : 0;
    const totalUsers = users ? users.length : 0;

    return (
        <Row>
            <Col md={3}>
                <StatCard
                    title="Total Sales"
                    value={`$${totalSales.toFixed(2)}`}
                    icon={<FiDollarSign />}
                    color="#2D3E32" // Primary Green
                />
            </Col>
            <Col md={3}>
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    icon={<FiShoppingCart />}
                    color="#4A6754" // Secondary Green
                />
            </Col>
            <Col md={3}>
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={<FiPackage />}
                    color="#F8B864" // Accent Orange/Gold
                />
            </Col>
            <Col md={3}>
                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    icon={<FiUsers />}
                    color="#8DA08E" // Accent Sage
                />
            </Col>
        </Row>
    );
};

export default DashboardStats;
