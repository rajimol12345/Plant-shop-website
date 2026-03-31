import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { listBlogs, deleteBlog, createBlog } from '../actions/blogActions';
import { BLOG_CREATE_RESET } from '../constants/blogConstants';
import { useNavigate } from 'react-router-dom';

const BlogListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const blogList = useSelector((state) => state.blogList);
    const { loading, error, blogs } = blogList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const blogDelete = useSelector((state) => state.blogDelete);
    const { success: successDelete } = blogDelete;

    const blogCreate = useSelector((state) => state.blogCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        blog: createdBlog,
    } = blogCreate;

    useEffect(() => {
        dispatch({ type: BLOG_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/blog/${createdBlog._id}/edit`);
        } else {
            dispatch(listBlogs());
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdBlog]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            dispatch(deleteBlog(id));
        }
    };

    const createBlogHandler = () => {
        dispatch(createBlog());
    };

    return (
        <Container className="py-5">
            <Row className="align-items-center mb-4">
                <Col>
                    <h2 style={{ fontFamily: 'Playfair Display' }}>Blogs</h2>
                </Col>
                <Col className="text-end">
                    <Button className="my-3 btn-success" onClick={createBlogHandler}>
                        <FaPlus /> Create Blog
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <p>Creating...</p>}
            {errorCreate && <p className="text-danger">{errorCreate}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead style={{ backgroundColor: '#0c5b47', color: 'white' }}>
                        <tr>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>AUTHOR</th>
                            <th>CATEGORY</th>
                            <th>DATE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td>{blog._id}</td>
                                <td>{blog.title}</td>
                                <td>{blog.author && blog.author.name}</td>
                                <td>{blog.category}</td>
                                <td>{blog.createdAt.substring(0, 10)}</td>
                                <td>
                                    <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                                        <Button variant="light" className="btn-sm me-2">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(blog._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default BlogListScreen;
