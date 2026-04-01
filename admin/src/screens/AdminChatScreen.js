import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, ListGroup, Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaUserCircle, FaComments, FaTrash, FaPen } from 'react-icons/fa';
import { listAdminChats, getChatHistory, receiveMessage, markAsRead, replyToChat, deleteMessage, editMessage } from '../actions/chatActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './AdminChatScreen.css';

const AdminChatScreen = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);

    // Context Menu State
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, message: null });
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const scrollRef = useRef();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatAdminList = useSelector((state) => state.chatAdminList);
    const { loading: loadingList, error: errorList, chats } = chatAdminList;

    const chatHistory = useSelector((state) => state.chatHistory);
    const { loading: loadingHistory, messages, chatId, unreadCount } = chatHistory;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            const newSocket = io(`${process.env.REACT_APP_API_URL}`);
            setSocket(newSocket);

            newSocket.on('receive_message', (msg) => {
                dispatch(receiveMessage(msg));
            });

            newSocket.on('new_message_alert', () => {
                dispatch(listAdminChats());
            });

            newSocket.on('display_typing', (data) => {
                if (selectedUser && data.userId === selectedUser._id && data.senderRole === 'customer') {
                    setIsTyping(data.typing);
                }
            });

            dispatch(listAdminChats());

            return () => newSocket.close();
        }
    }, [dispatch, userInfo, selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            dispatch(getChatHistory(selectedUser._id));
            if (socket) {
                socket.emit('join_chat', selectedUser._id);
            }
        }
    }, [dispatch, selectedUser, socket]);

    useEffect(() => {
        if (selectedUser && chatId && unreadCount > 0) {
            dispatch(markAsRead(chatId));
        }
    }, [selectedUser, chatId, unreadCount, dispatch]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    }, [messages, isTyping]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (message.trim() && selectedUser) {
            dispatch(replyToChat({
                chatId,
                userId: selectedUser._id,
                content: message,
            }));
            setMessage('');
            if (socket) {
                socket.emit('typing', { userId: selectedUser._id, typing: false, senderRole: 'admin' });
            }
        }
    };

    const handleInput = (e) => {
        setMessage(e.target.value);
        if (socket && selectedUser) {
            socket.emit('typing', { userId: selectedUser._id, typing: e.target.value.length > 0, senderRole: 'admin' });
        }
    };

    // Context Menu Handlers
    const handleContextMenu = (e, msg) => {
        e.preventDefault();
        // Only allow admin to edit/delete their own messages, or delete customer messages
        if (msg.senderRole === 'admin' || userInfo.isAdmin) {
            setContextMenu({
                visible: true,
                x: e.pageX,
                y: e.pageY,
                message: msg
            });
        }
    };

    const closeContextMenu = () => {
        setContextMenu({ ...contextMenu, visible: false });
    };

    useEffect(() => {
        const handleClick = () => closeContextMenu();
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [contextMenu]);

    // Undo State
    const [undoToast, setUndoToast] = useState({ visible: false, messageId: null, timerId: null });

    // ...

    const handleDeleteMessage = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (contextMenu.message) {
            // Optimistic hidden state logic would go here if we were filtering locally
            // But we will just show Toast and DELAY the dispatch

            const messageId = contextMenu.message._id;

            // Set timer for actual deletion
            const timerId = setTimeout(() => {
                dispatch(deleteMessage(chatId, messageId));
                setUndoToast({ visible: false, messageId: null, timerId: null });
            }, 3000); // 3 seconds to undo

            setUndoToast({ visible: true, messageId, timerId });
        }
        closeContextMenu();
    };

    const handleUndoDelete = () => {
        if (undoToast.timerId) {
            clearTimeout(undoToast.timerId);
            setUndoToast({ visible: false, messageId: null, timerId: null });
        }
    };

    const handleEditMessage = () => {
        if (contextMenu.message && contextMenu.message.senderRole === 'admin') {
            setEditingMessageId(contextMenu.message._id);
            setEditContent(contextMenu.message.content);
        }
        closeContextMenu();
    };

    const submitEdit = () => {
        if (editingMessageId && editContent.trim()) {
            dispatch(editMessage(chatId, editingMessageId, editContent));
            setEditingMessageId(null);
            setEditContent('');
        }
    };

    const cancelEdit = () => {
        setEditingMessageId(null);
        setEditContent('');
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
    };

    return (
        <div className="admin-chat-layout">
            <Container fluid className="admin-chat-main-container p-0">
                <Row className="g-0 h-100">
                    {/* Sidebar */}
                    <Col md={4} lg={3} className="chat-sidebar-wrapper">
                        <div className="sidebar-header border-bottom">
                            <div className="d-flex align-items-center justify-content-between">
                                <h4 className="serif-font mb-0">Inbox</h4>
                                <span className="badge bg-light text-dark rounded-pill px-3 py-2 border">
                                    {chats ? chats.length : 0} active
                                </span>
                            </div>
                        </div>
                        <div className="conversations-list-container">
                            {loadingList ? (
                                <div className="text-center p-5"><Loader /></div>
                            ) : errorList ? (
                                <Message variant="danger">{errorList}</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {!chats || chats.length === 0 ? (
                                        <div className="text-center p-5 text-muted small">No active conversations</div>
                                    ) : (
                                        chats.filter(c => c.user).map((chat) => (
                                            <ListGroup.Item
                                                key={chat._id}
                                                onClick={() => setSelectedUser(chat.user)}
                                                className={`convo-item p-3 ${selectedUser && selectedUser._id === chat.user._id ? 'active' : ''} ${chat.unreadCount > 0 ? 'unread' : ''}`}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className={`avatar-circle md me-3 d-flex align-items-center justify-content-center fw-bold ${selectedUser && selectedUser._id === chat.user._id ? 'bg-white text-theme-green' : 'bg-theme-green text-white'}`} style={{ overflow: 'hidden' }}>
                                                        {chat.user.image ? (
                                                            <img src={`${process.env.REACT_APP_API_URL}${chat.user.image}`} alt={chat.user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            getInitials(chat.user.name)
                                                        )}
                                                    </div>
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                                            <h6 className="mb-0 text-truncate fw-bold" style={{ fontSize: '0.95rem' }}>{chat.user.name}</h6>
                                                            {chat.messages.length > 0 && (
                                                                <small className="text-muted timer" style={{ fontSize: '0.7rem' }}>
                                                                    {new Date(chat.messages[chat.messages.length - 1].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </small>
                                                            )}
                                                        </div>
                                                        <p className="mb-0 text-muted text-truncate small" style={{ fontSize: '0.8rem' }}>
                                                            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'Starting inquiry...'}
                                                        </p>
                                                    </div>
                                                    {chat.unreadCount > 0 && (
                                                        <span className="unread-dot bg-danger ms-2"></span>
                                                    )}
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                    )}
                                </ListGroup>
                            )}
                        </div>
                    </Col>

                    {/* Chat Area */}
                    <Col md={8} lg={9} className="chat-viewport">
                        {selectedUser ? (
                            <>
                                <div className="chat-active-header">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar-circle md me-3 bg-theme-green text-white d-flex align-items-center justify-content-center fw-bold" style={{ overflow: 'hidden' }}>
                                            {selectedUser.image ? (
                                                <img src={`${process.env.REACT_APP_API_URL}${selectedUser.image}`} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                getInitials(selectedUser.name)
                                            )}
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="mb-0 serif-font fw-bold">{selectedUser.name}</h5>
                                            <div className="d-flex align-items-center mt-1">
                                                <span className="online-status-dot me-2"></span>
                                                <small className="text-muted">{selectedUser.email}</small>
                                            </div>
                                        </div>
                                        <div className="header-actions">
                                            <Button variant="link" className="text-muted p-2"><FaUserCircle size={22} /></Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="messages-scroller">
                                    {loadingHistory ? (
                                        <div className="d-flex justify-content-center align-items-center h-100"><Loader /></div>
                                    ) : (
                                        <>
                                            {messages.length === 0 && (
                                                <div className="text-center p-5 text-muted">No message history available</div>
                                            )}
                                            {messages.filter(m => m._id !== undoToast.messageId).map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`message-group ${msg.senderRole === 'admin' ? 'is-sender' : 'is-receiver'}`}
                                                    onContextMenu={(e) => handleContextMenu(e, msg)}
                                                >
                                                    {msg.senderRole !== 'admin' && (
                                                        <div className="message-avatar me-2" style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                                                            {selectedUser.image ? (
                                                                <img src={`${process.env.REACT_APP_API_URL}${selectedUser.image}`} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            ) : (
                                                                <div className="bg-theme-green text-white d-flex align-items-center justify-content-center h-100 w-100" style={{ fontSize: '10px' }}>
                                                                    {getInitials(selectedUser.name)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="message-bubble-v2">
                                                        {editingMessageId === msg._id ? (
                                                            <div className="edit-message-area">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={2}
                                                                    value={editContent}
                                                                    onChange={(e) => setEditContent(e.target.value)}
                                                                    className="mb-2"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                                <div className="d-flex justify-content-end gap-2">
                                                                    <Button size="sm" variant="secondary" onClick={cancelEdit}>Cancel</Button>
                                                                    <Button size="sm" variant="success" onClick={submitEdit}>Save</Button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div className="bubble-body">{msg.content}</div>
                                                                <div className="bubble-footer d-flex align-items-center justify-content-between">
                                                                    <small className="time-stamp">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                                                                    {msg.senderRole === 'admin' && (
                                                                        <span className={`status-icon ms-2 ${msg.read ? 'text-success' : 'text-muted'}`}>
                                                                            {msg.read ? 'Read' : 'Sent'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {isTyping && (
                                                <div className="message-group is-receiver">
                                                    <div className="typing-indicator-v2">
                                                        <div className="dot"></div>
                                                        <div className="dot"></div>
                                                        <div className="dot"></div>
                                                    </div>
                                                </div>
                                            )}
                                            <div ref={scrollRef}></div>
                                        </>
                                    )}
                                </div>

                                <div className="chat-composer-area">
                                    <Form onSubmit={submitHandler}>
                                        <div className="composer-input-wrapper">
                                            <Form.Control
                                                type="text"
                                                className="modern-composer shadow-none"
                                                placeholder="Type your response..."
                                                value={message}
                                                onChange={handleInput}
                                                onBlur={() => socket && selectedUser && socket.emit('typing', { userId: selectedUser._id, typing: false, senderRole: 'admin' })}
                                            />
                                            <Button
                                                type="submit"
                                                className="btn-send-professional"
                                                disabled={!message.trim()}
                                            >
                                                <span>Send</span>
                                                <FaPaperPlane size={14} />
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            <div className="empty-chat-viewport d-flex align-items-center justify-content-center">
                                <div className="text-center p-5">
                                    <div className="illustration-wrapper mb-4" style={{ color: 'var(--chat-primary)', opacity: 0.1 }}>
                                        <FaComments size={100} />
                                    </div>
                                    <h4 className="serif-font fw-bold mb-3">Welcome to Support</h4>
                                    <p className="text-muted mx-auto" style={{ maxWidth: '350px' }}>
                                        Select a customer conversation from the list to start chatting.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            {/* Context Menu */}
            {contextMenu.visible && (
                <div
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <div className="context-menu-item" onClick={(e) => handleDeleteMessage(e)}>
                        <FaTrash className="me-2 text-danger" /> Delete
                    </div>
                    {contextMenu.message && contextMenu.message.senderRole === 'admin' && (
                        <div className="context-menu-item" onClick={handleEditMessage}>
                            <FaPen className="me-2 text-info" /> Edit
                        </div>
                    )}
                </div>
            )}
            {/* Undo Toast */}
            {undoToast.visible && (
                <div className="undo-toast">
                    <span>Message deleted</span>
                    <button className="btn-undo" onClick={handleUndoDelete}>Undo</button>
                </div>
            )}
        </div>
    );
};

export default AdminChatScreen;
