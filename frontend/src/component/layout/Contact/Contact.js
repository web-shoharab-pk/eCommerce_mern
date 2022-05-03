import FaceIcon from '@mui/icons-material/Face';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MessageIcon from '@mui/icons-material/Message';
import SubjectIcon from '@mui/icons-material/Subject';
import { Container } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, sendContactMail } from '../../../actions/contactAction';
import LoaderTwo from '../../Loader/LoaderTwo';
import MetaData from '../MetaData';
import contactLogo from './../../../images/sendEmail.jpg';
import './Contact.css';

const Contact = () => {

    const { error, message: response, loading } = useSelector(state => state.contact);

    const alert = useAlert();
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (response) {
            alert.success(response);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [error, dispatch, response, alert])

    const [details, setDetails] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const { name, email, subject, message } = details;

    const contactSubmit = (e) => {
        e.preventDefault();


        dispatch(sendContactMail(details));

        setDetails({
            name: "",
            email: "",
            subject: "",
            message: "",
        })
    }


    const registerDataChange = (e) => {

        setDetails({ ...details, [e.target.name]: e.target.value })

    }

    return (
        <Fragment>
            <MetaData title="Contact us" />
            <h1 id="contact-title">Contact with us</h1>
            <div className="contact">
                <Container>
                    <div className="contact-container">
                        <div>
                            <img src={contactLogo} alt="contact" />
                        </div>
                        {
                            loading ?
                                <LoaderTwo />
                                :
                                <div>
                                    <form onSubmit={contactSubmit} className="contact-form">
                                        <div>
                                            <FaceIcon />
                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={registerDataChange}
                                                required placeholder="Name" />
                                        </div>
                                        <div>
                                            <MailOutlineIcon />
                                            <input
                                                type="email"
                                                name="email"
                                                value={email}
                                                onChange={registerDataChange}
                                                required placeholder="Email" id="" />
                                        </div>
                                        <div>
                                            <SubjectIcon />
                                            <input
                                                name="subject"
                                                value={subject}
                                                onChange={registerDataChange}
                                                required placeholder="Subject" type="text" />
                                        </div>
                                        <div>
                                            <MessageIcon />
                                            <textarea
                                                name="message"
                                                value={message}
                                                onChange={registerDataChange}
                                                required placeholder="Message"
                                                type="text"
                                                cols="40" rows="8">

                                            </textarea>
                                        </div>
                                        <button className="contact-btn" type="submit">Send</button>
                                    </form>
                                </div>
                        }

                    </div>
                </Container>
            </div>
        </Fragment>
    );
};

export default Contact;