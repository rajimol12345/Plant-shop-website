import axios from 'axios';
import {
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_UPDATE_STATUS_REQUEST,
    CONTACT_UPDATE_STATUS_SUCCESS,
    CONTACT_UPDATE_STATUS_FAIL,
} from '../constants/contactConstants';

export const listContacts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTACT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/contacts', config);

        dispatch({
            type: CONTACT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteContact = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTACT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/contacts/${id}`, config);

        dispatch({
            type: CONTACT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateContactStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: CONTACT_UPDATE_STATUS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(`/api/contacts/${id}/status`, { status }, config);

        dispatch({
            type: CONTACT_UPDATE_STATUS_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_UPDATE_STATUS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
