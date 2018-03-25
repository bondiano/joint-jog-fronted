import * as types from './EventsActionTypes';

export const unsubscribeEvent = (id) => ({
    type: types.UNSUBSCRIBE_EVENT,
    id
});

export const unsubscribeEventSuccess = () => ({
    type: types.UNSUBSCRIBE_EVENT_SUCCESS,
});

export const unsubscribeEventError = (error) => ({
    type: types.UNSUBSCRIBE_EVENT_ERROR,
    error
});



