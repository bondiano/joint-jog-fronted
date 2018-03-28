import * as types from './ProfileActionTypes';

const initialState = {
    error: '',
    profile: {},
    events: []
};

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.PROFILE_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                profile: action.profile,
                error: ''
            };
        case types.PROFILE_EVENTS_REQUEST_SUCCESS:
            return {
                ...state,
                events: action.events,
                error: ''
            };
        case types.PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                error: ''
            };
        case types.PROFILE_UPDATE_ERROR:
        case types.PROFILE_REQUEST_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
