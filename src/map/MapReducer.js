import * as types from './MapActionTypes';

const initialState = {
    basicGeo:{
        latitude: 54.98, 
        longitude: 82.89
    }
};

export const map = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_GEO:
            return {
                ...state,
                basicGeo: {
                    ...state.basicGeo,
                    latitude: action.latitude,
                    longitude: action.longitude
                }
            };
        default:
            return state;
    }
};
