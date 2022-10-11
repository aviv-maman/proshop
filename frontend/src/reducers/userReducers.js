import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_FAILURE:
      return { isLoading: false, error: action.payload, isSuccessful: false };
    case USER_LOGIN_REQUEST:
      return { isLoading: true, error: false };
    case USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccessful: true };
    case USER_LOGOUT:
      return {};
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: false };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, userInfo: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload, isSuccessful: false };
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true, error: false };
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, userInfo: action.payload, isSuccessful: true };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_FAILURE:
      return { isLoading: false, error: action.payload, isSuccessful: false };
    case USER_REGISTER_REQUEST:
      return { isLoading: true, error: false };
    case USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccessful: true };
    default:
      return state;
  }
};
