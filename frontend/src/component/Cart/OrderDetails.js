import { Typography } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderAction';
import { clearErrors } from '../../actions/productAction';
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import './OrderDetails.css';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { id } = useParams();

    const { order, error, loading } = useSelector(state => state.orderDetails);

    const address = `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.postCode}, ${order?.shippingInfo.country}`

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id))

    }, [alert, dispatch, error, id])
    return (
        <Fragment>
            <MetaData title="order details" />
            <br /><br />
            {
                loading ? <LoaderTwo />
                    :
                    <div className="order_details_page">
                        <div className="order_details_shipping_area">
                            <Typography className="orderId">Order #{order && order._id}</Typography>
                            <Typography>Shipping Info</Typography>
                            <div className="order_details_shipping_area_box">
                                <div>
                                    <p>Name:</p>
                                    <span>{order?.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{order?.shippingInfo.phone}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>{address}</span>
                                </div>
                            </div> 
                            <div className="order_details_items">
                                <Typography>Your Cart Items</Typography>
                                <div className="order_details_items_container">
                                    {
                                        order?.orderItems && order?.orderItems?.map((item) => (
                                            <div className="" key={item?.product}>
                                                <img src={item?.image} alt="" />
                                                <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                                                <span>
                                                    {item?.quantity} X ৳{item?.price} = {" "}
                                                    <b>৳{item?.quantity * item?.price}</b>
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
                                        <span>৳ {order?.itemsPrice}</span>
                                    </div>
                                    <div>
                                        <p>Shipping charges:</p>
                                        <span>৳ {order?.shippingCharges}</span>
                                    </div>
                                    <div>
                                        <p>TAX:</p>
                                        <span>৳ {order?.taxPrice}</span>
                                    </div>
                                </div>
                                <div className="orderSummaryTotal">
                                    <p>
                                        <b>Total:</b>
                                    </p>
                                    <span>৳ {order?.totalPrice}</span>
                                </div>
                                {/* <button onClick={proceedToPayment}>Proceed To Payment</button> */}

                                <Typography>Payment</Typography>
                                <div className="order-payment-info">
                                    <div>
                                    <p>Payment Status:</p>
                                        <p
                                         className={
                                            order?.paymentInfo?.status === "succeeded" ? 'greenColor' : 'redColor'
                                        }>
                                            {order?.paymentInfo?.status === "succeeded" ? "PAID" : "UNPAID"}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Amount</p>
                                        <span>{order?.totalPrice}</span>
                                    </div>

                                    <div>
                                        <p>Order Status</p>
                                        <p className={
                                            order?.orderStatus === "Delivered" ? 'greenColor' : 'redColor'
                                        }>
                                            {order?.orderStatus}
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
            }

        </Fragment>
    );
};

export default OrderDetails;