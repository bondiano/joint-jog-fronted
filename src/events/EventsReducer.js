import * as types from './EventsActionTypes';

const initialState = {
    isLoading: false,
    isSubscribing: false,
    events: [],
    currentEvent: {
        event: {
            title: '',
            describe: '',
            owner: '',
            date: new Date(),
            points: []
        },
        usernames: []
    },
    error: ''
};

export const events = (state = initialState, action) => {
    switch (action.type) {
        case types.UNSUBSCRIBE_EVENT_SUCCESS:
        case types.SUBSCRIBE_EVENT_SUCCESS:
            return {
                ...state,
                error: '',
                isSubscribing: false
            };
        case types.UNSUBSCRIBE_EVENT_REQUEST:
        case types.SUBSCRIBE_EVENT_REQUEST:
            return {
                ...state,
                error: '',
                isSubscribing: true
            };
        case types.FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                error: '',
                events: action.events
            };
        case types.FETCH_EVENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case types.FETCH_EVENT_SUCCESS:
            return {
                ...state,
                error: '',
                currentEvent: action.event,
                isLoading: false
            };
        case types.FETCH_EVENT_ERROR:
        case types.FETCH_EVENTS_ERROR:
        case types.UNSUBSCRIBE_EVENT_ERROR:   
        case types.SUBSCRIBE_EVENT_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                isSubscribing: false
            };
        default:
            return state;
    }
};
