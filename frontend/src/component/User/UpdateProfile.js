import FaceIcon from '@mui/icons-material/Face';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updateProfile } from '../../actions/userAction';
import LoaderTwo from '../Loader/LoaderTwo';
import { loadUser } from './../../actions/userAction';
import { UPDATE_PROFILE_RESET } from './../../constants/userConstats';
import profile from './../../images/Profile.png';
import './UpdateProfile.css';

const UpdateProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);



    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));

    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate('/account');
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [error, dispatch, alert, navigate, isUpdated, user])


    return (
        <Fragment>
            {
                !user ? <LoaderTwo />
                    :
                    <Fragment>
                        <div className="updateProfileContainer">
                            <div className="updateProfileBox">
                                <form
                                    onSubmit={updateProfileSubmit}
                                    // className="signUpForm"
                                    // ref={updateProfileTab}
                                    action=""
                                    encType="multipart/form-data">
                                    <div className="signUpName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={updateProfileDataChange}
                                            id="" />
                                    </div>
                                    <div className="signUpEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={updateProfileDataChange}
                                            required placeholder="Email" id="" />
                                    </div>

                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avater Preview" />
                                        <input
                                            accept='image/*' type="file" name="avatar"
                                            onChange={updateProfileDataChange}
                                            id="" />
                                    </div>

                                    <input
                                        type="submit" value="Update Profile" className="signupBtn"
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

export default UpdateProfile;