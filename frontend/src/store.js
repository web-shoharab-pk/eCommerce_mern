import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { contactReducer } from "./reducers/contactReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer, paymentUpdate } from "./reducers/orderReducer";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from "./reducers/productReducer";
import { profileReducer, userReducer, forgotPasswordReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    contact: contactReducer,
    newProduct: newProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    payment: paymentUpdate
});

let initialState = {
    cart : {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;