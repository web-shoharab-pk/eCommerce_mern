import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadUser } from '../../../actions/userAction';
import store from '../../../store';
import logo from './../../../images/ecommerce.png';
import './Navbar.css';
import NavDrawer from './NavDrawer';

const Navbar = () => {

    const { isAuthenticated, loading } = useSelector(state => state.user);

    const [state, setState] = React.useState({});

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, left: open });
    };

    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
        <nav>
            <div className="navbar">
                <div>
                    <div className="navbar-logo">
                        <Link to="/">
                            <img className="logo" src={logo} alt="Ecommerce" />
                        </Link>
                    </div>
                </div>
                <div>
                    <ul className="nav-list">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products">Products</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart">Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        {
                            (isAuthenticated === true && loading === false) ?
                                <li>
                                    <NavLink to="/account">Account</NavLink>
                                </li>
                                :
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                        }

                    </ul>
                    <div className="icon-menu">
                        <IconButton onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <br /><br />
            <NavDrawer state={state} toggleDrawer={toggleDrawer} />
        </nav>
    );
};

export default Navbar;