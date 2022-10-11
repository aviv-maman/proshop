import axios from 'axios';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: 'ORDER_CREATE_REQUEST',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/orders`, order, config);

    dispatch({
      type: 'ORDER_CREATE_SUCCESS',
      payload: data,
    });
    dispatch({
      type: 'CART_CLEAR_ITEMS',
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'ORDER_CREATE_FAIL',
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'ORDER_DETAILS_REQUEST',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/orders/${id}`, config);

    dispatch({
      type: 'ORDER_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'ORDER_DETAILS_FAILURE',
      payload: message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: 'ORDER_PAY_REQUEST',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER}/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: 'ORDER_PAY_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'ORDER_PAY_FAILURE',
      payload: message,
    });
  }
};
