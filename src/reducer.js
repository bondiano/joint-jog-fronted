import { combineReducers } from 'redux';
import { auth } from './auth/AuthReducer';
import { map } from './map/MapReducer';
import { events } from './events/EventsReducer';
import { profile } from './profile/ProfileReducer';

export default combineReducers({
    auth,
    map,
    profile,
    events
});
