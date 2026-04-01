import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';
import { listBlogs } from '../actions/blogActions';
import Newsletter from '../components/Newsletter';
import Message from '../components/Message';
import Loader from '../components/Loader';

const BlogScreen = () => {
    const dispatch = useDispatch();

    const blogList = useSelector((state) => state.blogList);
    const { loading, error, blogs } = blogList;

    useEffect(() => {
        dispatch(listBlogs());
        window.scrollTo(0, 0);
    }, [dispatch]);

    // Extract unique categories
    const categories = blogs ? [...new Set(blogs.map(blog => blog.category))] : ['Tips', 'Insight', 'Care'];

    // Get 3 recent posts for sidebar
    const recentPosts = blogs ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3) : [];

    return (
        <div className="blog-screen" style={{ backgroundColor: '#fff' }}>
            {/* Custom Blog Hero */}
            <section className="blog-hero py-5" style={{ backgroundColor: '#F9F8F6', marginBottom: '80px' }}>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start">
                            <img
                                src="/images/woman-tending-and-caring-for-her-plant-e1653295671644.jpg"
                                alt="Blog Hero - Woman Gardening"
                                className="img-fluid rounded"
                                style={{ maxHeight: '450px', objectFit: 'contain' }}
                            />
                        </Col>
                        <Col lg={6} className="mt-4 mt-lg-0">
                            <h6 className="section-subtitle" style={{ color: '#E2935D', letterSpacing: '2px', fontWeight: 'bold' }}>BLOG</h6>
                            <h1 className="display-4 fw-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#0c5b47' }}>
                                OUR BLOG & ARTICLE
                            </h1>
                            <div style={{ width: '80px', height: '3px', backgroundColor: '#F8B864', marginTop: '15px' }}></div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="py-5">
                <Row>
                    {/* Main Blog Feed */}
                    <Col lg={8} className="pe-lg-5">
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant="danger">{error}</Message>
                        ) : (
                            <div className="blog-feed">
                                <Row>
                                    {blogs && blogs.map((blog) => (
                                        <Col key={blog._id} md={6} className="mb-5">
                                            <BlogCard blog={blog} />
                                        </Col>
                                    ))}
                                    {(!blogs || blogs.length === 0) && (
                                        <Col className="text-center">
                                            <p className="text-muted">No blog posts found.</p>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        )}
                    </Col>

                    {/* Sidebar */}
                    <Col lg={4} className="ps-lg-4">
                        <BlogSidebar
                            recentPosts={recentPosts}
                            categories={categories}
                        />
                    </Col>
                </Row>
            </Container>

            <Newsletter />
        </div>
    );
};

export default BlogScreen;
