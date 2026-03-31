import axios from 'axios';
import {
    TESTIMONIAL_LIST_REQUEST,
    TESTIMONIAL_LIST_SUCCESS,
    TESTIMONIAL_LIST_FAIL,
} from '../constants/testimonialConstants';

export const listTestimonials = () => async (dispatch) => {
    try {
        dispatch({ type: TESTIMONIAL_LIST_REQUEST });

        const { data } = await axios.get('/api/testimonials');

        dispatch({
            type: TESTIMONIAL_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TESTIMONIAL_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
