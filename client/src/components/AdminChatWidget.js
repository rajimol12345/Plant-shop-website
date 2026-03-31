import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { FaComments, FaTimes, FaPaperPlane, FaUserCircle, FaChevronLeft } from 'react-icons/fa';
import { listAdminChats, getChatHistory, receiveMessage, markAsRead, replyToChat } from '../actions/chatActions';
import './AdminChatWidget.css';

const AdminChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef();
    const location = useLocation();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const chatAdminList = useSelector((state) => state.chatAdminList);
    const { loading: loadingList, chats } = chatAdminList;

    const chatHistory = useSelector((state) => state.chatHistory);
    const { messages, loading: loadingHistory, chatId, unreadCount } = chatHistory;

    const totalUnread = chats ? chats.reduce((acc, chat) => acc + (chat.unreadCount || 0), 0) : 0;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            const newSocket = io('http://localhost:5000');
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
    }, [messages, selectedUser]);

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

    if (!userInfo || !userInfo.isAdmin) return null;
    if (location.pathname === '/admin/chat') return null;

    return (
        <div className="admin-chat-widget-container">
            <button className={`admin-chat-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : (
                    <>
                        <FaComments size={24} />
                        {totalUnread > 0 && <span className="admin-unread-badge">{totalUnread}</span>}
                    </>
                )}
            </button>

            {isOpen && (
                <div className="admin-chat-window shadow-lg">
                    <div className="admin-chat-header">
                        {selectedUser ? (
                            <div className="d-flex align-items-center">
                                <button className="back-btn" onClick={() => setSelectedUser(null)}>
                                    <FaChevronLeft />
                                </button>
                                {selectedUser.image ? (
                                    <img
                                        src={`http://localhost:5000${selectedUser.image}`}
                                        alt={selectedUser.name}
                                        className="ms-2 rounded-circle object-fit-cover"
                                        style={{ width: '35px', height: '35px' }}
                                    />
                                ) : (
                                    <FaUserCircle className="ms-2 text-muted" size={35} />
                                )}
                                <div className="ms-2">
                                    <h6 className="mb-0">{selectedUser.name}</h6>
                                    <small>Active Chat</small>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h6 className="mb-0">Support Center</h6>
                                <small>{chats ? chats.length : 0} Active Inquiries</small>
                            </div>
                        )}
                    </div>

                    <div className="admin-chat-body">
                        {!selectedUser ? (
                            <div className="admin-chat-list">
                                {loadingList ? <div className="text-center p-3 small">Loading...</div> : (
                                    chats && chats.length > 0 ? (
                                        chats.filter(c => c.user).map((chat) => (
                                            <div
                                                key={chat._id}
                                                className="admin-chat-item d-flex align-items-center"
                                                onClick={() => setSelectedUser(chat.user)}
                                            >
                                                {chat.user.image ? (
                                                    <img
                                                        src={`http://localhost:5000${chat.user.image}`}
                                                        alt={chat.user.name}
                                                        className="me-2 rounded-circle object-fit-cover"
                                                        style={{ width: '30px', height: '30px' }}
                                                    />
                                                ) : (
                                                    <FaUserCircle className="me-2 text-muted" size={30} />
                                                )}
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <div className="fw-bold small text-truncate">{chat.user.name}</div>
                                                    <small className="text-muted d-block text-truncate">
                                                        {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'No messages'}
                                                    </small>
                                                </div>
                                                {chat.unreadCount > 0 && (
                                                    <span className="badge bg-danger rounded-pill x-small ms-2">{chat.unreadCount}</span>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center p-4 text-muted small">No active chats</div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="admin-chat-view d-flex flex-column h-100">
                                <div className="admin-msg-container p-3 flex-grow-1">
                                    {loadingHistory ? <div className="text-center small">Loading history...</div> : (
                                        <>
                                            {messages.map((msg, index) => (
                                                <div key={index} className={`mini-bubble ${msg.senderRole === 'admin' ? 'sent' : 'received'}`}>
                                                    <div className="bubble-text">{msg.content}</div>
                                                </div>
                                            ))}
                                            {isTyping && (
                                                <div className="mini-bubble received typing-status">
                                                    <div className="dots"><span></span><span></span><span></span></div>
                                                </div>
                                            )}
                                            <div ref={scrollRef}></div>
                                        </>
                                    )}
                                </div>
                                <form className="admin-mini-input p-2 border-top" onSubmit={submitHandler}>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="text"
                                            placeholder="Type reply..."
                                            value={message}
                                            onChange={handleInput}
                                            onBlur={() => socket && selectedUser && socket.emit('typing', { userId: selectedUser._id, typing: false, senderRole: 'admin' })}
                                        />
                                        <button type="submit" className="ms-1" disabled={!message.trim()}>
                                            <FaPaperPlane size={14} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminChatWidget;
