import { Typography } from '@mui/material';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderAction';
import MetaData from '../layout/MetaData';
import CheckoutStep from './CheckoutStep';
import './ConfirmOrder.css';

const ConfirmOrder = () => {


    const dispatch = useDispatch();

    const { shippingInfo, cartItems } = useSelector(state => state.cart);

    const { user } = useSelector(state => state.user);

    const itemsPrice = cartItems?.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const shippingCharges = itemsPrice > 1000 ? 0 : 200;

    const taxPrice = itemsPrice * 0.15;

    const totalPrice = itemsPrice + shippingCharges + taxPrice;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postCode}, ${shippingInfo.country}`

    const proceedToPayment = () => {

        const data = {
            itemsPrice,
            shippingCharges,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        const orderData = {
            shippingInfo,
            orderItems: cartItems,
            itemsPrice,
            shippingCharges,
            taxPrice,
            totalPrice,
        }

        const backData = dispatch(createOrder(orderData))

        console.log("backData", backData)

        // navigate('/order/payment')
    }

    // useEffect(() => {
    //     if (order?.url) {
    //         window.location.replace(order?.url)
    //     }

    // }, [order.url])
    return (
        <Fragment>
            <br /><br />
            <MetaData title="Confirm Order" />
            <CheckoutStep activeStep={1} />

            <div className="confirmOrderPage">
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user?.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phone}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items</Typography>
                        <div className="confirmCartItemsContainer">
                            {
                                cartItems && cartItems.map((item) => (
                                    <div className="" key={item.product}>
                                        <img src={item.image} alt="" />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        <span>
                                            {item.quantity} X ৳{item.price} = {" "}
                                            <b>৳{item.quantity * item.price}</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/*  */}

                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>৳ {itemsPrice}</span>
                            </div>
                            <div>
                                <p>Shipping charges:</p>
                                <span>৳ {shippingCharges}</span>
                            </div>
                            <div>
                                <p>TAX:</p>
                                <span>৳ {taxPrice}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>৳ {totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;