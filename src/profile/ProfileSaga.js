import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './ProfileActions';
import * as types from './ProfileActionTypes';

const xhr = new XHRProvider();

function* profileDataRequestSaga(action) {
    try {
        const response = yield call(xhr.get, `/user/profile/${action.username}`, true);
        if (response.data.success) {
            yield put(actions.profileDataRequestSuccess(response.data.payload.user_info));
        } else {
            yield put(actions.profileRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.profileRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        yield call(console.error, err.message)
    }
}

function* profileEventsRequestSaga(action) {
    try {
        const response = yield call(xhr.get, `/user/profile/${action.username}`, true);
        if (response.data.success) {
            yield put(actions.profileEventsRequestSuccess(response.data.payload.events));
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
        const response = yield call(xhr.patch, '/user/profile', {
            ...action.profile
        });
        if (response.data.success) {
            yield put(actions.profileUpdateSuccess());
            yield put(actions.profileDataRequest(action.profile.username));
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
        yield takeLatest(types.PROFILE_DATA_REQUEST, profileDataRequestSaga),
        yield takeLatest(types.PROFILE_EVENTS_REQUEST, profileEventsRequestSaga),
        yield takeLatest(types.PROFILE_UPDATE_REQUEST, profileUpdateSaga)
    ]);
}
