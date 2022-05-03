import { CLEAR_ERRORS, CONTACT_MAIL_SEND_FAIL, CONTACT_MAIL_SEND_REQUEST, CONTACT_MAIL_SEND_SUCCESS } from "../constants/contactConstant";

// FORGOT PASSWORD REDUCER
export const contactReducer = (state = { }, action) => {

    switch (action.type) {  
            case CONTACT_MAIL_SEND_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CONTACT_MAIL_SEND_SUCCESS: 
            return {
                ...state,
                loading: false, 
                message: action.payload
            }; 

        case CONTACT_MAIL_SEND_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};