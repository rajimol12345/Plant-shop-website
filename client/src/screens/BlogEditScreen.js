import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBlogDetails, updateBlog } from '../actions/blogActions';
import { BLOG_UPDATE_RESET } from '../constants/blogConstants';

const BlogEditScreen = () => {
    const { id: blogId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const blogDetails = useSelector((state) => state.blogDetails);
    const { loading, error, blog } = blogDetails;

    const blogUpdate = useSelector((state) => state.blogUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = blogUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: BLOG_UPDATE_RESET });
            navigate('/admin/bloglist');
        } else {
            if (!blog.title || blog._id !== blogId) {
                dispatch(listBlogDetails(blogId));
            } else {
                setTitle(blog.title);
                setImage(blog.image);
                setCategory(blog.category);
                setExcerpt(blog.excerpt);
                setContent(blog.content);
            }
        }
    }, [dispatch, navigate, blogId, blog, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateBlog({
                _id: blogId,
                title,
                image,
                category,
                excerpt,
                content,
            })
        );
    };

    return (
        <Container className="py-5">
            <Link to="/admin/bloglist" className="btn btn-light my-3">
                Go Back
            </Link>

            <Container style={{ maxWidth: '800px' }}>
                <h1 style={{ fontFamily: 'Playfair Display' }}>Edit Blog</h1>
                {loadingUpdate && <p>Updating...</p>}
                {errorUpdate && <p className="text-danger">{errorUpdate}</p>}

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image" className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="mb-2"
                            ></Form.Control>
                            <Form.Control type="file" label="Choose File" onChange={uploadFileHandler}></Form.Control>
                            {uploading && <p>Uploading...</p>}
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

                        <Form.Group controlId="excerpt" className="mb-3">
                            <Form.Label>Excerpt</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="content" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="btn-success">
                            Update
                        </Button>
                    </Form>
                )}
            </Container>
        </Container>
    );
};

export default BlogEditScreen;
