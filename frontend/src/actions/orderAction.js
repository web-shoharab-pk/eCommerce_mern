import callApi from "../API/axios";
import {
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDERS_DETAILS_FAIL, ORDERS_DETAILS_REQUEST, ORDERS_DETAILS_SUCCESS, UPDATE_ORDERS_FAIL, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS
} from "../constants/orderConstants";
import { CLEAR_ERRORS } from "../constants/productConstants";

// CREATE ORDER 
export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST });

        const { data } = await callApi.post('/order/new', order);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};


// MY ORDER 
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await callApi.get('/order/me');

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response?.data?.message
        })
    }
};


// UPDATE ORDER 
export const updateOrder = (id, order) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDERS_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } }

        const { data } = await callApi.put(`/admin/order/${id}`, order, config);

        dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};

// DELETE ORDER 
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDERS_REQUEST });

        const { data } = await callApi.delete(`/admin/order/${id}`);

        dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};


// MY ORDER -- ADMIN
export const getAllOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await callApi.get('/admin/orders');

        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response?.data?.message
        })
    }
};


// ORDER DETILS 
export const getOrderDetails = (id) => async (dispatch) => {

    try {

        dispatch({ type: ORDERS_DETAILS_REQUEST });

        const { data } = await callApi.get(`/order/${id}`);

        dispatch({ type: ORDERS_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: ORDERS_DETAILS_FAIL,
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
