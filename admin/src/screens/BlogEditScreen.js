import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listBlogDetails, updateBlog, createBlog } from '../actions/blogActions';
import { BLOG_UPDATE_RESET, BLOG_CREATE_RESET } from '../constants/blogConstants';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const BlogEditScreen = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const dispatch = useDispatch();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogUpdate;

  const blogCreate = useSelector((state) => state.blogCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = blogCreate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      navigate('/admin/blogs');
    } else if (successCreate) {
      dispatch({ type: BLOG_CREATE_RESET });
      navigate('/admin/blogs');
    } else {
      if (blogId) {
        if (!blog.title || blog._id !== blogId) {
          dispatch(listBlogDetails(blogId));
        } else {
          setTitle(blog.title);
          setContent(blog.content);
          setImage(blog.image);
          setCategory(blog.category);
          setExcerpt(blog.excerpt);
        }
      }
    }
  }, [dispatch, navigate, blogId, blog, successUpdate, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (blogId) {
      dispatch(
        updateBlog({
          _id: blogId,
          title,
          content,
          image,
          category,
          excerpt
        })
      );
    } else {
      dispatch(
        createBlog({
          title,
          content,
          image,
          category,
          excerpt
        })
      );
    }
  };

  return (
    <>
      <Link to="/admin/blogs" className="btn btn-light my-3 border-0 shadow-sm d-inline-flex align-items-center">
        <FiArrowLeft className="me-2" /> Go Back
      </Link>
      <FormContainer>
        <h1 className="section-title-v2 mb-4 text-center">{blogId ? 'Edit Blog' : 'Create Blog'}</h1>
        {(loadingUpdate || loadingCreate) && <Loader />}
        {(errorUpdate || errorCreate) && <Message variant="danger">{errorUpdate || errorCreate}</Message>}
        {(blogId && loading) ? (
          <Loader />
        ) : (blogId && error) ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="card p-4 border-0 shadow-sm">
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="content" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mb-2"
              ></Form.Control>
              <Form.Control
                type="file"
                onChange={handleFileChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="excerpt" className="mb-4">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-primary w-100">
              <FiSave className="me-2" /> {blogId ? 'Update Blog' : 'Create Blog'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogEditScreen;
