import * as types from './MapActionTypes';

const initialState = {
    currentMap: {
        center: [54.98, 82.89],
        zoom: 10
    },
    userWhere: {
        latitude: 54.98, 
        longitude: 82.89,
        accuracy: 0
    },
    pointsList: [
    /**
     * {
            latitude:,
            longitude:,
            title:
     * }
     */
    ],
    editorPointsList: []
};

export const map = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_GEO:
            return {
                ...state,
                userWhere: {
                    ...state.userWhere,
                    latitude: action.latitude,
                    longitude: action.longitude,
                    accuracy: action.accuracy
                }
            };
        case types.CREATE_NEW_POINT:
            return {
                ...state,
                editorPointsList: [
                    ...state.editorPointsList, 
                    {
                        latitude: action.latitude,
                        longitude: action.longitude,
                        selected: false
                    }
                ]
            };
        case types.SET_CURRENT_MAP_INFO:
            return {
                ...state,
                currentMap: {
                    ...state.currentMap,
                    center: [action.center[0], action.center[1]],
                    zoom: action.zoom
                }
            };
        case types.CHANGE_POINT_POSITION:
            return {
                ...state,
                editorPointsList: [
                    ...state.editorPointsList.slice(0, action.index),
                    {
                        ...state.editorPointsList[action.index],
                        latitude: action.latitude, 
                        longitude: action.longitude
                    },
                    ...state.editorPointsList.slice(action.index + 1)
                ]
            };
        default:
            return state;
    }
};
