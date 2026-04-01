import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { listBlogs } from '../actions/blogActions';
import BlogCard from '../components/BlogCard';
import FaqSection from '../components/FaqSection';

const FAQScreen = () => {
    const dispatch = useDispatch();

    const blogList = useSelector((state) => state.blogList);
    const { blogs } = blogList;

    useEffect(() => {
        dispatch(listBlogs());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const latestBlogs = blogs ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3) : [];

    return (
        <div className="faq-screen pb-5" style={{ backgroundColor: '#fff' }}>
            {/* Custom FAQ Hero */}
            <section className="faq-hero py-5" style={{ backgroundColor: '#F9F8F6', marginBottom: '80px' }}>
                <Container fluid>
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start">
                            <img
                                src="/images/man-misting-plants-with-a-water-spray-e1653295699544.jpg"
                                alt="FAQ Hero - Man Watering Plants"
                                className="img-fluid rounded"
                                style={{ maxHeight: '450px', objectFit: 'contain' }}
                            />
                        </Col>
                        <Col lg={6} className="mt-4 mt-lg-0">
                            <h6 className="section-subtitle" style={{ color: '#E2935D', letterSpacing: '2px' }}>FAQ</h6>
                            <h1 className="display-4 fw-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#0c5b47' }}>
                                FREQUENTLY ASKED <br /> QUESTIONS
                            </h1>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="py-5">
                <Row>
                    {/* Column 1: Order & Shipment */}
                    <Col lg={6} className="pe-lg-5 mb-5 mb-lg-0">
                        <h3 className="faq-column-title mb-4">ORDER & SHIPMENT</h3>
                        <FaqSection category="order" />
                    </Col>

                    {/* Column 2: Returns, Exchanges and Complaints */}
                    <Col lg={6} className="ps-lg-5">
                        <h3 className="faq-column-title mb-4 text-uppercase">Returns, exchanges and complaints</h3>
                        <FaqSection category="returns" />
                    </Col>
                </Row>
            </Container>

            {/* CTA Section */}
            <div className="faq-cta-section my-5 text-center text-white" style={{
                background: 'linear-gradient(rgba(12, 91, 71, 0.6), rgba(12, 91, 71, 0.6)), url(/images/hero-bg.jpg) center/cover no-repeat',
                padding: '120px 0'
            }}>
                <Container fluid>
                    <div className="cta-content">
                        <h6 className="text-uppercase mb-3" style={{ letterSpacing: '3px' }}>Discover</h6>
                        <h2 className="cta-title mb-4">PLANT FOR MAKE YOUR PLACE GREEN</h2>
                        <p className="mb-5 mx-auto opacity-75" style={{ maxWidth: '600px' }}>
                            Find the perfect greenery to transform your living space into a refreshing oasis.
                        </p>
                        <button className="btn btn-Greenova px-5 py-3">Shop Now →</button>
                    </div>
                </Container>
            </div>

            {/* Blog Section */}
            <section className="faq-blog-section py-5">
                <Container fluid>
                    <div className="text-center mb-5">
                        <h6 className="section-subtitle" style={{ color: '#F8B864' }}>BLOG & ARTICLE</h6>
                        <h2 className="section-title text-uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>Our Blog & Article</h2>
                        <div className="mx-auto" style={{ width: '80px', height: '2px', backgroundColor: '#F8B864' }}></div>
                    </div>
                    <Row>
                        {latestBlogs.map((blog) => (
                            <Col key={blog._id} md={4} className="mb-4">
                                <BlogCard blog={blog} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

        </div>
    );
};

export default FAQScreen;
