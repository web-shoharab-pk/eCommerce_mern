import { Typography } from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './Dashboard.css';
import Sidebar from './Sidebar/Sidebar';
// import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';


const Dashboard = () => {

    const {products} = useSelector( state => state.products);

    const dispatch = useDispatch();

    let outOfstock = 0;

    products && products.forEach(item => {
        if(item.stock === 0) {
            outOfstock = outOfstock + 1; 
        }
    })

    console.log("outOfstock", outOfstock)

    // const lineStates = {
    //     labels: ["Initial Amount", "Total Amount"],
    //     datasets: [
    //       {
    //         label: "Total Amount",
    //         data: [0, 100000], 
    //         backgroundColor: ["tomato"],
    //         hoberBackgroundColor: ["rgb(197,72,49)"]
    //       } 
    //     ]
    //   };

    //   const doughnutState = {
    //       labels: ["Out Of Stock", "In Stock"],
    //       datasets: [
    //           {
    //               backgroundColor: ["#00A6B4", "#6800B4"],
    //               hoberBackgroundColor: ["#4b5000", "#35014F"],
    //               data: [outOfstock, products?.length - outOfstock]
    //           }
    //       ]
    //   }

    useEffect(() => {
        dispatch(getAdminProduct())
    }, [dispatch])

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

                    <div className="lineChart">
                    {/* <Line
                     data={lineStates}  
                    /> */}
                    </div>
                    <div className="doughnutChart">
                        
                    {/* <Doughnut
                    data={doughnutState}
                    /> */}
                    </div>


                </div>
            </div>

        </Fragment>
    );
};

export default Dashboard;