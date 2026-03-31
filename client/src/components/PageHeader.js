import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PageHeader.css';

const PageHeader = ({ title, breadcrumb }) => {
    return (
        <div className="page-header">
            <Container fluid>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="page-header-content"
                >
                    <span className="breadcrumb-text">
                        <Link to="/" className="text-white text-decoration-none">Home</Link> &nbsp;/&nbsp; <span className="current-page">{breadcrumb || title}</span>
                    </span>
                    <h1 className="page-title">{title}</h1>
                    <div className="header-underline"></div>
                </motion.div>
            </Container>
        </div>
    );
};

export default PageHeader;
