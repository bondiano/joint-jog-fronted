import * as types from './AuthActionTypes';

export const registerRequest = (username, email, password, historyPush) => ({
    type: types.REGISTER_REQUEST,
    username,
    email,
    password,
    historyPush
});

export const loginRequest = (username, password, historyPush) => ({
    type: types.LOGIN_REQUEST,
    username,
    password,
    historyPush
});

export const registerSuccess = () => ({
    type: types.REGISTER_SUCCESS,
});

export const loginSuccess = (username, id) => ({
    type: types.LOGIN_SUCCESS,
    username,
    id
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