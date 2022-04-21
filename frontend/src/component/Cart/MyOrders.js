import PreviewIcon from '@mui/icons-material/Preview';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { myOrders } from '../../actions/orderAction';
import { clearErrors } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import './MyOrders.css';

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector(state => state.user);

    const { loading, error, orders } = useSelector(state => state.myOrder);

    const columns = [

        {
            field: "id",
            headerName: "Order Id",
            minWidth: 250,
            flex: .81,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 180,
            flex: .5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Quantity",
            type: "number",
            minWidth: 100,
            flex: .5,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 150,
            flex: .5,
        },
        {
            field: "action",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: .5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <PreviewIcon />
                    </Link>
                )
            }
        },

    ];
    const rows = [];

    orders && orders?.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        dispatch(myOrders())
    }, [alert, dispatch, error])

    return (
        <Fragment>
            <MetaData title={`${user?.name} - Orders`} />
            <br />
            {
                loading ? <LoaderTwo /> :
                    (
                        <div className="myOrderPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                autoHeight
                                className="myOrderTable"
                            />
                            <Typography id="myOrderHeading">{`${user?.name}'s Orders`}</Typography>
                        </div>
                    )
            }
        </Fragment>
    );
};

export default MyOrders;