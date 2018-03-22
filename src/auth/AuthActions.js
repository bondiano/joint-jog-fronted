import * as types from './AuthActionTypes';

export const registerRequest = (username, email, password) => ({
    type: types.REGISTER_REQUEST,
    username,
    email,
    password
});

export const loginRequest = (username, password) => ({
    type: types.LOGIN_REQUEST,
    username,
    password
});

export const registerSuccess = () => ({
    type: types.REGISTER_SUCCESS,
});

export const loginSuccess = (token) => ({
    type: types.LOGIN_SUCCESS,
    token
});

export const registerError = (errors) => ({
    type: types.REGISTER_ERROR,
    errors
});

export const loginError = (errors) => ({
    type: types.LOGIN_ERROR,
    errors
});

export const logout = () => ({
    type: types.LOGOUT
});