import * as types from './EditorActionTypes';

export const createNewEventRequest = (eventData, history) => ({
    type: types.CREATE_NEW_EVENT_REQUEST,
    eventData,
    history
});

export const createNewEventSuccess = () => ({
    type: types.CREATE_NEW_EVENT_SUCCESS
});

export const createNewEventError = (error) => ({
    type: types.CREATE_NEW_EVENT_ERROR,
    error
});

export const editEventRequest = (eventData, history) => ({
    type: types.EDIT_EVENT_REQUEST,
    eventData,
    history
});

export const editEventSuccess = () => ({
    type: types.EDIT_EVENT_SUCCESS
});

export const editEventError = (error) => ({
    type: types.EDIT_EVENT_ERROR,
    error
});

export const fetchEventRequest = (id) => ({
    type: types.FETCH_EVENT_REQUEST,
    id
});

export const fetchEventSuccess = (event) => ({
    type: types.FETCH_EVENT_SUCCESS,
    event
});

export const fetchEventError = (error) => ({
    type: types.FETCH_EVENT_ERROR,
    error
});