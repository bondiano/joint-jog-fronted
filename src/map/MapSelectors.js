export const selectUserBasicGeo = (state) => {
    return [state.map.basicGeo.latitude, state.map.basicGeo.longitude];
};