import callApi from "../API/axios";
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userConstats";


// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await callApi.post(`/login`, { email, password }, config)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.error })
    }
}

// REGISTER 
export const register = (userData) => async (dispatch) => {

    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await callApi.post("/register", userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.error
        })
    }
}


// LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await callApi.get(`/me`)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.error })
    }
}

// LOGOUT USER

export const logout = () => async (dispatch) => {
    try {
        await callApi.get(`/logout`)

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.error })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}