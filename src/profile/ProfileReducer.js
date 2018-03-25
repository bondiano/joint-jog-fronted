import * as types from './ProfileActionTypes';

const initialState = {
    error: '',
    data: {},
    events: []
};

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case types.PROFILE_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
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
