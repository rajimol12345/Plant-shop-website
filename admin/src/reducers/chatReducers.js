import {
    CHAT_HISTORY_REQUEST,
    CHAT_HISTORY_SUCCESS,
    CHAT_HISTORY_FAIL,
    CHAT_ADMIN_LIST_REQUEST,
    CHAT_ADMIN_LIST_SUCCESS,
    CHAT_ADMIN_LIST_FAIL,
    CHAT_MESSAGE_RECEIVED,
    CHAT_MARK_READ_SUCCESS,
    CHAT_OPEN_WITH_MESSAGE,
    CHAT_CLOSE,
    CHAT_MESSAGE_DELETE,
    CHAT_MESSAGE_UPDATE,
} from '../constants/chatConstants';

export const chatHistoryReducer = (state = { messages: [], unreadCount: 0, isOpen: false, draftMessage: '' }, action) => {
    switch (action.type) {
        case CHAT_HISTORY_REQUEST:
            return { ...state, loading: true };
        case CHAT_HISTORY_SUCCESS:
            return {
                loading: false,
                messages: action.payload.messages,
                chatId: action.payload._id,
                user: action.payload.user,
                unreadCount: action.payload.unreadCount || 0
            };
        case CHAT_HISTORY_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CHAT_MESSAGE_RECEIVED:
            const exists = state.messages.find(m => m._id === action.payload._id);
            if (exists) return state;
            return {
                ...state,
                messages: [...state.messages, action.payload],
                unreadCount: state.unreadCount + (action.payload.senderRole !== (action.payload.isAdmin ? 'admin' : 'customer') ? 1 : 0)
            };
        case CHAT_MARK_READ_SUCCESS:
            return { ...state, unreadCount: 0 };
        case CHAT_MESSAGE_DELETE:
            return {
                ...state,
                messages: state.messages.filter(msg => msg._id !== action.payload.messageId)
            };
        case CHAT_MESSAGE_UPDATE:
            return {
                ...state,
                messages: state.messages.map(msg =>
                    msg._id === action.payload.messageId
                        ? { ...msg, content: action.payload.content }
                        : msg
                )
            };
        case CHAT_OPEN_WITH_MESSAGE:
            return { ...state, isOpen: true, draftMessage: action.payload };
        case CHAT_CLOSE:
            return { ...state, isOpen: false, draftMessage: '' };
        default:
            return state;
    }
};

export const chatAdminListReducer = (state = { chats: [] }, action) => {
    switch (action.type) {
        case CHAT_ADMIN_LIST_REQUEST:
            return { loading: true, chats: [] };
        case CHAT_ADMIN_LIST_SUCCESS:
            return { loading: false, chats: action.payload };
        case CHAT_ADMIN_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
