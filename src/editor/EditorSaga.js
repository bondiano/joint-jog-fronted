import { takeLatest, all, call, put } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './EditorActions';
import * as types from './EditorActionTypes';

import * as mapActions from '../map/MapActions';
import * as eventsActions from '../events/EventsActions';

const xhr = new XHRProvider();

function* createNewEventSaga(action) {
    try {
        const response = yield call(xhr.post, '/event/create', {
            date: new Date(action.date).getTime(),
            points: action.pointsList,
            title: action.title,
            describe: action.description
        });
        if (response.data.success) {
            yield put(actions.createNewEventSuccess());            
            yield put(mapActions.clearEditorPoints());
            yield call(action.history.push, '/');            
        } else {
            if (response.data.payload[0].errorOnField === 'date') {
                yield put(actions.createNewEventError('Пожалуйста, выберите дату')); 
            } else {
                yield put(actions.createNewEventError('Извините, произошла ошибка. Попробуйте позже.')); 
            }
        }
    } catch (err) {
        yield put(actions.createNewEventError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

function* fetchEventSaga(action) {
    try {
        const response = yield call(xhr.get, `/event/${action.id}`);
        if (response.data.success) {
            yield put(actions.fetchEventSuccess());
            yield put(eventsActions.fetchEventSuccess(response.data.payload));            
            yield put(mapActions.setCurrentEventPoints(response.data.payload.event.points));
            yield put(mapActions.editCurrentPoints());
        } else {
            yield put(actions.fetchEventError('Извините, произошла ошибка. Попробуйте позже.'));              
        }
    } catch(err) {
        yield put(actions.fetchEventError('Извините, произошла ошибка. Попробуйте позже.'));  
    }
}

function* editEventSaga(action) {
    try {
        const response = yield call(xhr.patch, `/event/${action.id}`, {
            date: new Date(action.date).getTime(),
            points: action.pointsList,
            title: action.title,
            describe: action.description
        });
        if (response.data.success) {
            yield put(actions.editEventSuccess());
            yield fetchEventSaga({id: action.id});
            yield call(action.history.push, '/');
        } else {
            yield put(actions.editEventError('Извините, произошла ошибка. Попробуйте позже.'));              
        }
    } catch(err) {
        yield put(actions.editEventError('Извините, произошла ошибка. Попробуйте позже.'));  
    }
}

export function* editorRootSaga() {
    yield all([
        yield takeLatest(types.CREATE_NEW_EVENT_REQUEST, createNewEventSaga),
        yield takeLatest(types.FETCH_EVENT_REQUEST, fetchEventSaga),
        yield takeLatest(types.EDIT_EVENT_REQUEST, editEventSaga)
    ]);
}
