import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="admin-header w-100">
            <Navbar bg="white" expand="lg" className="shadow-sm py-3 w-100" style={{ height: 'var(--header-height)' }}>
                <Container fluid className="px-4">
                    {/* Empty brand since we have sidebar */}
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <NavDropdown title={
                                <span className="d-flex align-items-center">
                                    {userInfo.image ? (
                                        <img
                                            src={userInfo.image}
                                            alt={userInfo.name}
                                            className="rounded-circle me-2"
                                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <FiUser className="me-1" />
                                    )}
                                    {userInfo.name}
                                </span>
                            } id="username">
                                <NavDropdown.Item as={Link} to="/admin/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <FiLogOut className="me-1" /> Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                <FiUser /> Sign In
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
