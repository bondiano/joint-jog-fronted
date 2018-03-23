export const selectAuthStatus = (state) => {
    return state.auth.isAuth;
};

export const selectErrors = (state) => {
    return state.auth.errors;
};