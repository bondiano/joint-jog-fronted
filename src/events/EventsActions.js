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