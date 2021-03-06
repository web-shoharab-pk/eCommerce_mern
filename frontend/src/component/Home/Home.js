import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { CgMouse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import { clearErrors, getProduct } from './../../actions/productAction';
import { offerOneData, offerTwoData, productData1, productData2 } from './data';
import './Home.css';
import OfferCardOne from './OfferCardOne';
import ProductCard from './ProductCard.js';
import PremiumProduct from './PremiumProduct.js';


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
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
            <br />

            <PremiumProduct data={productData1} />

            <OfferCardOne data={offerOneData} />
            <div className="product-section">
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
            
            <br />
            </div>

            <PremiumProduct data={productData2} />

            <OfferCardOne data={offerTwoData} />
        </Fragment>
    );
};

export default Home;