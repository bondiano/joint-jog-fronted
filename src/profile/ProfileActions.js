import * as types from './ProfileActionTypes';

export const profileDataRequest = (username) => ({
    type: types.PROFILE_DATA_REQUEST,
    username
});

export const profileEventsRequest = (username) => ({
    type: types.PROFILE_EVENTS_REQUEST,
    username
});

export const profileDataRequestSuccess = (profile) => ({
    type: types.PROFILE_DATA_REQUEST_SUCCESS,
    profile
});

export const profileEventsRequestSuccess = (events) => ({
    type: types.PROFILE_EVENTS_REQUEST_SUCCESS,
    events
});

export const profileRequestError = (error) => ({
    type: types.PROFILE_REQUEST_ERROR,
    error
});

export const profileUpdate = (profile) => ({
    type: types.PROFILE_UPDATE_REQUEST,
    profile
});

export const profileUpdateSuccess = () => ({
    type: types.PROFILE_UPDATE_REQUEST_SUCCESS,
});

export const profileUpdateError = (error) => ({
    type: types.PROFILE_UPDATE_REQUEST_ERROR,
    error
});


