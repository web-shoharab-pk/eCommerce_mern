import React, { Fragment, useEffect } from 'react';
import { useAlert } from "react-alert";
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import MetaData from '../layout/MetaData';
import LoaderTwo from './../Loader/LoaderTwo';
import './ProductDetail.css';
import ReviewCard from './ReviewCard.js';

const ProductDetail = ({ match }) => {
    const alert = useAlert();
    const { id } = useParams()
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    console.log(product)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, error]);

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true
    }

    return (
        <Fragment>
            {
                loading ? <LoaderTwo />
                    :
                    (
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
                                <div className="last-child">
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
                                            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
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

                            <h3 className="reviewsHeading">REVIEWS</h3>

                            {
                                product.reviews && product.reviews[0] ? (
                                    <div className="reviews">
                                        {
                                            product.reviews &&
                                            product.reviews.map((review) => <ReviewCard review={review} />)
                                        }
                                    </div>
                                )
                                    :
                                    (
                                        <p className="noReviews">No Reviews Yet</p>
                                    )

                            }

                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default ProductDetail;