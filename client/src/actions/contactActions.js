import axios from 'axios';
import {
    CONTACT_CREATE_REQUEST,
    CONTACT_CREATE_SUCCESS,
    CONTACT_CREATE_FAIL,
} from '../constants/contactConstants';

export const createContact = (contactData) => async (dispatch) => {
    try {
        dispatch({
            type: CONTACT_CREATE_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/contacts', contactData, config);

        dispatch({
            type: CONTACT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CONTACT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
