import * as types from './ProfileActionTypes';

export const profileRequest = (username) => ({
    type: types.PROFILE_REQUEST,
    username
});

export const profileRequestSuccess = (data, events) => ({
    type: types.PROFILE_REQUEST_SUCCESS,
    data,
    events
});

export const profileRequestError = (error) => ({
    type: types.PROFILE_REQUEST_ERROR,
    error
});

export const profileUpdate = (data, getData) => ({
    type: types.PROFILE_UPDATE,
    data,
    getData
});

export const profileUpdateSuccess = () => ({
    type: types.PROFILE_UPDATE_SUCCESS,
});

export const profileUpdateError = (error) => ({
    type: types.PROFILE_UPDATE_ERROR,
    error
});


