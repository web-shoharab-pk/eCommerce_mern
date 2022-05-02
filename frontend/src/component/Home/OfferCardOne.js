import { Container } from '@mui/material';
import React, { Fragment } from 'react';
import './OfferCardOne.css';

const OfferCardOne = ({ data }) => {
    return (
        <Fragment>
            <Container>
                <div className="grid offer-card">
                    <div>
                    <img className="offer-image" src={data.img} alt="offer" />
                    </div>
                    <div>
                    <h1 className="body-title">{data.title}</h1>
                    <p className="body-content">{data.description}</p>
                    </div>
                    <button className="btn btn-discount">{data.btnText}</button>
                </div>
            </Container>
        </Fragment>
    );
};

export default OfferCardOne;