import callApi from "../API/axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS } from "../constants/orderConstants"
import { CLEAR_ERRORS } from "../constants/productConstants";

// CREATE ORDER 
export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST});

        const {data} = await callApi.post('/order/new', order);

         dispatch({ type: CREATE_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ 
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};


// CREATE ORDER 
export const myOrders = () => async (dispatch, getState) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST});

        const {data} = await callApi.get('/order/me');

         dispatch({ type: MY_ORDERS_SUCCESS, payload: data.order});
    } catch (error) {
        dispatch({ 
            type: MY_ORDERS_FAIL,
            payload: error.response?.data?.message
        })
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS
    });
  }
