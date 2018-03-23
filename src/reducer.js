import { combineReducers } from 'redux';
import { auth } from './auth/AuthReducer';
import { map } from './map/MapReducer';

export default combineReducers({
    auth,
    map
});
