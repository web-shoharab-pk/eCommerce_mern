import callApi from "../API/axios";
import { CLEAR_ERRORS, CONTACT_MAIL_SEND_FAIL, CONTACT_MAIL_SEND_REQUEST, CONTACT_MAIL_SEND_SUCCESS } from "../constants/contactConstant";

// SEND CONTACT MAIL    
export const sendContactMail = (details) => async (dispatch) => {
    try {
        dispatch({ type: CONTACT_MAIL_SEND_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await callApi.post(`/email/contact`, details, config)

        dispatch({ type: CONTACT_MAIL_SEND_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: CONTACT_MAIL_SEND_FAIL, payload: error.response.data.error })
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS
    });
  }