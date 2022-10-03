import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: data.item._id,
      name: data.item.name,
      image: data.item.image,
      price: data.item.price,
      countInStock: data.item.countInStock,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};