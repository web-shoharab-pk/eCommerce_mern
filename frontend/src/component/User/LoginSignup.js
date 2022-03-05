import FaceIcon from '@mui/icons-material/Face';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, login } from '../../actions/userAction';
import LoaderTwo from '../Loader/LoaderTwo';
import profile from './../../images/Profile.png';
import './LoginSignup.css';

const LoginSignup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const alert = useAlert();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
        console.log("Login Form Submited");
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        console.log("SignUp Form Submited");

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(isAuthenticated) {
            navigate('/account')
        }
    }, [error, dispatch, alert, isAuthenticated, navigate])

    const registerDataChange = (e) => {

        if (e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const switchTabs = (e, tab) => {

        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    return (
        <Fragment>
            {
                loading ? <LoaderTwo />
                    :
                    <Fragment>
                        <div className="LoginSignUpContainer">
                            <div className="LoginSignUpBox">
                                <div className="">
                                    <div className="login_signUp_toggle">
                                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>

                                <form action="" className="loginForm" ref={loginTab} onSubmit={loginSubmit}>

                                    <div className="loginEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            name=""
                                            value={loginEmail}
                                            onChange={({ target }) => setLoginEmail(target.value)}
                                            required placeholder="Email" id="" />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            name=""
                                            value={loginPassword}
                                            onChange={({ target }) => setLoginPassword(target.value)}
                                            required placeholder="Password" id="" />
                                    </div>
                                    <Link to="/password/forgot">Forget Password</Link>
                                    <input
                                        disabled={loading ? true : false}
                                        type="submit" value="Login" className="loginBtn" />
                                </form>
                                <form
                                    onSubmit={registerSubmit}
                                    className="signUpForm"
                                    ref={registerTab}
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
                                            onChange={registerDataChange}
                                            id="" />
                                    </div>
                                    <div className="signUpEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            name=""
                                            value={email}
                                            onChange={registerDataChange}
                                            required placeholder="Email" id="" />
                                    </div>
                                    <div className="signUpPassword">
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            name=""
                                            value={password}
                                            onChange={registerDataChange}
                                            required placeholder="Password" id="" />
                                    </div>
                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avater Preview" />
                                        <input
                                            accept='image/*' type="file" name="avatar"
                                            onChange={registerDataChange}
                                            id="" />
                                    </div>

                                    <input
                                        type="submit" value="Register" className="signupBtn"
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

export default LoginSignup;