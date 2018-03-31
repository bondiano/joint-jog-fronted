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
            id:,
            latitude:,
            longitude:,
            title:
     * }
     */
    ],
    currentEventPointsList: [],
    editorPointsList: [],
    showRoute: false
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
                ],
                showRoute: false
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
                ],
                showRoute: false                
            };
        case types.CHANGE_POINT_TITLE:
            return {
                ...state,
                editorPointsList: [
                    ...state.editorPointsList.slice(0, action.index),
                    {
                        ...state.editorPointsList[action.index],
                        title: action.title
                    },
                    ...state.editorPointsList.slice(action.index + 1)
                ]
            };
        case types.CLEAR_EDITOR_POINTS:
            return {
                ...state,
                editorPointsList: [],
                showRoute: false  
            };
        case types.REMOVE_POINT:
            return {
                ...state,
                editorPointsList: state.editorPointsList.filter((point, index) => index !== action.index),
                showRoute: false
            };
        case types.SHOW_ROUTE:
            return {
                ...state,
                showRoute: true
            };
        case types.HIDE_ROUTE:
            return {
                ...state,
                showRoute: false
            };
        case types.SET_EVENTS_POINT_ON_MAP:
            return {
                ...state,
                pointsList: action.pointsList
            };
        case types.SET_CURRENT_EVENT_POINTS:
            return {
                ...state,
                currentEventPointsList: action.pointsList
            };
        case types.EDIT_CURRENT_POINTS:
            return {
                ...state,
                editorPointsList: [...state.currentEventPointsList]
            };
        default:
            return state;
    }
};
