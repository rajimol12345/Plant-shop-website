import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts('', 1)); // Pass empty keyword and page 1
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <Container className="py-5">
            <Row className="align-items-center mb-4">
                <Col>
                    <h2 style={{ fontFamily: 'Playfair Display' }}>Products</h2>
                </Col>
                <Col className="text-end">
                    <Button className="my-3 btn-success" onClick={createProductHandler}>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <p>Deleting...</p>}
            {errorDelete && <p className="text-danger">{errorDelete}</p>}
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
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm me-2">
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
