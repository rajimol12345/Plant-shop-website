import axios from 'axios';
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

export const getChatHistory = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_HISTORY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/chat/${userId}`, config);

        dispatch({
            type: CHAT_HISTORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_HISTORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listAdminChats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CHAT_ADMIN_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/chat/admin/all', config);

        dispatch({
            type: CHAT_ADMIN_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHAT_ADMIN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const receiveMessage = (message) => (dispatch) => {
    dispatch({
        type: CHAT_MESSAGE_RECEIVED,
        payload: message,
    });
};

export const markAsRead = (chatId) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(`/api/chat/read/${chatId}`, {}, config);

        dispatch({ type: CHAT_MARK_READ_SUCCESS });
    } catch (error) {
        console.error('Mark as read failed:', error);
    }
};

export const replyToChat = (chatData) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/chat/reply', chatData, config);

        dispatch({
            type: CHAT_HISTORY_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.error('Reply failed:', error);
    }
};

export const openChatWithMessage = (message) => (dispatch) => {
    dispatch({
        type: CHAT_OPEN_WITH_MESSAGE,
        payload: message,
    });
};

export const closeChat = () => (dispatch) => {
    dispatch({
        type: CHAT_CLOSE,
    });
};

export const deleteMessage = (chatId, messageId) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/chat/${chatId}/message/${messageId}`, config);

        dispatch({
            type: CHAT_MESSAGE_DELETE,
            payload: { chatId, messageId },
        });
    } catch (error) {
        console.error('Delete message failed:', error);
    }
};

export const editMessage = (chatId, messageId, content) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(`/api/chat/${chatId}/message/${messageId}`, { content }, config);

        dispatch({
            type: CHAT_MESSAGE_UPDATE,
            payload: { chatId, messageId, content },
        });
    } catch (error) {
        console.error('Edit message failed:', error);
    }
};
