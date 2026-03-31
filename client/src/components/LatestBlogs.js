import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from './BlogCard';
import { listBlogs } from '../actions/blogActions';
import './LatestBlogs.css';

const LatestBlogs = () => {
  const dispatch = useDispatch();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs = [] } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  return (
    <section className="latest-blogs-section py-5 px-lg-5">
      <Container fluid className="px-lg-5">
        <div className="text-center mb-5">
          <span className="section-tag-v2">LATEST BLOG</span>
          <h2 className="section-title-v2">LATEST BLOG & ARTICLE</h2>
          <div className="section-divider-v2"></div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-theme-orange" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : (
          <Row className="g-4">
            {blogs.slice(0, 3).map((blog) => (
              <Col key={blog._id} md={4}>
                <BlogCard blog={blog} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default LatestBlogs;
