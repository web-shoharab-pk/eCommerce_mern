import React, { Fragment, useEffect } from 'react';
import './ProductDetail.css';
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import MetaData from '../layout/MetaData';

const ProductDetail = ({match}) => {
 
    const {id} = useParams() 
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    console.log(product)
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch,id]);

    const options = {

    }
 
    return (
        <Fragment>
             <MetaData title={`${product.name} -- ECOMMERCE`} />
            <div className="productDetails">
                <div> 
                    <Carousel>
                        {
                            product?.images && 
                            product?.images.map((item, i) => (
                                <img
                                className="carouselImage"
                                 src={item?.url}
                                 key={item?.url} 
                                 alt={`${i} Slide`}
                                  />
                            ))
                        }
                    </Carousel>
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product ID: {product._id}</p>

                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>৳{product.price}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input type="number" value="1" />
                                <button>+</button>
                            </div>
                            <button>Add To Cart</button>
                        </div>
                        <p>
                            status: {"  "}   
                            <b className={product.stock < 1 ? "redColor" : "greenColor" }>
                                {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description: <p>{product.description}</p>
                    </div>
                    <button className="submitReview">Submit Review</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductDetail;