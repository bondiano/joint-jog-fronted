export const hide = (actionType) => ({
    type: 'POPUP_HIDE',
    actionType
});

export const listen = (actionTypesList, componentType) => ({
    type: 'POPUP_LISTEN',
    actionTypesList,
    componentType
});

export const unlisten = (actionType) => ({
    type: 'POPUP_UNLISTEN',
    actionType
});