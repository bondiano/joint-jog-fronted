import * as types from './EditorActionTypes';

const initialState = {
    isSending: false,
    error: ''
};

export const editor = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_EVENT_REQUEST:
            return {
                ...state,
                isSending: true
            };
        case types.CREATE_NEW_EVENT_SUCCESS:
            return {
                ...state,
                isSending: false,
                error: ''
            };
        case types.CREATE_NEW_EVENT_ERROR:
            return {
                ...state,
                isSending: false,
                error: action.error
            };
        default:
            return state;
    }
};
