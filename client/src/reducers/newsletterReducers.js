import {
    NEWSLETTER_LIST_REQUEST,
    NEWSLETTER_LIST_SUCCESS,
    NEWSLETTER_LIST_FAIL,
    NEWSLETTER_DELETE_REQUEST,
    NEWSLETTER_DELETE_SUCCESS,
    NEWSLETTER_DELETE_FAIL,
} from '../constants/newsletterConstants';

export const newsletterListReducer = (state = { subscribers: [] }, action) => {
    switch (action.type) {
        case NEWSLETTER_LIST_REQUEST:
            return { loading: true, subscribers: [] };
        case NEWSLETTER_LIST_SUCCESS:
            return { loading: false, subscribers: action.payload };
        case NEWSLETTER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const newsletterDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case NEWSLETTER_DELETE_REQUEST:
            return { loading: true };
        case NEWSLETTER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case NEWSLETTER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
