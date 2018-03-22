import * as types from './AuthActionTypes';

const initialState = {
    token: '',
    isAuth: false,
    errors: []
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                isAuth: true,
                errors: []
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                errors: []
            };
        case types.LOGOUT:
            return {
                ...state,
                token: '',
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
