import { Rating } from '@mui/material';
import React from 'react';
import profileImg from './../../images/Profile.png';

const ReviewCard = ({ review }) => {

    const options = {
        readOnly: true,
        fontSize: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        precision: 0.5
    }
    return (
        <div className="reviewCard">
            <img src={profileImg} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;