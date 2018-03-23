import * as types from './MapActionTypes';

export const setUserBasicGeo = (latitude, longitude) => ({
    type: types.SET_USER_GEO,
    latitude,
    longitude
});
