import React, { useState } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ShopSidebar.css';

const ShopSidebar = ({ keyword, setKeyword, category, setCategory, priceRange, setPriceRange }) => {
    const [localKeyword, setLocalKeyword] = useState(keyword);

    const submitSearchHandler = (e) => {
        e.preventDefault();
        setKeyword(localKeyword);
    };

    const categories = [
        { name: 'Indoor Plant', count: 5 },
        { name: 'Low Maintenance', count: 5 },
        { name: 'Pet Friendly', count: 5 },
        { name: 'Pot', count: 2 },
    ];

    return (
        <div className="shop-sidebar">
            {/* Search Widget */}
            <div className="sidebar-widget search-widget">
                <Form onSubmit={submitSearchHandler} className="position-relative">
                    <Form.Control
                        type="text"
                        placeholder="Search products..."
                        className="search-input-v2"
                        value={localKeyword}
                        onChange={(e) => setLocalKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-submit-icon-v2">
                        <Search size={18} />
                    </button>
                </Form>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget category-widget mt-5">
                <h4 className="widget-title-v2">PRODUCT CATEGORIES</h4>
                <ListGroup variant="flush" className="sidebar-list">
                    {categories.map((cat) => (
                        <ListGroup.Item
                            key={cat.name}
                            action
                            className={`sidebar-link-v2 d-flex justify-content-between align-items-center ${category === cat.name ? 'active' : ''}`}
                            onClick={() => setCategory(cat.name)}
                        >
                            <span className="cat-name">{cat.name}</span>
                            <span className="count-badge-v2">({cat.count})</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>

            {/* Price Filter Widget */}
            <div className="sidebar-widget price-widget mt-5">
                <h4 className="widget-title-v2">FILTER BY PRICE</h4>
                <div className="px-1">
                    <Form.Range
                        min={0}
                        max={1000}
                        step={10}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        className="custom-range-v2"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="price-text-v2">Price: <strong>${priceRange[0]} — ${priceRange[1]}</strong></span>
                        <button className="btn-filter-sidebar-v2">FILTER</button>
                    </div>
                </div>
            </div>

            {/* Sale Banner */}
            <div className="sidebar-promo-banner-v2 mt-5">
                <img src="/images/featured-gift-green.jpg" alt="Promo" className="promo-img-v2" />
                <div className="promo-overlay-v2">
                    <span className="promo-tag-v2">ALL PRODUCT</span>
                    <h3 className="promo-title-v2">LAST CHANCE SALE</h3>
                    <Link to="/shop" className="promo-link-v2">Shop Now &rarr;</Link>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;
