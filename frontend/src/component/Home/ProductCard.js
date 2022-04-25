import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt="" />
            <p>{product.name}</p>
            <div>
                <Rating value={product.rating} precision={0.5} readOnly />
                <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
            </div>
            <span>৳ {product.price}</span>
        </Link>
    );
};

export default ProductCard;