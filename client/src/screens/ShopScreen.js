import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import ShopSidebar from '../components/ShopSidebar';
import ShopHero from '../components/ShopHero';
import ShopPromo from '../components/ShopPromo';
import Newsletter from '../components/Newsletter';
import './ShopScreen.css';

const ShopScreen = () => {
    const { keyword: urlKeyword } = useParams();
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState(urlKeyword || '');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [pageNumber, setPageNumber] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products = [], page, pages } = productList;

    useEffect(() => {
        if (urlKeyword) {
            setKeyword(urlKeyword);
        }
    }, [urlKeyword]);

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, category, priceRange));
    }, [dispatch, keyword, pageNumber, category, priceRange]);

    return (
        <div className="shop-page-wrapper">
            <ShopHero />

            <ShopPromo />

            <Container fluid className="shop-content-container pb-5">
                <Row>
                    {/* Product Grid - Left Side (lg:9) */}
                    <Col lg={9} className="pe-lg-5">
                        <div className="shop-header-controls mb-4 d-flex justify-content-between align-items-center">
                            <p className="results-count mb-0">Showing 1–{products.length} of {products.length} results</p>
                            <div className="sorting-dropdown">
                                <select className="form-select border-0 shadow-none bg-transparent fw-600">
                                    <option>Default sorting</option>
                                    <option>Sort by price: low to high</option>
                                    <option>Sort by price: high to low</option>
                                    <option>Sort by latest</option>
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-theme-orange" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            <Row className="g-4">
                                {products.map((product) => (
                                    <Col key={product._id} sm={6} md={6} lg={4}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        {/* Pagination */}
                        {pages > 1 && (
                            <div className="shop-pagination d-flex justify-content-center mt-5 pt-4">
                                {[...Array(pages).keys()].map((x) => (
                                    <button
                                        key={x + 1}
                                        className={`page-circle ${x + 1 === page ? 'active' : ''}`}
                                        onClick={() => setPageNumber(x + 1)}
                                    >
                                        {x + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </Col>

                    {/* Sidebar - Right Side (lg:3) */}
                    <Col lg={3}>
                        <ShopSidebar
                            keyword={keyword}
                            setKeyword={setKeyword}
                            category={category}
                            setCategory={setCategory}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />
                    </Col>
                </Row>
            </Container>

            <Newsletter />
        </div>
    );
};

export default ShopScreen;
