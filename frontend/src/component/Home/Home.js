import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import { getProduct } from './../../actions/productAction';
import './Home.css';
import Product from './Product.js';
 

const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products)
    console.log("products", products, productsCount, loading, error,)
    useEffect(() => {
        if(error) {
            return alert.error(error)
        }
        dispatch(getProduct())
    }, [dispatch, alert, error])
 
    return (
        <Fragment>

            <MetaData title="ECOMMERCE" />
            <div className="banner">
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
                                <Product key={product._id} product={product} />
                            ))
                        }
                    </div>
            }

        </Fragment>
    );
};

export default Home;