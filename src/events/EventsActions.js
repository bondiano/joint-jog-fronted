import * as types from './EventsActionTypes';

export const unsubscribeEventRequest = (id, history) => ({
    type: types.UNSUBSCRIBE_EVENT_REQUEST,
    id,
    history
});

export const unsubscribeEventSuccess = () => ({
    type: types.UNSUBSCRIBE_EVENT_SUCCESS,
});

export const unsubscribeEventError = (error) => ({
    type: types.UNSUBSCRIBE_EVENT_ERROR,
    error
});

export const subscribeEventRequest = (id, history) => ({
    type: types.SUBSCRIBE_EVENT_REQUEST,
    id,
    history
});

export const subscribeEventSuccess = () => ({
    type: types.SUBSCRIBE_EVENT_SUCCESS,
});

export const subscribeEventError = (error) => ({
    type: types.SUBSCRIBE_EVENT_ERROR,
    error
});

export const fetchEventsRequest = () => ({
    type: types.FETCH_EVENTS_REQUEST
});

export const fetchEventsSuccess = (events) => ({
    type: types.FETCH_EVENTS_SUCCESS,
    events
});

export const fetchEventsError = (error) => ({
    type: types.FETCH_EVENTS_ERROR,
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