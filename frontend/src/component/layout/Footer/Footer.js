import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import appStore from './../../../images/Appstore.png';
import logo from './../../../images/logo.png';
import playStore from './../../../images/playstore.png';
import './Footer.css';

const Footer = () => {
    return (
        <Fragment>

            <footer className="footer-link">
                <div>
                    <div>
                        <ul>
                            <li>
                              <img src={logo} alt="" />
                            </li>
                            <li>
                                <Link to="/">Home page</Link>
                            </li>
                            <li>
                                <Link to="/products">Product page</Link>
                            </li>
                            <li>
                                <Link to="/search">Search page</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign up</Link>
                            </li> 
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <ul>
                        <li>ECOMMERCE</li>
                            <li>
                                <Link to="/">link</Link>
                            </li>
                            <li>
                                <Link to="/">link</Link>
                            </li>
                            <li>
                                <Link to="/">link</Link>
                            </li>
                            <li>
                                <Link to="/">link</Link>
                            </li>
                            <li>
                                <Link to="/">LinkedIn</Link>
                            </li>
                            <li>
                                <Link to="/">Instagram</Link>
                            </li>
                            <li>
                                <Link to="/">Instagram</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <ul>
                        <li>About us</li>
                            <li>
                                <Link to="/">Facebook</Link>
                            </li>
                            <li>
                                <Link to="/">Github</Link>
                            </li>
                            <li>
                                <Link to="/">LinkedIn</Link>
                            </li>
                            <li>
                                <Link to="/">Instagram</Link>
                            </li>
                            <li>
                                <Link to="/">LinkedIn</Link>
                            </li>
                            <li>
                                <Link to="/">Instagram</Link>
                            </li>
                            <li>
                                <Link to="/">Instagram</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <ul>
                        <li>DOWNLOAD OUR APP</li>
                            <li>
                                <Link to="/">Download App for Android and IOS mobile phone</Link>
                            </li>
                            <li>
                                <Link to="/">Our Apps & Developer</Link>
                            </li>
                            <li>
                                <Link to="/"><img src={playStore} alt="" /></Link>
                            </li>
                            <li>
                                <Link to="/"><img src={appStore} alt="" /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </Fragment>

    );
};

export default Footer;