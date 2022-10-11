import axios from 'axios';
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/users/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('userInfo');
};

export const register = (name, email, password, passwordConfirm) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/users/signup`,
      { name, email, password, passwordConfirm },
      config
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/users/${id}`, config);
    dispatch({ type: GET_USER_SUCCESS, payload: data.item });
    localStorage.setItem('userInfo', JSON.stringify(data.item));
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUser = (id, user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER}/api/users/${id}`,
      user,
      config
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.user });
    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
