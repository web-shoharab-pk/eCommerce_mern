import callApi from "../API/axios";
import {
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS
} from "./../constants/productConstants";


export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {

  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST
    });
    let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`

    if (category) {
      link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`
    }

    const { data } = await callApi.get(link);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error?.response?.data.error,
    });
  }
};


// new product
export const createProduct = (productData) => async (dispatch) => {

  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST
    });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await callApi.post(`/admin/product/new`, productData, config);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error.response)
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response?.data.error,
    });
  }
};


// update product
export const updateProduct = (id, productData) => async (dispatch) => {

  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST
    });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await callApi.put(`/admin/product/${id}`, productData, config);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log("error", error.response)
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response?.data.error,
    });
  }
};


// GET ALL PRODUCTS FOR ADMIN 
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST
    });

    const { data } = await callApi.get('/admin/products');
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error?.response?.data.error,
    });
  }
}

export const getProductDetails = (id) => async (dispatch) => {

  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST
    });
    const { data } = await callApi.get(`/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {

    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data.error,
    });
  }
};


// Delete Product
export const deleteProduct = (id) => async (dispatch) => {

  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST
    });

    const { data } = await callApi.delete(`/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {

    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response?.data.error,
    });
  }
};

// new review
export const newReview = (reviewData) => async (dispatch) => {

  try {
    dispatch({
      type: NEW_REVIEW_REQUEST
    });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await callApi.put(`/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {

    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response?.data.error,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
}