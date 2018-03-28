import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './EventsActions';
import * as types from './EventsActionTypes';

const xhr = new XHRProvider();

function* unsubscribeSaga(action) {
    try {
        yield call(console.log, 'id', action.id);
        const response = yield call(xhr.post, '/event/unsub', {
            id: action.id
        });
        if (response.data.success) {
            yield  put(actions.unsubscribeEventRequestSuccess());
            yield call(console.log, '+++++++++');
        } else {
            yield put(actions.unsubscribeEventRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.unsubscribeEventRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        yield call(console.log, err);
    }
}

function* subscribeSaga(action) {
    try {
        yield call(console.log, 'id', action.id);
        const response = yield call(xhr.post, '/event/sub', {
            id: action.id
        });
        if (response.data.success) {
            yield  put(actions.subscribeEventRequestSuccess());
        } else {
            yield put(actions.subscribeEventRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.unsubscribeEventRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        yield call(console.log, err);
    }
}

export function* eventsRootSaga() {
    yield all([
        yield takeLatest(types.UNSUBSCRIBE_EVENT_REQUEST, unsubscribeSaga),
        yield takeLatest(types.SUBSCRIBE_EVENT_REQUEST, subscribeSaga),
    ]);
}
