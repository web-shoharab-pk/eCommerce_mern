import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography } from '@mui/material';
import {
    CardCvcElement,
    CardExpiryElement, CardNumberElement, useElements, useStripe
} from '@stripe/react-stripe-js';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';
import callApi from '../../API/axios';
import CheckoutStep from '../Cart/CheckoutStep';
import MetaData from '../layout/MetaData';
import './Payment.css';


const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements()
    const alert = useAlert();
    const dispatch = useDispatch();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const { error } = useSelector(state => state.newOrder);

    const [isDisabled, setIsDisabled] = useState(false);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.itemsPrice,
        shippingCharges: orderInfo.shippingCharges,
        taxPrice: orderInfo.taxPrice,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsDisabled(true)

        const paymentData = {
            amount: Math.round(orderInfo.totalPrice * 100)
        }
        try {

            const { data } = await callApi.post('/payment/process', paymentData);

            const client_secret = data.client_secret;

            console.log("client_secret", client_secret)

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postCode,
                            country: shippingInfo.country
                        }
                    }
                }
            });

            console.log("result", result);
            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo ={
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    order.paymentIntent = result.paymentIntent;

                    dispatch(createOrder(order));
                    navigate('/order/success');
                } else {
                    alert.error("There was some issue while processing payment")
                }
            }

        } catch (err) {
            setIsDisabled(false)
            console.log("err", err)
            alert.error(err.response.data.message)
        }
    }


    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        } 
    }, [alert, dispatch, error])

    return (
        <Fragment><br /><br />
            <MetaData title="Payment" />
            <CheckoutStep activeStep={2} />
            <div className="paymentContainer">
                <form action="" onSubmit={submitHandler} className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay -  ৳ ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        disabled={isDisabled}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;