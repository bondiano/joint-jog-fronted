import * as types from './PopupActionTypes';

export const hide = (actionType) => ({
    type: types.POPUP_HIDE,
    actionType
});

export const listen = (actionTypesList, componentType) => ({
    type: types.POPUP_LISTEN,
    actionTypesList,
    componentType
});

export const unlisten = (actionTypesList, componentType) => ({
    type: types.POPUP_UNLISTEN,
    actionTypesList,
    componentType
});