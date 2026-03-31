import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Carousel } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';
import { listTestimonials } from '../actions/testimonialActions';
import './TestimonialCarousel.css';

const TestimonialCarousel = () => {
    const dispatch = useDispatch();

    const testimonialList = useSelector((state) => state.testimonialList);
    const { loading, error, testimonials } = testimonialList;

    useEffect(() => {
        dispatch(listTestimonials());
    }, [dispatch]);

    return (
        <section className="testimonial-section position-relative py-5">
            <Container fluid>
                <div className="testimonial-wrapper">
                    {/* Background Image Area (Simulating the left side image) */}
                    <div className="testimonial-bg-image" style={{ backgroundImage: "url('/images/testimonial-bg.jpg')" }}>
                    </div>

                    {/* Floating Content Card */}
                    <div className="testimonial-card-container">
                        {loading ? (
                            <div className="bg-white p-5 shadow-sm">Loading...</div>
                        ) : error ? (
                            <div className="bg-white p-5 shadow-sm text-danger">{error}</div>
                        ) : (
                            <Carousel
                                controls={false}
                                indicators={true}
                                interval={6000}
                                pause='hover'
                                className="testimonial-carousel"
                            >
                                {testimonials.map((item) => (
                                    <Carousel.Item key={item._id}>
                                        <div className="testimonial-content bg-white p-4 p-md-5">
                                            <div className="quote-icon-large text-end mb-3">
                                                <FaQuoteLeft />
                                            </div>
                                            <p className="testimonial-text mb-4">
                                                {item.comment}
                                            </p>
                                            <div className="testimonial-rating mb-3">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <i key={i} className="fas fa-star text-warning me-1"></i>
                                                ))}
                                            </div>
                                            <div className="d-flex align-items-center mt-4">
                                                <div className="auth-img-wrapper me-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                                <div className="auth-info">
                                                    <h5 className="auth-name mb-0">{item.name}</h5>
                                                    <small className="auth-role">{item.role}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        {/* Foreground Depth Effect */}
                        <div className="testimonial-foreground-leaves">
                            <img src="/images/leaves-foreground.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default TestimonialCarousel;
