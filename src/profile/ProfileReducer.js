import * as types from './ProfileActionTypes';

const initialState = {
    error: '',
    profile: {},
    events: [],
    isLoadingData: false
};

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.PROFILE_DATA_REQUEST:
        case types.PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                isLoadingData: true
            };
        case types.PROFILE_EVENTS_REQUEST:
            return {
                ...state,
            };
        case types.PROFILE_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                profile: action.profile,
                error: '',
                isLoadingData: false
            };
        case types.PROFILE_EVENTS_REQUEST_SUCCESS:
            return {
                ...state,
                events: action.events,
                error: '',
            };
        case types.PROFILE_UPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoadingData: false
            };
        case types.PROFILE_UPDATE_REQUEST_ERROR:
        case types.PROFILE_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                isLoadingData: false
            };
        default:
            return state;
    }
};
