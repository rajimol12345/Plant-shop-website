import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiChevronRight } from 'react-icons/hi';
import { FaChevronRight } from 'react-icons/fa';
import './BlogSidebar.css';

const BlogSidebar = ({ recentPosts, categories }) => {
    return (
        <aside className="blog-sidebar ps-lg-4">
            {/* Recent Posts */}
            <div className="sidebar-widget mb-5">
                <h4 className="widget-title">Recent Posts</h4>
                <div className="recent-posts-list">
                    {recentPosts && recentPosts.map((post) => (
                        <div key={post._id} className="recent-post-item mb-3 d-flex align-items-center">
                            <div className="recent-post-img-wrapper me-3">
                                <img src={post.image} alt={post.title} className="recent-post-img" />
                            </div>
                            <div className="recent-post-info">
                                <Link to={`/blog/${post._id}`} className="recent-post-link">
                                    <h6 className="recent-post-title mb-1">{post.title}</h6>
                                </Link>
                                <span className="recent-post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Questions Widget */}
            <div className="sidebar-widget mb-5 contact-widget p-4 text-center" style={{
                background: 'linear-gradient(rgba(45, 62, 50, 0.8), rgba(45, 62, 50, 0.8)), url("/images/featured-house-plant.jpg") center/cover',
                borderRadius: '0',
                padding: '40px 30px !important'
            }}>
                <h4 className="widget-title mb-4 text-white p-0 border-0" style={{ fontSize: '1.4rem' }}>HAVE ANY QUESTION?</h4>
                <p className="text-white opacity-75 mb-4 small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
                <div className="contact-item mb-3 text-white d-flex align-items-center justify-content-center">
                    <HiOutlinePhone className="me-2 text-warning" size={20} />
                    <span className="fw-bold">(+62) 81 158 3642</span>
                </div>
                <div className="contact-item text-white d-flex align-items-center justify-content-center">
                    <HiOutlineMail className="me-2 text-warning" size={20} />
                    <span className="fw-bold">contact@domain.com</span>
                </div>
            </div>

            {/* Categories */}
            <div className="sidebar-widget mb-5">
                <h4 className="widget-title">Categories</h4>
                <ListGroup variant="flush" className="category-list">
                    {categories && categories.map((cat, index) => (
                        <ListGroup.Item key={index} className="bg-transparent border-0 px-0 pb-2 border-bottom mb-2">
                            <Link to={`/blog/category/${cat.toLowerCase()}`} className="category-link d-flex justify-content-between align-items-center">
                                <span><FaChevronRight size={10} className="me-2 text-warning" /> {cat}</span>
                                <span className="cat-count">→</span>
                            </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </aside>
    );
};

export default BlogSidebar;
