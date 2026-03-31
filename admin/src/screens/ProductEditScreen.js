import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct, createProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

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

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [priceOnSale, setPriceOnSale] = useState(0);
  const [onSale, setOnSale] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/products');
    } else if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate('/admin/products');
    } else {
      if (productId) {
        if (!product.name || product._id !== productId) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
          setPriceOnSale(product.priceOnSale);
          setOnSale(product.onSale);
        }
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (productId) {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
          priceOnSale,
          onSale
        })
      );
    } else {
      dispatch(
        createProduct({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
          priceOnSale,
          onSale
        })
      );
    }
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3 border-0 shadow-sm d-inline-flex align-items-center">
        <FiArrowLeft className="me-2" /> Go Back
      </Link>
      <FormContainer>
        <h1 className="section-title-v2 mb-4 text-center">{productId ? 'Edit Product' : 'Create Product'}</h1>
        {(loadingUpdate || loadingCreate) && <Loader />}
        {(errorUpdate || errorCreate) && <Message variant="danger">{errorUpdate || errorCreate}</Message>}
        {(productId && loading) ? (
          <Loader />
        ) : (productId && error) ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="card p-4 border-0 shadow-sm">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
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

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="priceOnSale" className="mb-3">
              <Form.Label>Price On Sale</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price on sale"
                value={priceOnSale}
                onChange={(e) => setPriceOnSale(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="onSale" className="mb-4">
              <Form.Check
                type="checkbox"
                label="On Sale"
                checked={onSale}
                onChange={(e) => setOnSale(e.target.checked)}
                className="custom-control-input"
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-primary w-100">
              <FiSave className="me-2" /> {productId ? 'Update Product' : 'Create Product'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
