import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemsToCart } from '../../actions/cartAction';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import LoaderTwo from './../Loader/LoaderTwo';
import './ProductDetail.css';
import ReviewCard from './ReviewCard.js';

const ProductDetail = ({ match }) => {

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const [open, setOpen] = useState(false);

    const alert = useAlert();
    const { id } = useParams()
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector((state) => state.productDetails);

    const { success, error: reviewError } = useSelector(state => state.newReview)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Review Submit Success!");
            dispatch({ type: NEW_REVIEW_RESET })
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, error, reviewError, success]);


    const [quantity, setQuantity] = useState(1);

    const decreseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty)
    }

    const increaseQuantity = () => {
        if (product.stock <= quantity) return alert.info("Maximum stock added, You can't add more!");
        const qty = quantity + 1;
        setQuantity(qty)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart")
    }

    const submitReviewToggle = () => {
        setOpen(!open);
    }

    const submitReview = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm))
        submitReviewToggle()
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
                                    <Rating name="read-only" style={{color: 'tomato', fontSize: '2rem'}} value={product.rating} readOnly  precision={0.5} />
                                        <span style={{color: 'tomato', fontSize: '1rem'}}>({product.numOfReviews} Reviews)</span>
                                    </div>
                                    <div className="detailsBlock-3">
                                        <h1>৳{product.price}</h1>
                                        <div className="detailsBlock-3-1">
                                            <div className="detailsBlock-3-1-1">
                                                <button onClick={decreseQuantity}>-</button>
                                                <input readOnly type="number" value={quantity} />
                                                <button onClick={increaseQuantity}>+</button>
                                            </div>
                                            <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add To Cart</button>
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
                                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                                </div>
                            </div>

                            <h3 className="reviewsHeading">REVIEWS</h3>

                            <Dialog
                                area-labelledby="simple-dialog-title"
                                open={open}
                                onClose={submitReviewToggle}
                            >
                                <DialogTitle>Submit Review</DialogTitle>
                                <DialogContent className="submitDialog">
                                    <Rating onChange={({ target }) => setRating(target.value)} value={rating} precision={0.5} />

                                    <textArea
                                        className="submitDialogTextArea"
                                        cols="30"
                                        rows="5"
                                        onChange={({ target }) => setComment(target.value)}

                                    >

                                    </textArea>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={submitReviewToggle} color="secondary">Calcel</Button>
                                    <Button onClick={submitReview} color="success">Submit</Button>
                                </DialogActions>

                            </Dialog>

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