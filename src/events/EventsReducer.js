import * as types from './EventsActionTypes';

const initialState = {
    isSending: false,
    events: [],
    currentEvent: {},
    error: ''
};

export const events = (state = initialState, action) => {
    switch (action.type) {
        case types.UNSUBSCRIBE_EVENT_SUCCESS:
            return {
                ...state,
                error: ''
            };
        case types.SUBSCRIBE_EVENT_SUCCESS:
            return {
                ...state,
                error: ''
            };
        case types.FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                error: '',
                events: [...action.events]
            };
        case types.FETCH_EVENT_REQUEST:
            return {
                ...state,
                isSending: true
            };
        case types.FETCH_EVENT_SUCCESS:
            return {
                ...state,
                error: '',
                currentEvent: action.event,
                isSending: false
            };
        case types.FETCH_EVENT_ERROR:
        case types.FETCH_EVENTS_ERROR:
        case types.UNSUBSCRIBE_EVENT_ERROR:   
        case types.SUBSCRIBE_EVENT_ERROR:
            return {
                ...state,
                error: action.error,
                isSending: false
            };
        default:
            return state;
    }
};
