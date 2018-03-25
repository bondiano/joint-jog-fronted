import * as types from './MapActionTypes';

const initialState = {
    userWhere:{
        latitude: 54.98, 
        longitude: 82.89,
        accuracy: 0
    },
    pointsList: [
    /**
     * {
            latitude:,
            longitude:,
            type:,
            title:,
            icon:
     * }
     */
    ]
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
        default:
            return state;
    }
};
