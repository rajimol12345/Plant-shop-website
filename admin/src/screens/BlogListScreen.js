import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listBlogs, deleteBlog, createBlog } from '../actions/blogActions';
import { BLOG_CREATE_RESET } from '../constants/blogConstants';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const BlogListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const blogDelete = useSelector((state) => state.blogDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    dispatch(listBlogs());
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      dispatch(deleteBlog(id));
    }
  };

  const createBlogHandler = () => {
    navigate('/admin/blog/create');
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="section-title-v2 mb-0" style={{ fontSize: '1.75rem' }}>Blog Management</h2>
          <p className="text-muted small">Manage your store's articles and news updates</p>
        </Col>
        <Col className="text-end">
          <button className="btn-premium py-2 px-4 shadow-sm h-100" onClick={createBlogHandler}>
            <FiPlus className="me-2" /> CREATE NEW ARTICLE
          </button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="custom-table-container">
          <Table responsive className="custom-table border-0 shadow-sm">
            <thead>
              <tr>
                <th>ARTICLE</th>
                <th>CATEGORY</th>
                <th>DATE</th>
                <th>AUTHOR</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {(blogs || []).map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="rounded me-3"
                        style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid #eee' }}
                      />
                      <div>
                        <div className="fw-bold text-truncate" style={{ maxWidth: '250px' }}>{blog.title}</div>
                        <div className="text-muted small" style={{ fontSize: '0.7rem' }}>ID: #{blog._id.slice(-6).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border fw-normal py-1 px-2">{blog.category}</span>
                  </td>
                  <td className="text-muted small">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{blog.author && blog.author.name}</div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/admin/blog/${blog._id}/edit`}>
                        <button className="btn-icon-v2" title="Edit Article">
                          <FiEdit size={14} />
                        </button>
                      </Link>
                      <button
                        className="btn-icon-v2 btn-delete"
                        title="Delete Article"
                        onClick={() => deleteHandler(blog._id)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default BlogListScreen;
