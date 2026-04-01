import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { FaComments, FaTimes, FaPaperPlane, FaTrash, FaPen } from 'react-icons/fa';
import { getChatHistory, receiveMessage, markAsRead, openChatWithMessage, closeChat, deleteMessage, editMessage } from '../actions/chatActions';
import Loader from './Loader';
import './ChatWidget.css';

const ChatWidget = () => {
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

    const chatHistory = useSelector((state) => state.chatHistory);
    const { messages, loading, chatId, unreadCount, isOpen, draftMessage } = chatHistory;

    useEffect(() => {
        if (draftMessage) {
            setMessage(draftMessage);
        }
    }, [draftMessage]);

    useEffect(() => {
        if (userInfo && !userInfo.isAdmin) {
            const newSocket = io(`${process.env.REACT_APP_API_URL}`);
            setSocket(newSocket);

            newSocket.emit('join_chat', userInfo._id);

            newSocket.on('receive_message', (msg) => {
                dispatch(receiveMessage(msg));
            });

            newSocket.on('display_typing', (data) => {
                if (data.senderRole === 'admin') {
                    setIsTyping(data.typing);
                }
            });

            dispatch(getChatHistory(userInfo._id));

            return () => newSocket.close();
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (isOpen && chatId && unreadCount > 0) {
            dispatch(markAsRead(chatId));
        }
    }, [isOpen, chatId, unreadCount, dispatch]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            socket.emit('send_message', {
                chatId,
                userId: userInfo._id,
                senderId: userInfo._id,
                senderModel: 'User',
                senderRole: 'customer',
                content: message,
            });
            setMessage('');
            socket.emit('typing', { userId: userInfo._id, typing: false, senderRole: 'customer' });
        }
    };

    const handleInput = (e) => {
        setMessage(e.target.value);
        if (socket) {
            socket.emit('typing', { userId: userInfo._id, typing: e.target.value.length > 0, senderRole: 'customer' });
        }
    };

    // Context Menu Handlers
    const handleContextMenu = (e, msg) => {
        e.preventDefault();
        // Allow customer to edit/delete ONLY their own messages
        if (msg.senderRole === 'customer') {
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

    const handleDeleteMessage = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (contextMenu.message) {
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
        if (contextMenu.message) {
            setEditingMessageId(contextMenu.message._id);
            setEditContent(contextMenu.message.content);
        }
        closeContextMenu();
    };

    const submitEdit = (e) => {
        e.stopPropagation(); // Prevent bubble click
        if (editingMessageId && editContent.trim()) {
            dispatch(editMessage(chatId, editingMessageId, editContent));
            setEditingMessageId(null);
            setEditContent('');
        }
    };

    const cancelEdit = (e) => {
        e.stopPropagation();
        setEditingMessageId(null);
        setEditContent('');
    };

    if (!userInfo || userInfo.isAdmin) return null;

    const toggleOpen = () => {
        if (isOpen) {
            dispatch(closeChat());
        } else {
            dispatch(openChatWithMessage(''));
        }
    };

    return (
        <div className="chat-widget-container">
            <button className="chat-toggle-btn" onClick={toggleOpen}>
                {isOpen ? <FaTimes size={24} /> : (
                    <>
                        <FaComments size={26} />
                        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
                    </>
                )}
            </button>

            {isOpen && (
                <div className="chat-window shadow-lg">
                    <div className="chat-header">
                        <div className="support-avatar">
                            <FaComments size={20} />
                        </div>
                        <div className="header-info">
                            <h6 className="mb-0">Customer Care</h6>
                            <small>
                                <span className="online-dot"></span>
                                We're online to help
                            </small>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {loading ? (
                            <div className="text-center py-5"><Loader /></div>
                        ) : (
                            <>
                                <div className="system-msg text-center mb-2">
                                    <small className="text-muted small">Welcome to Greenova Support</small>
                                </div>
                                {messages.filter(m => m._id !== undoToast.messageId).map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`message-bubble ${msg.senderRole === 'customer' ? 'sent' : 'received'}`}
                                        onContextMenu={(e) => handleContextMenu(e, msg)}
                                    >
                                        {editingMessageId === msg._id ? (
                                            <div className="edit-area">
                                                <input
                                                    type="text"
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus
                                                    className="edit-input"
                                                />
                                                <div className="edit-actions">
                                                    <button onClick={cancelEdit} className="btn-cancel">✕</button>
                                                    <button onClick={submitEdit} className="btn-save">✓</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="bubble-content">{msg.content}</div>
                                                <small className="msg-time">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                                            </>
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="message-bubble received typing">
                                        <div className="typing-dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef}></div>
                            </>
                        )}
                    </div>

                    <form className="chat-input-area" onSubmit={submitHandler}>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                value={message}
                                onChange={handleInput}
                                onBlur={() => socket && socket.emit('typing', { userId: userInfo._id, typing: false, senderRole: 'customer' })}
                            />
                        </div>
                        <button type="submit" className="btn-send-msg" disabled={!message.trim()}>
                            <FaPaperPlane size={20} />
                        </button>
                    </form>
                </div>
            )}

            {/* Context Menu */}
            {contextMenu.visible && (
                <div
                    className="widget-context-menu"
                    style={{ top: contextMenu.y - 50, left: contextMenu.x - 20 }}
                >
                    <div className="menu-item" onClick={handleEditMessage}>
                        <FaPen className="icon" /> Edit
                    </div>
                    <div className="menu-item delete" onClick={(e) => handleDeleteMessage(e)}>
                        <FaTrash className="icon" /> Delete
                    </div>
                </div>
            )}

            {/* Undo Toast */}
            {undoToast.visible && (
                <div className="widget-undo-toast">
                    <span>Message deleted</span>
                    <button className="widget-btn-undo" onClick={handleUndoDelete}>UNDO</button>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
