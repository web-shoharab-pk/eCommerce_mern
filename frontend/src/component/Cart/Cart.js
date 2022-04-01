import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import './Cart.css';
import CartItemCard from './CartItemCard';

const Cart = () => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
 
    const increaseQuantity = (id, quantity, stock) => {

        const newQty = quantity + 1;
        if(stock <= quantity) {
            return alert.error("Added Maximum Quantity");
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity) {
            return alert.error("Manimum Quantity is 1");
        }
        dispatch(addItemsToCart(id, newQty))
    }
    return (
        <Fragment>
            <br /><br />
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div>

                {
                    cartItems && cartItems.map((item) => (
                        <div className="cartContainer" key={item.product}>
                            <CartItemCard item={item} deleteFromCart={removeItemsFromCart} />
                            <div className="cartInput">
                                <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                <input type="number" readOnly={true} value={item.quantity} />
                                <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                            </div>
                            <p className="cartSubtotal">
                                {`৳${item.price * item.quantity}`}
                            </p>
                        </div>
                    ))
                }



                <div className="cartGrossProfit">
                    <div>

                    </div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Total:</p>
                        <p>{`৳200`}</p>
                    </div>
                    <div>

                    </div>
                    <div className="checkoutBtn">
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Cart;