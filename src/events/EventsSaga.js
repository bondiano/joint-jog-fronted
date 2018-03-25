import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './EventsActions';
import * as types from './EventsActionTypes';

const xhr = new XHRProvider();

function* unsubscribeSaga(action) {
    try {
        const response = yield call(xhr.post, '/event/unsub', {
            id: action.id
        });
        if (response.success) {
            yield  put(actions.unsubscribeEventSuccess());
        } else {
            yield put(actions.unsubscribeEventError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.unsubscribeEventError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

export function* eventsRootSaga() {
    yield all([
        yield takeLatest(types.UNSUBSCRIBE_EVENT, unsubscribeSaga),
    ]);
}
