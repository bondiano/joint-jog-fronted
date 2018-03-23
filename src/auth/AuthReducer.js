import * as types from './AuthActionTypes';

const initialState = {
    isAuth: false,
    username: '',
    id: '',
    errors: ''
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                username: action.username,
                id: action.id,
                isAuth: true,
                errors: ''
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                errors: ''
            };
        case types.LOGOUT:
            return {
                ...state,
                isAuth: false
            };
        case types.REGISTER_ERROR:
        case types.LOGIN_ERROR:
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
};
