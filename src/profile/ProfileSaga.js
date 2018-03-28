import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './ProfileActions';
import * as types from './ProfileActionTypes';

const xhr = new XHRProvider();

function* profileRequestSaga(action) {
    try {
        const response = yield call(xhr.get, `/user/profile/${action.username}`, true);
        if (response.data.success) {
            yield put(actions.profileRequestSuccess(response.data.payload.user_info, response.data.payload.events));
            yield call(console.log, response.data.payload.events)

        } else {
            yield put(actions.profileRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.profileRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        yield call(console.error, err.message)
    }
}

function* profileUpdateSaga(action) {
    try {
        yield call(console.log, action.data);
        const response = yield call(xhr.patch, '/user/profile', {
            ...action.data
        });
        if (response.data.success) {
            yield put(actions.profileUpdateSuccess());
            yield call(console.log, "+++++++++++")

        } else {
            yield put(actions.profileUpdateError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.profileUpdateError('Извините, произошла ошибка. Попробуйте позже.'));
        yield call(console.error, err.message)
    }
}

export function* profileRootSaga() {
    yield all([
        yield takeLatest(types.PROFILE_REQUEST, profileRequestSaga),
        yield takeLatest(types.PROFILE_UPDATE, profileUpdateSaga)
    ]);
}
