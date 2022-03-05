import callApi from "../API/axios";
import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/userConstats"



export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type: LOGIN_REQUEST});

        const {data} = await callApi.post(`/login`, {email, password})
        
        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.error})
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}