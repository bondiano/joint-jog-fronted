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
            console.log(action.id)
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
                isAuth: false,
                id: '',
                username: ''
            };
        case types.CHECK_JWT_REQUEST:
            return {
                ...state,
                isAuth: true
            };
        case types.CHECK_JWT_SUCCESS:
            return {
                ...state,
                isAuth: true,
                username: action.username,
                id: action.id,
                errors: ''
            };
        case types.CHECK_JWT_ERROR:
            return {
                ...state,
                isAuth: false,
                errors: action.errors
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
