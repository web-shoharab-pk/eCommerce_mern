import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationRoundedIcon from '@mui/icons-material/TransferWithinAStationRounded';
import { Country, State } from 'country-state-city';
import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import './Shipping.css';
import CheckoutStep from '../Cart/CheckoutStep';
import {saveShippingInfo} from './../../actions/cartAction';
import {useNavigate} from 'react-router-dom';

const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [postCode, setPostCode] = useState(shippingInfo.postCode);
    const [phone, setPhone] = useState(shippingInfo.phone);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if(phone.length < 11 || phone.length > 14) {
            alert.error('Phone number should be between 11 to 14 characters');
            return;
        }
        dispatch(saveShippingInfo({address, city, state, country, postCode, phone}))
        navigate('/order/confirm')
    }
    return (
        <Fragment><br /><br /> 
            <MetaData title="Shipping Details" />
            <CheckoutStep activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                        action="" className="shippingForm"
                    >
                        <div>
                            <HomeIcon />
                            <input required type="text" placeholder="Address" value={address} onChange={({ target }) => setAddress(target.value)} />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <input required type="text" placeholder="City" value={city} onChange={({ target }) => setCity(target.value)} />
                        </div>
                        <div>
                            <PinDropIcon />
                            <input required type="number" placeholder="Post Code" value={postCode} onChange={({ target }) => setPostCode(target.value)} />
                        </div>
                        <div>
                            <PhoneIcon />
                            <input required type="number" placeholder="Phone Number" value={phone} onChange={({ target }) => setPhone(target.value)} />
                        </div>
                        <div>
                            <PublicIcon />
                            <select required placeholder="Country" value={country} onChange={({ target }) => setCountry(target.value)}>
                                {
                                    Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {
                            country &&
                            <div>
                                <TransferWithinAStationRoundedIcon />
                                <select required placeholder="State" value={state} onChange={({ target }) => setState(target.value)}>
                                {
                                    State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
                            </div>
                        }
                        <input type="submit" value="Continue" className="shippingBtn" disabled={state ? false : true} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;