import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaBitcoin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../greenova_logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section-v2">
      <Container className="px-lg-5">
        <Row className="py-5 g-5">
          <Col lg={4} className="mb-4 mb-lg-0">
            <Link to="/" className="text-decoration-none d-block mb-4">
              <div className="footer-logo">
                <img src={logo} alt="Greenova" style={{ height: '50px', width: 'auto' }} />
              </div>
            </Link>
            <p className="footer-about-text mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="payment-methods d-flex gap-2 align-items-center">
              <div className="payment-icon bg-white rounded px-2 py-1 d-flex align-items-center"><FaCcVisa size={28} color="#1A1F71" /></div>
              <div className="payment-icon bg-white rounded px-2 py-1 d-flex align-items-center"><FaCcMastercard size={28} color="#EB001B" /></div>
              <div className="payment-icon bg-white rounded px-2 py-1 d-flex align-items-center"><FaCcAmex size={28} color="#2E77BC" /></div>
              <div className="payment-icon bg-white rounded px-2 py-1 d-flex align-items-center"><FaBitcoin size={28} color="#F7931A" /></div>
              <div className="payment-icon bg-white rounded px-2 py-1 d-flex align-items-center"><FaCcPaypal size={28} color="#003087" /></div>
            </div>
          </Col>

          <Col lg={2} md={4} className="mb-4 mb-md-0">
            <h5 className="footer-sub-heading mb-4">QUICK LINKS</h5>
            <ul className="footer-nav-list list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Col>

          <Col lg={2} md={4} className="mb-4 mb-md-0">
            <h5 className="footer-sub-heading mb-4">OTHER PAGES</h5>
            <ul className="footer-nav-list list-unstyled">
              <li><Link to="/privacy">Privacy & Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
              <li><Link to="/credit">Credit</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </Col>

          <Col lg={4} md={4}>
            <h5 className="footer-sub-heading mb-4">OUR CONTACT</h5>
            <ul className="footer-contact-info list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <span className="contact-icon-v2 me-3"><Phone size={18} /></span>
                <span>+62 361 234 4567</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <span className="contact-icon-v2 me-3"><Mail size={18} /></span>
                <span>contact@domain.com</span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <span className="contact-icon-v2 me-3 mt-1"><MapPin size={18} /></span>
                <span>Jl.Hang Tuah, Denpasar, Bali 80239</span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom-v2 border-top border-secondary py-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="m-0 small text-white">Copyright &copy; 2022. All rights reserved.</p>
            </Col>
            <Col md={6} className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-link"><Facebook size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-link"><Instagram size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link"><Twitter size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-link"><Youtube size={18} /></a>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
