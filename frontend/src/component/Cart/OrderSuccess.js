import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updatePaymentStatus } from '../../actions/orderAction';
import './OrderSuccess.css';

const OrderSuccess = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleUpdate = () => {
        dispatch(updatePaymentStatus())

        navigate("/order/me")
    }


    useEffect( () => {
      
        localStorage.setItem("cartItems", [])
    }, [])

    return (
        <Fragment><br /><br /><br />
            <div className="orderSuccess">
                <CheckCircleIcon />
                <Typography>Your Order has been Placed successfully</Typography>
                <Link onClick={handleUpdate} to="#">View Order</Link>
            </div>
        </Fragment>
    );
};

export default OrderSuccess;