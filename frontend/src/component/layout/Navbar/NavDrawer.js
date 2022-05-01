import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import './Navbar.css';


const NavDrawer = ({ toggleDrawer, state }) => {

    const list = () => (
        <Box
            sx={{ width: 250 }}

            onKeyDown={toggleDrawer(false)}
        >
            <Divider />
            <IconButton onClick={toggleDrawer(false)} sx={{ marginLeft: '10rem' }}>
                <ChevronLeftIcon />
            </IconButton>
            <Divider />
            <List className="drawer-list">
                <NavLink to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </NavLink>
                <NavLink to="/products">
                    <ListItem button>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItem>
                </NavLink>
                <NavLink to="/search">
                    <ListItem button>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItem>
                </NavLink>
                <NavLink to="/cart">
                    <ListItem button>
                        <ListItemIcon>
                            <AddShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cart" />
                    </ListItem>
                </NavLink>
                <NavLink to="/account">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>
                </NavLink>
                <NavLink to="/login">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                </NavLink>
            </List>
        </Box>
    );


    return (
        <Fragment>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]} 
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list("left")}
            </SwipeableDrawer>
        </Fragment>
    );
};

export default NavDrawer;