import * as types from './EditorActionTypes';

const initialState = {
    isLoading: false,
    isSending: false,
    error: ''
};

export const editor = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_NEW_EVENT_REQUEST:
        case types.EDIT_EVENT_REQUEST:
            return {
                ...state,
                isSending: true
            };
        case types.CREATE_NEW_EVENT_SUCCESS:
        case types.EDIT_EVENT_SUCCESS:
            return {
                ...state,
                isSending: false,
                error: ''
            };
        case types.FETCH_EVENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case types.FETCH_EVENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: ''
            };
        case types.FETCH_EVENT_ERROR:
        case types.EDIT_EVENT_ERROR:
        case types.CREATE_NEW_EVENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isSending: false,
                error: action.error
            };
        default:
            return state;
    }
};
