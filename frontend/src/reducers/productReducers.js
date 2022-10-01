import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { isLoading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { isLoading: false, products: action.payload.items };
    case PRODUCT_LIST_FAILURE:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { isLoading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload.item };
    case PRODUCT_DETAILS_FAILURE:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
