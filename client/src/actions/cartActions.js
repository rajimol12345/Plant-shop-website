import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const validQty = Number(qty) > 0 ? Number(qty) : 1;
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: validQty,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    // SYNC WITH DB IF LOGGED IN
    const { userLogin: { userInfo } } = getState();
    if (userInfo) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post('/api/cart', { productId: id, qty: validQty }, config);
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    // SYNC WITH DB IF LOGGED IN
    const { userLogin: { userInfo } } = getState();
    if (userInfo) {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.delete(`/api/cart/${id}`, config);
    }
};

export const getCart = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        if (userInfo) {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get('/api/cart', config);

            // Sync database items to Redux and LocalStorage
            if (data && data.cartItems) {
                data.cartItems.forEach(item => {
                    dispatch({
                        type: CART_ADD_ITEM,
                        payload: item
                    });
                });
                localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
            }
        }
    } catch (error) {
        console.error('Error fetching cart');
    }
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
