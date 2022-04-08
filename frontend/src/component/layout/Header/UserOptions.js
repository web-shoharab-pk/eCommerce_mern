import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import './Header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserOptions = ({ user }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const alert = useAlert()
    const {cartItems} = useSelector(state => state.cart)

    const redirectRoute = (route) => {
        navigate(route)
    }

    const logoutUser = () => {
        dispatch(logout());
        return alert.success("Logout Successfully!")
    }

    const actions = [

        { icon: <PersonIcon />, name: 'Profile', func: () => redirectRoute("/account") },
        { icon: <ShoppingCartIcon style={{color: cartItems.length ? 'tomato':'unset'}} />, name:`Cart(${cartItems.length})`, func: () => redirectRoute("/cart") },
        { icon: <ListAltIcon />, name: 'Orders', func: () => redirectRoute("/orders") },
        { icon: <ExitToAppIcon />, name: 'Logout', func: () => logoutUser() },
    ];
    if (user.role === 'admin') {
        actions.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: () => redirectRoute("/dashboard") })
    }

    return (
        <Fragment>
            <Box
            //  sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}
            >
                <Backdrop open={open} style={{zIndex: '10'}} />
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    direction='down'
                    className="speedDial"
                    icon={<img
                        src={user.avatar.url}
                        className="speedDialIcon"
                        alt="Profile"
                    />}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => action.func()}
                            tooltipOpen
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Fragment>
    );
};

export default UserOptions;