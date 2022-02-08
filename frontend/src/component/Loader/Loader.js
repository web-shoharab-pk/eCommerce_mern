import React, { Fragment } from 'react';
import './Loader.css';
import image from './../../images/loading.gif';

const Loader = () => {
    return (
        <Fragment>
                <div className="loaderDiv">
                    <img src={image} alt="" />
                </div>
        </Fragment>
    );
};

export default Loader;