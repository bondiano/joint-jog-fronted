import { takeLatest, all, call } from 'redux-saga/effects';

// import XHRProvider from '../utils/XHRProvider';

// import * as actions from './EditorActions';
import * as types from './EditorActionTypes';

// const xhr = new XHRProvider();

function* createNewEventSaga(action) {
    yield call(console.log, action);
}

export function* editorRootSaga() {
    yield all([
        yield takeLatest(types.CREATE_NEW_EVENT_REQUEST, createNewEventSaga)
    ]);
}
