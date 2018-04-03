import * as types from './PopupActionTypes';

const initialState = {
    listening: {},
    notifications: {}
};

export const popup = (state = initialState, action) => {
    switch(action.type) {
        case types.POPUP_LISTEN: 
            return {
                ...state,
                listening: action.actionTypesList.reduce((acc, cur) => {
                    if (acc[cur]) {
                        if (acc[cur].includes(action.componentType)){
                            return acc;
                        }
                        return {...acc, [cur]: [...acc[cur], action.componentType]};
                    }
                    return {...acc, [cur]: [action.componentType]};
                }, state.listening)
            };
        case types.POPUP_UNLISTEN:
        case types.POPUP_HIDE:
        case types.POPUP_SHOW:
        default:
            return state;
    }
};