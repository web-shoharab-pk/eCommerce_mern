import React from 'react';
import playStore from './../../../images/playstore.png';
import appStore from './../../../images/Appstore.png';
import './Footer.css';
import logo from './../../../images/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="" />
                <img src={appStore} alt="" />
            </div>
            <div className="logo-section"> 
            <img src={logo} alt="" />
            <div>
                <ul>
                    <li>
                        <Link to="/">link option</Link>
                    </li>
                    <li>
                        <Link to="/">link option</Link>
                    </li>
                    <li>
                        <Link to="/">link option</Link>
                    </li>
                    <li>
                        <Link to="/">link option</Link>
                    </li>
                </ul>
            </div>
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights {new Date().getFullYear()} &copy; Shoharab Pk</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://facebook.com">Facebook</a>
                <a href="https://facebook.com">GitHub</a>
                <a href="https://facebook.com">LinkedIn</a>
            </div>
        </footer>
    );
};

export default Footer;