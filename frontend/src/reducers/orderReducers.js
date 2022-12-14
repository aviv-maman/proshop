export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_REQUEST':
      return {
        loading: true,
        error: false,
      };
    case 'ORDER_CREATE_SUCCESS':
      return {
        loading: false,
        success: true,
        order: action.payload.item,
      };
    case 'ORDER_CREATE_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'ORDER_CREATE_RESET':
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { orderItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'ORDER_DETAILS_SUCCESS':
      return {
        loading: false,
        // success: true,
        order: action.payload.item,
      };
    case 'ORDER_DETAILS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ORDER_PAY_REQUEST':
      return {
        loading: true,
        error: false,
      };
    case 'ORDER_PAY_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'ORDER_PAY_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'ORDER_PAY_RESET':
      return {};
    default:
      return state;
  }
};
