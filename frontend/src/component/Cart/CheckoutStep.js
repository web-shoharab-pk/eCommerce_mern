import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Typography } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { Fragment } from 'react';
import './CheckoutStep.css';

const CheckoutStep = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ]

    const stepStyles = {
        boxSizing: "border-box"
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {
                    steps.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? 'tomato' : 'rgba(0,0,0,0.285)', 
                                }}
                                icon={item.icon}>{item.label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Fragment>
    );
};

export default CheckoutStep;