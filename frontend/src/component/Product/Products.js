// import "bootstrap/less/bootstrap.less"
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import LoaderTwo from '../Loader/LoaderTwo';
import './../Home/Home.css';
import Header from './../layout/Header/header';
import './Products.css';
import MetaData from '../layout/MetaData';

const categories = [
    "Laptop",
    "TV",
    "Mobile",
    "Watch",
    "temp"
]


const Products = () => {
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0);
    const dispatch = useDispatch()
    const { products, loading, error, productsCount, resultPerPage, } = useSelector(state => state.products)
    const { keyword } = useParams();
 

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        setTimeout(() => {
            dispatch(getProduct(keyword, currentPage, price, category, ratings))
        }, 500);
    }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);
    return (
        <Fragment>
            <MetaData title="Products -- ECOMMERCE" />
            <Header /><br /><br />
            {
                loading ? <LoaderTwo />
                    :
                    <Fragment>
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {
                                products && products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                        {/* {
                            keyword ? */}
                                <div className="filterBox">
                                    <Typography>Price</Typography>
                                    <br />
                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        aria-labelledby='range-slider'
                                        min={0}
                                        max={25000}
                                    />

                                    <Typography>Categories</Typography>
                                    <ul className="categoryBox">
                                        {
                                            categories.map((category) => (
                                                <li
                                                    className="category-link"
                                                    key={category}
                                                    onClick={() => setCategory(category)}
                                                >
                                                    {category}
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    <fieldset>
                                        <legend component="legend">Rating Above</legend>
                                        <Slider
                                            value={ratings}
                                            onChange={(e, newRating) => {
                                                setRatings(newRating);
                                            }}
                                            aria-labelledby="continuous-slider"
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={5}
                                        />
                                    </fieldset>

                                </div>
                                {/* : ''
                        } */}

                        {
                            ((resultPerPage < productsCount) && (products.length !== 0)) &&
                            (
                                <div className="paginationBox"> 
                                      <Pagination onChange={(e) => setCurrentPage(parseInt(e.target.outerText))} count={parseInt(productsCount / 8) + 1} color="secondary" variant="outlined" shape="rounded" />
                                </div>
                            )
                        }
                    </Fragment>
            }
        </Fragment>
    );
};

export default Products;