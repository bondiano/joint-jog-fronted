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
            return {
                ...state,
                listening: action.actionTypesList.reduce((acc, cur) => {
                    if(acc[cur]) {
                        const filtred = acc[cur].filter(el => el !== action.componentType);
                        return {
                            ...acc, 
                            [cur]: filtred.length ? filtred : undefined
                        };
                    }
                    return acc;
                }, state.listening)
            };
        // TODO: Make only one hotification hide
        case types.POPUP_HIDE:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    [action.actionType]: undefined
                }
            };
        case types.POPUP_SHOW:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    [action.actionType]: action.action
                }
            };
        default:
            return state;
    }
};