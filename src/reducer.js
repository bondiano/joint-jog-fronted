import { combineReducers } from 'redux';
import { auth } from './auth/AuthReducer';
import { map } from './map/MapReducer';
import { events } from './events/EventsReducer';
import { editor } from './editor/EditorReducer';
import { profile } from './profile/ProfileReducer';
import { popup } from './popup/PopupReducer';

export default combineReducers({
    auth,
    map,
    profile,
    events,
    editor,
    popup
});
