import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, ListGroup, Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaUserCircle, FaComments } from 'react-icons/fa';
import { listAdminChats, getChatHistory, receiveMessage, markAsRead, replyToChat } from '../actions/chatActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './AdminChatScreen.css';

const AdminChatScreen = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatAdminList = useSelector((state) => state.chatAdminList);
    const { loading: loadingList, error: errorList, chats } = chatAdminList;

    const chatHistory = useSelector((state) => state.chatHistory);
    const { loading: loadingHistory, error: errorHistory, messages, chatId, unreadCount } = chatHistory;

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
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
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

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
    };

    return (
        <div className="admin-chat-layout">
            <Container fluid className="admin-chat-main-container p-0">
                <Row className="g-0 h-100">
                    {/* Left Sidebar: Conversations List */}
                    <Col md={4} lg={3} className="chat-sidebar-wrapper">
                        <div className="sidebar-header d-flex align-items-center justify-content-between p-4 border-bottom bg-white">
                            <h4 className="serif-font mb-0">Inbox</h4>
                            <span className="badge bg-light text-dark rounded-pill px-3 py-2 border">
                                {chats ? chats.length : 0} active
                            </span>
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
                                                active={selectedUser && selectedUser._id === chat.user._id}
                                                onClick={() => setSelectedUser(chat.user)}
                                                className={`convo-item border-0 p-4 ${chat.unreadCount > 0 ? 'unread' : ''}`}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className={`avatar-circle me-3 bg-theme-light d-flex align-items-center justify-content-center text-theme-green fw-bold ${selectedUser && selectedUser._id === chat.user._id ? 'border-light text-white' : ''}`} style={{ overflow: 'hidden' }}>
                                                        {chat.user.image ? (
                                                            <img src={`${process.env.REACT_APP_API_URL}${chat.user.image}`} alt={chat.user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            getInitials(chat.user.name)
                                                        )}
                                                    </div>
                                                    <div className="flex-grow-1 overflow-hidden">
                                                        <div className="d-flex justify-content-between align-items-baseline mb-1">
                                                            <h6 className="mb-0 text-truncate fw-bold">{chat.user.name}</h6>
                                                            {chat.messages.length > 0 && (
                                                                <small className="text-muted timer">
                                                                    {new Date(chat.messages[chat.messages.length - 1].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </small>
                                                            )}
                                                        </div>
                                                        <p className="mb-0 text-muted text-truncate small">
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

                    {/* Right Pane: Message Feed */}
                    <Col md={8} lg={9} className="chat-viewport d-flex flex-column">
                        {selectedUser ? (
                            <>
                                <div className="chat-active-header d-flex align-items-center p-4 border-bottom bg-white shadow-sm z-index-10">
                                    <div className="avatar-circle md me-3 bg-theme-green text-white d-flex align-items-center justify-content-center fw-bold" style={{ overflow: 'hidden' }}>
                                        {selectedUser.image ? (
                                            <img src={`${process.env.REACT_APP_API_URL}${selectedUser.image}`} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            getInitials(selectedUser.name)
                                        )}
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="mb-0 serif-font fw-bold">{selectedUser.name}</h5>
                                        <div className="d-flex align-items-center">
                                            <span className="online-status-dot me-2"></span>
                                            <small className="text-muted">{selectedUser.email}</small>
                                        </div>
                                    </div>
                                    <div className="header-actions">
                                        <Button variant="link" className="text-muted p-2" style={{ overflow: 'hidden', width: '40px', height: '40px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {selectedUser.image ? (
                                                <img src={`${process.env.REACT_APP_API_URL}${selectedUser.image}`} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <FaUserCircle size={20} />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="messages-scroller flex-grow-1 p-4 bg-light-soft">
                                    {loadingHistory ? (
                                        <div className="d-flex justify-content-center align-items-center h-100"><Loader /></div>
                                    ) : (
                                        <div className="bubbles-container d-flex flex-column">
                                            {messages.length === 0 && (
                                                <div className="text-center p-5 text-muted">No message history available</div>
                                            )}
                                            {messages.map((msg, index) => (
                                                <div key={index} className={`message-group ${msg.senderRole === 'admin' ? 'is-sender' : 'is-receiver'}`}>
                                                    {msg.senderRole !== 'admin' && (
                                                        <div className="avatar-circle sm me-2 bg-theme-light d-flex align-items-center justify-content-center text-theme-green fw-bold" style={{ width: '35px', height: '35px', minWidth: '35px', overflow: 'hidden', borderRadius: '50%' }}>
                                                            {selectedUser.image ? (
                                                                <img src={`${process.env.REACT_APP_API_URL}${selectedUser.image}`} alt={selectedUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            ) : (
                                                                getInitials(selectedUser.name)
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="message-bubble-v2">
                                                        <div className="bubble-body">{msg.content}</div>
                                                        <div className="bubble-footer d-flex align-items-center justify-content-end mt-1">
                                                            <small className="time-stamp">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                                                            {msg.senderRole === 'admin' && (
                                                                <span className={`status-icon ms-2 ${msg.read ? 'text-primary' : 'text-muted'}`}>
                                                                    {msg.read ? '✓✓' : '✓'}
                                                                </span>
                                                            )}
                                                        </div>
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
                                        </div>
                                    )}
                                </div>

                                <div className="chat-composer-area p-4 bg-white border-top">
                                    <Form onSubmit={submitHandler}>
                                        <div className="composer-input-wrapper d-flex align-items-center gap-3">
                                            <Form.Control
                                                type="text"
                                                className="modern-composer border-0 p-3 shadow-none"
                                                placeholder="Type your response to customer..."
                                                value={message}
                                                onChange={handleInput}
                                                onBlur={() => socket && selectedUser && socket.emit('typing', { userId: selectedUser._id, typing: false, senderRole: 'admin' })}
                                            />
                                            <Button
                                                type="submit"
                                                className="btn-send-professional d-flex align-items-center justify-content-center p-3"
                                                disabled={!message.trim()}
                                            >
                                                <FaPaperPlane />
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            <div className="empty-chat-viewport d-flex align-items-center justify-content-center">
                                <div className="text-center p-5">
                                    <div className="illustration-wrapper mb-4 opacity-10">
                                        <FaComments size={120} />
                                    </div>
                                    <h4 className="serif-font fw-bold mb-2">Select a Conversation</h4>
                                    <p className="text-muted mx-auto" style={{ maxWidth: '300px' }}>
                                        Choose a customer from the sidebar to view their full inquiry and message history.
                                    </p>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminChatScreen;
