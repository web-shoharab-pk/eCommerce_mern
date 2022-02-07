import React, { Fragment } from 'react';
import {CgMouse} from "react-icons/cg";
import './Home.css';
import Product from './Product.js'

const product = {
    name: "T-Shirt",
    images: [{url: "https://www.sunspel.com/media/catalog/product/cache/03b12fdd50976902097ccadd8ce5e14e/m/t/mtsh0001-bkaa-1_6.jpg"}],
    price: "1220 BDT",
    _id: "shoharab"
}

const Home = () => {
    return (
        <Fragment>
            
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

            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

            </div>
        </Fragment>
    );
};

export default Home;