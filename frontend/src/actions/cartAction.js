import callApi from "../API/axios";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";

// ADD TO CART
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

        const { data } = await callApi.get(`/product/${id}`);
        dispatch({
          type: ADD_TO_CART,
          payload: {
              product: data.product._id,
              name: data.product.name,
              price: data.product.price,
              image: data.product.images[0].url,
              stock: data.product.stock,
              quantity
            },
        });
   
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// REMOVE TO CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
console.log("Removing")
    dispatch({ type: REMOVE_CART_ITEM, payload: id});
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}