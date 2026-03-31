import {
    TESTIMONIAL_LIST_REQUEST,
    TESTIMONIAL_LIST_SUCCESS,
    TESTIMONIAL_LIST_FAIL,
} from '../constants/testimonialConstants';

export const testimonialListReducer = (state = { testimonials: [] }, action) => {
    switch (action.type) {
        case TESTIMONIAL_LIST_REQUEST:
            return { loading: true, testimonials: [] };
        case TESTIMONIAL_LIST_SUCCESS:
            return { loading: false, testimonials: action.payload };
        case TESTIMONIAL_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
