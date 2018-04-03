export const hide = () => ({
    type: 'POPUP_HIDE'
});

export const listen = (actionTypesList) => ({
    type: 'POPUP_LISTEN',
    actionTypesList
});

export const unlisten = (actionType) => ({
    type: 'POPUP_UNLISTEN',
    actionType
});

export const popupMiddleware = store => next => action => {
    
};

const initialState = {
    listening: {},
    notifications: {}
};

export default (state = initialState, action) => {

};