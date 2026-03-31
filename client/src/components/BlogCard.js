import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <Card className="mb-4 border-0 blog-card-v2 h-100">
      <Link to={`/blog/${blog._id}`} className="blog-card-link text-decoration-none">
        <div className="blog-image-wrapper overflow-hidden">
          <Card.Img
            src={blog.image}
            variant="top"
            className="blog-img-v3"
          />
          <div className="blog-tag-v2">
            {blog.category}
          </div>
        </div>

        <Card.Body className="px-0 pt-4">
          <div className="blog-info-meta mb-2">
            <span className="blog-writer">By Admin</span>
            <span className="meta-dot mx-2">&#8226;</span>
            <span className="blog-posted-at">{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          <Card.Title className="blog-title-v3 mb-3">
            {blog.title}
          </Card.Title>

          <Card.Text className="blog-summary-v2 mb-4">
            {blog.excerpt && blog.excerpt.length > 100
              ? `${blog.excerpt.substring(0, 100)}...`
              : blog.excerpt}
          </Card.Text>

          <div className="blog-read-more">
            READ MORE <ArrowRight className="ms-3" size={16} />
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default BlogCard;
