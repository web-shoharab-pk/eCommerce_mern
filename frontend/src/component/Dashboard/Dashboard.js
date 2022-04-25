import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <Fragment>
            <MetaData title="Admin Dashboard" />
            <div className="dashboard">
                <Sidebar />
                <div className="dashboardContainer">

                    <Typography component="h1">Dashboard</Typography>

                    <div className="dashboardSummary">
                        <div>
                            <p>Total Amount <br /> $1000</p>
                        </div>
                    </div>

                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>50</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>10</p>
                        </Link>

                        <Link to="/admin/user">
                            <p>Users</p>
                            <p>100</p>
                        </Link>
                    </div>

                </div>
            </div>

        </Fragment>
    );
};

export default Dashboard;