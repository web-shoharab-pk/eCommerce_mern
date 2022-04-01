import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(state => state.forgotPassword);
    const { user } = useSelector(state => state.user);
    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);

        dispatch(forgotPassword(myForm));

    }


    useEffect(() => {
        if (user) { 
            navigate('/account');
        }
        if (message) {
            alert.success(message);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [error, dispatch, message, alert, user, navigate])
    return (
        <Fragment>
            <MetaData title="Forgot Password" />
            {
                loading ? <LoaderTwo />
                    :
                    <Fragment>
                        <div className="forgotPasswordContainer">
                            <div className="forgotPasswordBox">
                                <h2 className="forgotPasswordHeading">Forgot Password</h2>
                                <form
                                    onSubmit={forgotPasswordSubmit}
                                    className="forgotPasswordForm"
                                    action=""
                                    encType="multipart/form-data">
                                    <div className="forgotPasswordEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={({ target }) => setEmail(target.value)}
                                            required placeholder="Email" id="" />
                                    </div>

                                    <input
                                        type="submit" value="Send" className="forgotPasswordBtn"
                                        disabled={loading ? true : false}
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>

    );
};

export default ForgotPassword;