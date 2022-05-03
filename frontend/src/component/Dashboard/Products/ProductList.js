import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import './ProductList.css'
import Sidebar from '../Sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid'; 
import { getAdminProduct } from '../../../actions/productAction';

const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, products, loading } = useSelector(state => state.products);


    const columns = [

        {
            field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5
        },
        {
            field: "name", headerName: "Name", minWidth: 350, flex: 1
        },
        {
            field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3, type: "number"
        },
        {
            field: "price", headerName: "Price", minWidth: 250, flex: 0.5, type: "number"
        },

        {
            field: "actions", headerName: "Actions", minWidth: 150, flex: 0.3, type: "number", sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>
                        <Button>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]

    const rows = [];
    
    products && products.forEach((product) => {
        rows.push({
            id: product._id,
            stock: product.stock,
            price: product.price,
            name: product.name,
        })
    })

    useEffect(() => {
        if (error) {
            alert.error(error)
        }

        dispatch(getAdminProduct())
    }, [error, alert, dispatch])

    return (
        <Fragment>
            <MetaData title="Product List -Admin" />

            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 className="productListHeading">All Product List</h1>

                    <DataGrid
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    className="productListTable"
                    autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;