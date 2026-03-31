import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FiFacebook, FiTwitter, FiLinkedin, FiPlus, FiAlertTriangle, FiClock, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

const SocialCard = ({ icon, color, title, subtitle, footerLeft, footerRight, footerLabelLeft, footerLabelRight }) => (
    <Card className="border-0 shadow-sm h-100 social-card-style">
        <div className="social-header d-flex align-items-center justify-content-center p-4 text-white" style={{ backgroundColor: color, fontSize: '40px' }}>
            {icon}
        </div>
        <Card.Body className="text-center pt-3 pb-2">
            <Row>
                <Col xs={6} className="border-end">
                    <h4 className="fw-bold mb-0">{footerLeft}</h4>
                    <small className="text-muted">{footerLabelLeft}</small>
                </Col>
                <Col xs={6}>
                    <h4 className="fw-bold mb-0">{footerRight}</h4>
                    <small className="text-muted">{footerLabelRight}</small>
                </Col>
            </Row>
        </Card.Body>
    </Card>
);

const DashboardSocialStats = ({ products, orders, chatAdminList }) => {
    const { chats } = chatAdminList || { chats: [] };
    // Calculate Stats
    const lowStock = products ? products.filter(p => p.countInStock < 5).length : 0;
    const pendingOrders = orders ? orders.filter(o => !o.isPaid).length : 0;
    const paidOrders = orders ? orders.filter(o => o.isPaid).length : 0;
    const unreadChatsCount = chats ? chats.reduce((acc, chat) => acc + (chat.unreadCount > 0 ? 1 : 0), 0) : 0;

    return (
        <Row className="mb-4">
            <Col md={3} className="mb-4 mb-md-0">
                <SocialCard
                    icon={<FiAlertTriangle />}
                    color="#dd4b39"
                    footerLeft={lowStock} footerLabelLeft="Low Stock"
                    footerRight="Items" footerLabelRight="Attn"
                />
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
                <SocialCard
                    icon={<FiClock />}
                    color="#F8B864"
                    footerLeft={pendingOrders} footerLabelLeft="Pending"
                    footerRight="Orders" footerLabelRight="Action"
                />
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
                <SocialCard
                    icon={<FiCheckCircle />}
                    color="#4A6754"
                    footerLeft={paidOrders} footerLabelLeft="Paid"
                    footerRight="Orders" footerLabelRight="Done"
                />
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
                <SocialCard
                    icon={<FiMessageSquare />}
                    color="#00acee"
                    footerLeft={unreadChatsCount} footerLabelLeft="Unread"
                    footerRight="Chats" footerLabelRight="Support"
                />
            </Col>
        </Row>
    );
};

export default DashboardSocialStats;
