import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItemsFromCart } from '../../actions/cartAction';
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteFromCart }) => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const addToCartHandler = (id) => {
        dispatch(removeItemsFromCart(id));
        alert.success("Remove From Cart!")
    }

    return (
        <Fragment>
            <div className="cartItemCard">
                <img src={item.image} alt="product" />
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`Price: ৳${item.price}`}</span>
                    <p onClick={() => addToCartHandler(item.product)}>Remove</p>
                </div>
            </div>
        </Fragment>
    );
};

export default CartItemCard;