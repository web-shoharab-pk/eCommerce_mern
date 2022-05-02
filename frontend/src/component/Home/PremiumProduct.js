import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './PremiumProduct.css';

const PremiumProduct = ({ data }) => {
    return (
        <Fragment>

            <div>
                <div className="premium-product-heading">
                    <h1>Premium Product</h1>
                    <p>Premium products are typically defined as products that cost 20% more than the average category price..</p>
                </div>
            </div>

            <div className="premium-product">
                {
                    data?.map((art) => (
                        <div className="premium-product-card">
                            <img src={art?.img} alt="" />
                            <span>{art.brand}</span>
                            <h3>{art?.name}</h3>
                            <p>{art?.description}</p>
                            <Link to={art.link}>Shop now</Link>
                        </div>
                    ))
                }

            </div>
        </Fragment>
    );
};


export default PremiumProduct;