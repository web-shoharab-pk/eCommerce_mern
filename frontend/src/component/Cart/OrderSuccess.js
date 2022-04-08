import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
    return (
        <Fragment><br /><br /><br />
            <div className="orderSuccess">
                <CheckCircleIcon />
                <Typography>Your Order has been Placed successfully</Typography>
                <Link to="/order/ma">View Order</Link>
            </div>
        </Fragment>
    );
};

export default OrderSuccess;