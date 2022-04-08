import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Payment from './Payment';

const PaymentElements = ({stripeApiKey}) => {
    const stripePromise = loadStripe(stripeApiKey);
    return (
        <Elements stripe={stripePromise}>
            <Payment />
        </Elements>
    );
};

export default PaymentElements;