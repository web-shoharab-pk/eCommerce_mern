import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import { Button } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, updateProduct } from '../../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../../constants/productConstants';
import MetaData from '../../layout/MetaData';
import Sidebar from '../Sidebar/Sidebar';
import './UpdateProduct.css';

const UpdateProduct = () => {

    const dispatch = useDispatch();

    const {id} = useParams();

    const alert = useAlert();

    const navigate = useNavigate();

    const { error, product } = useSelector((state) => state.productDetails);

    const {
      loading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.product);



    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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

        if(product && product._id !== id) {
            dispatch(getProductDetails(id))
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            navigate('/admin/products');
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [alert, dispatch, error, id, navigate, product, isUpdated, updateError]);


    const updateProductFormSubmit = (e) => {
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

        dispatch(updateProduct(id, productData));

    }

    const updateProductImageChange = (e) => {

        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
            <MetaData title="update product" />
            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">

                    <form
                        onSubmit={updateProductFormSubmit}
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
                                <option value={category}>{category}</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div id="createProductFormFile">
                            <input
                                // required
                                multiple
                                type="file" name="avatar" accept="image/*"
                                onChange={updateProductImageChange}
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button id="createProductBtn" disabled={loading} type="submit" value="Create">Update</Button>
                    </form>
                </div>
            </div>

        </Fragment>
    );
};

export default UpdateProduct;