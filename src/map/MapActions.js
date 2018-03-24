import * as types from './MapActionTypes';

export const setUserPosition = (latitude, longitude, accuracy) => ({
    type: types.SET_USER_GEO,
    latitude,
    longitude,
    accuracy
});
