import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Search,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  User,
  ArrowRight
} from 'lucide-react';
import './Header.css';
import logo from '../greenova_logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop/search/${keyword}`);
      setSearchOpen(false);
      setKeyword('');
    } else {
      navigate('/shop');
    }
  };

  return (
    <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container-fluid text-center">
          <p>
            Our Newest Limited-Edition Plants <Link to="/shop">Shop New Arrivals</Link>
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="container-fluid nav-content">
          {/* Logo - LEFT */}
          <Link to="/" className="logo-container text-decoration-none">
            <div className="d-flex align-items-center gap-2">
              <img src={logo} alt="Greenova" className="brand-logo-img" />
            </div>
          </Link>

          {/* Desktop Links - CENTER */}
          <ul className="desktop-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
            <li>
              <Link to="/shop" className={location.pathname.includes('/shop') ? 'active' : ''}>
                Shop
              </Link>
            </li>
            <li className="has-dropdown">
              <button className={`nav-link-btn ${location.pathname === '/team' || location.pathname === '/faq' ? 'active' : ''}`}>
                Pages <ChevronDown size={14} />
              </button>
              <ul className="dropdown-menu-v2">
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/404">404 Page</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/blog" className={location.pathname.includes('/blog') ? 'active' : ''}>
                Blog
              </Link>
            </li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </ul>

          {/* Right Icons - RIGHT */}
          <div className="nav-icons">
            <button className="icon-btn search-trigger" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={2} />
            </button>

            <Link to="/profile" className="d-flex align-items-center text-decoration-none gap-2">
              {userInfo ? (
                <>
                  {userInfo.image ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${userInfo.image}`}
                      alt={userInfo.name}
                      style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #0c5b47'
                      }}
                    />
                  ) : (
                    <div className="icon-btn">
                      <User size={20} strokeWidth={2} />
                    </div>
                  )}
                  <span className="d-none d-md-block fw-bold" style={{ color: '#0c5b47', fontSize: '0.9rem' }}>
                    {userInfo.name.split(' ')[0]}
                  </span>
                </>
              ) : (
                <div className="icon-btn">
                  <User size={20} strokeWidth={2} />
                </div>
              )}
            </Link>

            <Link to="/cart" className="icon-btn cart-btn">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}</span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button className="icon-btn mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <img src={logo} alt="Greenova" className="brand-logo-img" />
          </Link>
          <button className="icon-btn" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="mobile-nav-links">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          
          <div className="mobile-dropdown-container">
            <div className="mobile-dropdown-title" onClick={() => setPagesOpen(!pagesOpen)}>
              Pages <ChevronDown size={18} style={{ transform: pagesOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
            </div>
            {pagesOpen && (
              <div className="mobile-dropdown-items">
                <Link to="/team" onClick={() => setMobileMenuOpen(false)}>Team</Link>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                <Link to="/404" onClick={() => setMobileMenuOpen(false)}>404 Page</Link>
              </div>
            )}
          </div>

          <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`search-overlay ${searchOpen ? 'open' : ''}`}>
        <button className="close-search" onClick={() => setSearchOpen(false)}>
          <X size={32} />
        </button>
        <div className="search-overlay-content">
          <form onSubmit={searchHandler} className="search-form-v2 w-100">
            <input
              type="text"
              placeholder="SEARCH PRODUCTS..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              autoFocus={searchOpen}
            />
            <button type="submit" className="search-submit">
              <ArrowRight size={24} />
            </button>
          </form>
          <p className="search-tip mt-4 text-muted small">Press enter to search or esc to close</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
