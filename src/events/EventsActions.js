import * as types from './EventsActionTypes';

export const unsubscribeEventRequest = (id) => ({
    type: types.UNSUBSCRIBE_EVENT_REQUEST,
    id
});

export const unsubscribeEventRequestSuccess = () => ({
    type: types.UNSUBSCRIBE_EVENT_REQUEST_SUCCESS,
});

export const unsubscribeEventRequestError = (error) => ({
    type: types.UNSUBSCRIBE_EVENT_REQUEST_ERROR,
    error
});

export const subscribeEventRequest = (id) => ({
    type: types.SUBSCRIBE_EVENT_REQUEST,
    id
});

export const subscribeEventRequestSuccess = () => ({
    type: types.SUBSCRIBE_EVENT_REQUEST_SUCCESS,
});

export const subscribeEventRequestError = (error) => ({
    type: types.SUBSCRIBE_EVENT_REQUEST_ERROR,
    error
});



