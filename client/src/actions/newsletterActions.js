import axios from 'axios';
import {
    NEWSLETTER_LIST_REQUEST,
    NEWSLETTER_LIST_SUCCESS,
    NEWSLETTER_LIST_FAIL,
    NEWSLETTER_DELETE_REQUEST,
    NEWSLETTER_DELETE_SUCCESS,
    NEWSLETTER_DELETE_FAIL,
} from '../constants/newsletterConstants';

export const listNewsletterSubscribers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWSLETTER_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get('/api/newsletter', config);

        dispatch({
            type: NEWSLETTER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEWSLETTER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteNewsletterSubscriber = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: NEWSLETTER_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/newsletter/${id}`, config);

        dispatch({ type: NEWSLETTER_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: NEWSLETTER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
