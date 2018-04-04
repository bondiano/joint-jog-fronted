import * as types from './PopupActionTypes';

export default store => next => action => {
    const result = next(action);
    const listeners = store.getState().popup.listening[action.type];
    if (listeners) {
        store.dispatch({
            type: types.POPUP_SHOW,
            actionType: action.type,
            action
        });
    }
    return result;
};