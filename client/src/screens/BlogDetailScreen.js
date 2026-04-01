import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaPinterestP, FaCheck } from 'react-icons/fa';
import { HiOutlineChatAlt, HiOutlineCalendar, HiOutlineUser, HiOutlineChevronRight } from 'react-icons/hi';
import { listBlogDetails, listBlogs } from '../actions/blogActions';
import BlogSidebar from '../components/BlogSidebar';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './BlogDetailScreen.css';

const BlogDetailScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const blogDetails = useSelector((state) => state.blogDetails) || { loading: true, blog: {} };
    const { loading, error, blog } = blogDetails;

    const blogList = useSelector((state) => state.blogList);
    const { blogs } = blogList;

    useEffect(() => {
        dispatch(listBlogDetails(id));
        if (!blogs || blogs.length === 0) {
            dispatch(listBlogs());
        }
        window.scrollTo(0, 0);
    }, [dispatch, id, blogs]);

    // Extract categories and recent posts for the sidebar
    const categories = blogs ? [...new Set(blogs.map(b => b.category))] : ['Tips', 'Insight', 'Care'];
    const recentPosts = blogs ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3) : [];

    return (
        <div className="blog-detail-screen">
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : blog && (
                <>
                    {/* Single Post Hero */}
                    <section className="post-detail-hero py-5" style={{ backgroundColor: '#F9F8F6', marginBottom: '80px' }}>
                        <Container fluid>
                            <Row className="align-items-center">
                                <Col lg={6} className="text-center text-lg-start pe-lg-5">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        className="img-fluid rounded shadow-sm"
                                        style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col lg={6} className="mt-4 mt-lg-0 ps-lg-5">
                                    <div className="post-breadcrumb mb-3">
                                        <Link to="/" className="text-muted text-decoration-none small">HOME</Link>
                                        <HiOutlineChevronRight className="mx-2 text-muted" size={12} />
                                        <Link to="/blog" className="text-muted text-decoration-none small">BLOG</Link>
                                        <HiOutlineChevronRight className="mx-2 text-muted" size={12} />
                                        <span className="text-warning small fw-bold">{blog.category ? blog.category.toUpperCase() : ''}</span>
                                    </div>
                                    <h1 className="display-4 fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0c5b47', lineHeight: '1.2' }}>
                                        {blog.title}
                                    </h1>
                                    <div className="post-meta-bottom d-flex align-items-center gap-4 text-muted small fw-bold">
                                        <span className="d-flex align-items-center"><HiOutlineUser className="me-2 text-warning" /> ADMIN</span>
                                        <span className="d-flex align-items-center"><HiOutlineCalendar className="me-2 text-warning" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span className="d-flex align-items-center"><HiOutlineChatAlt className="me-2 text-warning" /> 0 COMMENTS</span>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>

                    <Container className="pb-5">
                        <Row>
                            {/* Main Post Content */}
                            <Col lg={8} className="pe-lg-5">
                                <article className="post-article-body">
                                    <p className="lead mb-5" style={{ lineHeight: '1.8', color: '#666' }}>
                                        {blog.excerpt}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>

                                    <h3 className="post-sub-title mb-4">HOW TO TAKING CARE YOUR PLANT</h3>
                                    <p className="mb-5">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                                    </p>

                                    <Row className="mb-5 align-items-start">
                                        <Col md={6} className="mb-4 mb-md-0">
                                            <Image src="/images/team-about.png" alt="Care" fluid className="rounded" />
                                        </Col>
                                        <Col md={6}>
                                            <ul className="checkmark-list-v2 list-unstyled">
                                                <li><FaCheck className="me-2 text-warning" /> Neque porro quisquam est, qui dolorem</li>
                                                <li><FaCheck className="me-2 text-warning" /> Ipsum quia dolor sit amet, consectetur</li>
                                                <li><FaCheck className="me-2 text-warning" /> Quisquam est, qui dolorem ipsum quia</li>
                                                <li><FaCheck className="me-2 text-warning" /> Adipisci velit, sed quia non numquam</li>
                                                <li><FaCheck className="me-2 text-warning" /> Eius modi tempora incidunt ut labore</li>
                                            </ul>
                                        </Col>
                                    </Row>

                                    <h3 className="post-sub-title mb-4">TIPS & TRICK</h3>
                                    <p className="mb-4">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                    </p>

                                    <Row className="mb-5">
                                        <Col md={6}>
                                            <ul className="checkmark-list-v2 list-unstyled">
                                                <li><FaCheck className="me-2 text-warning" /> Neque porro quisquam est</li>
                                                <li><FaCheck className="me-2 text-warning" /> Ipsum quia dolor sit amet</li>
                                                <li><FaCheck className="me-2 text-warning" /> Quisquam est, qui dolorem</li>
                                            </ul>
                                        </Col>
                                        <Col md={6}>
                                            <ul className="checkmark-list-v2 list-unstyled">
                                                <li><FaCheck className="me-2 text-warning" /> Adipisci velit, sed quia non</li>
                                                <li><FaCheck className="me-2 text-warning" /> Eius modi tempora incidunt</li>
                                                <li><FaCheck className="me-2 text-warning" /> Quisquam est, qui dolorem</li>
                                            </ul>
                                        </Col>
                                    </Row>

                                    <Row className="mb-5">
                                        <Col md={6} className="mb-4 mb-md-0">
                                            <Image src="/images/insta-1.jpg" alt="Plant 1" fluid className="rounded" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
                                        </Col>
                                        <Col md={6}>
                                            <Image src="/images/insta-2.jpg" alt="Plant 2" fluid className="rounded" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
                                        </Col>
                                    </Row>

                                    <p className="mb-5">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                                    </p>

                                    <div className="post-tags-share d-flex flex-wrap justify-content-between align-items-center py-4 border-top border-bottom mb-5">
                                        <div className="post-tags-v2 d-flex align-items-center">
                                            <span className="fw-bold me-3">Tags :</span>
                                            <span className="text-muted small">Care, Insight, Tips</span>
                                        </div>
                                        <div className="post-share-v2 d-flex align-items-center">
                                            <span className="fw-bold me-3">Share this :</span>
                                            <div className="d-flex gap-2">
                                                <button className="share-btn-v2"><FaFacebookF /></button>
                                                <button className="share-btn-v2"><FaTwitter /></button>
                                                <button className="share-btn-v2"><FaPinterestP /></button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Leave a Reply Section */}
                                    <div className="comment-section-v2 pt-4">
                                        <h3 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display' }}>LEAVE A REPLY</h3>
                                        <p className="text-muted small mb-4">Your email address will not be published. Required fields are marked *</p>

                                        <Form className="comment-form-v2">
                                            <div className="mb-4">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={6}
                                                    placeholder="Your Comment *"
                                                    className="comment-input-v2"
                                                    required
                                                />
                                            </div>
                                            <Row>
                                                <Col md={4} className="mb-4">
                                                    <Form.Control type="text" placeholder="Name *" className="comment-input-v2" required />
                                                </Col>
                                                <Col md={4} className="mb-4">
                                                    <Form.Control type="email" placeholder="Email *" className="comment-input-v2" required />
                                                </Col>
                                                <Col md={4} className="mb-4">
                                                    <Form.Control type="text" placeholder="Website" className="comment-input-v2" />
                                                </Col>
                                            </Row>
                                            <div className="mb-4 d-flex align-items-center">
                                                <Form.Check type="checkbox" id="save-info" />
                                                <label htmlFor="save-info" className="ms-2 text-muted small cursor-pointer">
                                                    Save my name, email, and website in this browser for the next time I comment.
                                                </label>
                                            </div>
                                            <Button className="btn-post-comment-v2 py-3 px-5">
                                                POST COMMENT
                                            </Button>
                                        </Form>
                                    </div>
                                </article>
                            </Col>

                            {/* Sidebar */}
                            <Col lg={4} className="ps-lg-4 mt-5 mt-lg-0">
                                <BlogSidebar recentPosts={recentPosts} categories={categories} />
                            </Col>
                        </Row>
                    </Container>

                </>
            )}
        </div>
    );
};

export default BlogDetailScreen;
