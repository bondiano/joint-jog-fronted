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

export const clearEditorPoints = () => ({
    type: types.CLEAR_EDITOR_POINTS
});

export const clearCurrentEventPoints = () => ({
    type: types.CLEAR_CURRENT_EVENT_POINTS
});

export const changePointTitle = (index, title) => ({
    type: types.CHANGE_POINT_TITLE,
    index,
    title
});

export const showRoute = () => ({
    type: types.SHOW_ROUTE
});

export const hideRoute = () => ({
    type: types.HIDE_ROUTE
});

export const setEventsPointOnMap = (pointsList) => ({
    type: types.SET_EVENTS_POINT_ON_MAP,
    pointsList
});

export const setCurrentEventPoints = (pointsList) => ({
    type: types.SET_CURRENT_EVENT_POINTS,
    pointsList
});

export const editCurrentPoints = () => ({
    type: types.EDIT_CURRENT_POINTS,
});