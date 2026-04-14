import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
    dispatch(listProducts());
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    navigate('/admin/product/create');
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="section-title-v2 mb-0" style={{ fontSize: '1.75rem' }}>Product Management</h2>
          <p className="text-muted small">Add, edit, or remove plants from your store catalog</p>
        </Col>
        <Col className="text-end">
          <button className="btn-premium py-2 px-4 shadow-sm h-100" onClick={createProductHandler}>
            <FiPlus className="me-2" /> CREATE NEW PRODUCT
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
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th className="text-center">STOCK</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {(products.products || products || []).map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={product.image && (product.image.startsWith('http') || product.image.startsWith('data:')) ? product.image : `${process.env.REACT_APP_API_URL || ''}${product.image}`}
                        alt={product.name}
                        className="rounded me-3"
                        style={{ width: '45px', height: '45px', objectFit: 'cover', border: '1px solid #eee' }}
                      />
                      <div>
                        <div className="fw-bold">{product.name}</div>
                        <div className="text-muted small" style={{ fontSize: '0.7rem' }}>ID: #{product._id.slice(-6).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border fw-normal py-1 px-2">{product.category}</span>
                  </td>
                  <td className="fw-bold text-dark">${product.price.toFixed(2)}</td>
                  <td className="text-center">
                    <div className={`fw-bold ${product.countInStock > 0 ? 'text-success' : 'text-danger'}`}>
                      {product.countInStock}
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.65rem' }}>AVAILABLE</div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="btn-icon-v2" title="Edit Product">
                          <FiEdit size={14} />
                        </button>
                      </Link>
                      <button
                        className="btn-icon-v2 btn-delete"
                        title="Delete Product"
                        onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
