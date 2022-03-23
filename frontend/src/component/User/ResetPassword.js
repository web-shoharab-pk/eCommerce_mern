import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../actions/userAction';
import MetaData from '../layout/MetaData';
import LoaderTwo from '../Loader/LoaderTwo';
import './ResetPassword.css';

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, success, loading } = useSelector(state => state.forgotPassword);
    const { user } = useSelector(state => state.user);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [newSeen, setNewSeen] = useState(false);
    const [confirmSeen, setConfirmSeen] = useState(false);

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (user) { 
            navigate('/account');
        }
        if (success) {
            alert.success("Password Updated Successfully");

            navigate('/account');
        }
    }, [error, dispatch, alert, navigate, success, user])


    return (
        <Fragment>
            <MetaData title="Change Password" />
            {
                false ? <LoaderTwo />
                    :
                    <Fragment>
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox">
                                <h2 className="resetPasswordHeading">Reset Password</h2>
                                <form
                                    onSubmit={resetPasswordSubmit}
                                    className="resetPasswordForm">
                                    <div>
                                        <LockIcon />
                                        <input
                                            type={newSeen ? 'text' : 'password'}
                                            name=""
                                            value={password}
                                            onChange={({ target }) => setPassword(target.value)}
                                            required
                                            placeholder="New Password" />
                                        {
                                            newSeen ? <RemoveRedEyeIcon onClick={() => setNewSeen(!newSeen)} /> : <VisibilityOffIcon onClick={() => setNewSeen(!newSeen)} />
                                        }
                                    </div>
                                    <div>
                                        <VpnKeyIcon />
                                        <input
                                            type={confirmSeen ? 'text' : 'password'}
                                            name=""
                                            value={confirmPassword}
                                            onChange={({ target }) => setConfirmPassword(target.value)}
                                            required
                                            placeholder="Confirm Password" />
                                        {
                                            confirmSeen ? <RemoveRedEyeIcon onClick={() => setConfirmSeen(!confirmSeen)} /> : <VisibilityOffIcon onClick={() => setConfirmSeen(!confirmSeen)} />
                                        }
                                    </div>
                                    <input
                                        type="submit" value="Update" className="resetPasswordBtn"
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

export default ResetPassword;