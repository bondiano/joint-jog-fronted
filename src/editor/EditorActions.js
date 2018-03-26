import * as types from './EditorActionTypes';

export const createNewEventRequest = (title, description, date, pointsList) => ({
    type: types.CREATE_NEW_EVENT_REQUEST,
    title, 
    description, 
    date, 
    pointsList
});

export const createNewEventSuccess = () => ({
    type: types.CREATE_NEW_EVENT_REQUEST
});

export const createNewEventError = (error) => ({
    type: types.CREATE_NEW_EVENT_ERROR,
    error
});