import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import { clearErrors, getProduct } from './../../actions/productAction';
import './Home.css';
import ProductCard from './ProductCard.js';
import Header from './../layout/Header/header';
 

const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products)
    console.log("products", products, productsCount, loading, error,)
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors())
          }
        dispatch(getProduct())
    }, [dispatch, alert, error])
 
    return (
        <Fragment>
            <Header />
            <MetaData title="ECOMMERCE" />
            <div className="banner pt-5">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>
            {
                loading ?
                <LoaderTwo />
                    :
                    <div className="container" id="container">
                        {
                            products &&
                            products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        }
                    </div>
            }

        </Fragment>
    );
};

export default Home;