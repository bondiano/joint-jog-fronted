import * as types from './MapActionTypes';

export const setUserPosition = (latitude, longitude, accuracy) => ({
    type: types.SET_USER_GEO,
    latitude,
    longitude,
    accuracy
});

export const setCurrentMapInfo = (center, zoom) => ({
    type: types.SET_CURRENT_MAP_INFO,
    center,
    zoom
});

export const createNewPoint = (latitude, longitude) => ({
    type: types.CREATE_NEW_POINT,
    latitude, 
    longitude
});

export const changePointPosition = (index, latitude, longitude) => ({
    type: types.CHANGE_POINT_POSITION,
    index,
    latitude, 
    longitude
});
export const removePoint = (index) => ({
    type: types.REMOVE_POINT,
    index
});

export const changePointTitle = (index, title) => ({
    type: types.CHANGE_POINT_TITLE,
    index,
    title
});