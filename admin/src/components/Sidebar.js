import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHome, FiBox, FiShoppingBag, FiUsers, FiFileText, FiLogOut, FiMessageSquare } from 'react-icons/fi';
import { listAdminChats } from '../actions/chatActions';
import { logout } from '../actions/userActions';

const Sidebar = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatAdminList = useSelector((state) => state.chatAdminList);
    const { chats } = chatAdminList || { chats: [] };
    const unreadCount = chats ? chats.reduce((acc, chat) => acc + (chat.unreadCount > 0 ? 1 : 0), 0) : 0;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAdminChats());
        }
    }, [dispatch, userInfo]);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <span>Admin Panel</span>
            </div>

            {/* User Profile Section */}
            <div className="sidebar-profile px-3 py-4 mb-2 text-center border-bottom border-light border-opacity-10">
                <div className="avatar mb-2 mx-auto">
                    <img
                        src={userInfo && userInfo.image ? (userInfo.image.startsWith('http') ? userInfo.image : `${process.env.REACT_APP_API_URL || ''}${userInfo.image}`) : `https://ui-avatars.com/api/?name=${userInfo ? userInfo.name : 'Admin'}&background=random`}
                        alt="Admin"
                        className="rounded-circle border border-2 border-success p-1"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                </div>
                <h6 className="text-white mb-0 fw-bold">{userInfo ? userInfo.name : 'Admin'}</h6>
                <small className="text-success"><span className="d-inline-block rounded-circle bg-success me-1" style={{ width: '8px', height: '8px' }}></span>Online</small>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiHome /> <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiBox /> <span>Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiShoppingBag /> <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiUsers /> <span>Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/blogs" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiFileText /> <span>Blogs</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiMessageSquare /> <span>Support Chat</span>
                            {unreadCount > 0 && <span className="badge bg-danger rounded-pill ms-2" style={{ fontSize: '10px' }}>{unreadCount}</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FiMessageSquare /> <span>Enquiries</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="sidebar-link" onClick={logoutHandler} style={{ cursor: 'pointer' }}>
                    <FiLogOut /> <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
