import { takeLatest, all, call, put } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './EditorActions';
import * as types from './EditorActionTypes';

import * as mapActions from '../map/MapActions';

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

export function* editorRootSaga() {
    yield all([
        yield takeLatest(types.CREATE_NEW_EVENT_REQUEST, createNewEventSaga)
    ]);
}
