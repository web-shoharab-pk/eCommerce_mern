import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import LoaderTwo from '../Loader/LoaderTwo';
import './../Home/Home.css';
import Header from './../layout/Header/header';
import './Products.css';
import Pagination from "react-js-pagination";
// import "bootstrap/less/bootstrap.less"
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const categories = [
    "Laptop",
    "TV",
    "Mobile",
    "Watch",
    "temp"
]


const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("")


    const dispatch = useDispatch()
    const { products, loading, error, productsCount, resultPerPage, } = useSelector(state => state.products)
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (e, newPrice) => {  
            setPrice(newPrice) 
    }

    useEffect(() => {
        setTimeout(() => {
        dispatch(getProduct(keyword, currentPage, price, category))
        }, 500);
    }, [dispatch, keyword, currentPage, price, category]);
    return (
        <Fragment>
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

                        </div>
                        {
                           (( resultPerPage < productsCount ) && (products.length !== 0)) && 
                            (
                                <div className="paginationBox">
                                <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                                />
                            </div>
                            )
                        }
                    </Fragment>
            }
        </Fragment>
    );
};

export default Products;