import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createProduct } from '../../../actions/productAction';
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar/Sidebar';
import './NewProduct.css';

const NewProduct = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const navigate = useNavigate();

    const { loading, success, error } = useSelector(state => state.newProduct);



    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product Created Successfully");
            navigate('/admin/dashboard');
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [alert, dispatch, error, navigate, success]);


    const creatProductFormSubmit = (e) => {
        e.preventDefault();

        console.log("images", images)

        const productData = {
            name,
            price,
            description,
            category,
            stock,
            images: images
        }

        dispatch(createProduct(productData));

    }

    const createProductImageChange = (e) => {

        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {

                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <Fragment>
            <MetaData title="create product" />
            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">

                    <form
                        onSubmit={creatProductFormSubmit}
                        className="new-product-form" encType="multipart/form-data">

                        <div>
                            <SpellcheckIcon />
                            <input
                                required
                                placeholder='Product Name'
                                type="text"
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input
                                required
                                placeholder='Product Price'
                                type="number"
                                value={price}
                                onChange={({ target }) => setPrice(target.value)}
                            />
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                required
                                placeholder='Stock'
                                type="number"
                                value={stock}
                                onChange={({ target }) => setStock(target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                required
                                placeholder='Description'
                                type="text"
                                value={description}
                                onChange={({ target }) => setDescription(target.value)}
                                rows={3}

                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select
                                required name="" onChange={({ target }) => setCategory(target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id="createProductFormFile">
                            <input
                                required
                                multiple
                                type="file" name="avatar" accept="image/*"
                                onChange={createProductImageChange}
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>


                        <Button id="createProductBtn" disabled={loading} type="submit" value="Create">Create</Button>
                    </form>
                </div>
            </div>

        </Fragment>
    );
};

export default NewProduct;