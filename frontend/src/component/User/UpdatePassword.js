import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword } from '../../actions/userAction';
import LoaderTwo from '../Loader/LoaderTwo';
import { loadUser } from './../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from './../../constants/userConstats'; 
import './UpdatePassword.css';
import MetaData from '../layout/MetaData';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const UpdatePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [seen, setSeen] = useState(false);
    const [newSeen, setNewSeen] = useState(false);
    const [confirmSeen, setConfirmSeen] = useState(false);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }
    }, [error, dispatch, alert, navigate, isUpdated])



    return (
        <Fragment>
        <MetaData title="Change Password"/>
        {
            !user ? <LoaderTwo />
                :
                <Fragment>
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Change Password</h2>
                            <form
                                onSubmit={updatePasswordSubmit}
                                className="updatePasswordForm" 
                                action=""
                                encType="multipart/form-data">
                                   <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type={seen ? 'text' : 'password'}
                                            name=""
                                            value={oldPassword}
                                            onChange={({ target }) => setOldPassword(target.value)}
                                            required
                                             placeholder="Old Password"  />
                                             {
                                                 seen ? <RemoveRedEyeIcon onClick={() => setSeen(!seen)} /> : <VisibilityOffIcon onClick={() => setSeen(!seen)} />
                                             }  
                                    </div>
                                    <div className="loginPassword">
                                        <LockIcon />
                                        <input
                                            type={newSeen ? 'text' : 'password'}
                                            name=""
                                            value={newPassword}
                                            onChange={({ target }) => setNewPassword(target.value)}
                                            required
                                             placeholder="New Password"  />
                                                 {
                                                newSeen? <RemoveRedEyeIcon onClick={() => setNewSeen(!newSeen)} /> : <VisibilityOffIcon onClick={() => setNewSeen(!newSeen)} />
                                             } 
                                    </div>
                                    <div className="loginPassword">
                                        <VpnKeyIcon />
                                        <input
                                              type={confirmSeen ? 'text' : 'password'}
                                            name=""
                                            value={confirmPassword}
                                            onChange={({ target }) => setConfirmPassword(target.value)}
                                            required
                                             placeholder="Confirm Password" />
                                                {
                                                confirmSeen? <RemoveRedEyeIcon onClick={() => setConfirmSeen(!confirmSeen)} /> : <VisibilityOffIcon onClick={() => setConfirmSeen(!confirmSeen)} />
                                             }
                                    </div>
                                <input
                                    type="submit" value="Change" className="updatePasswordBtn"
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

export default UpdatePassword;