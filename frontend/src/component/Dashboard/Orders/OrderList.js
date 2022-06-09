import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteOrder, getAllOrders } from '../../../actions/orderAction';
import { clearErrors } from '../../../actions/productAction';
import { DELETE_ORDERS_RESET } from '../../../constants/orderConstants';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar/Sidebar';

const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders, loading } = useSelector(state => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector(state => state.order);

    const deleteOrderHandler = async (id) => {
        dispatch(deleteOrder(id))
    };


    const columns = [

        {
            field: "id",
            headerName: "Order Id",
            minWidth: 250,
            flex: .81,
        },
        {
            field: "user",
            headerName: "User Id",
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
            field: "actions", headerName: "Actions", minWidth: 150, flex: 0.3, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]

    const rows = [];

    orders && orders?.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            user: item.user,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            navigate('/admin/orders')
            dispatch({ type: DELETE_ORDERS_RESET })
        }

        dispatch(getAllOrders())
    }, [error, alert, dispatch, deleteError, isDeleted, navigate])

    return (
        <Fragment>
            <MetaData title="All Orders -Admin" />

            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 className="productListHeading">All Orders</h1>

                    <DataGrid
                        loading={loading}
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                        className="myOrderTable"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;