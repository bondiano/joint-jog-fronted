import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './ProfileActions';
import * as types from './ProfileActionTypes';

const xhr = new XHRProvider();

function* profileRequestSaga(action) {
    try {
        const response = yield call(xhr.post, `/user/profile/${action.username}`, true);
        if (response.success) {
            yield put(actions.profileRequestSuccess(response.data.user_info, response.data.events));
        } else {
            yield put(actions.profileRequestError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.profileRequestError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

function* profileUpdateSaga(action) {
    try {
        const response = yield call(xhr.patch, '/user/profile', {
            username: action.data.username,
            email: action.data.email,
            password: action.data.password,
            check_password: action.data.check_password,
            socialNetworks: action.data.socialNetworks,
            firstName: action.data.firstName,
            lastName: action.data.lastName,
            age: action.data.age,
            sex: action.data.sex
        });
        if (response.success) {
            yield put(actions.profileUpdateSuccess());
        } else {
            yield put(actions.profileUpdateError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.profileUpdateError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

export function* profileRootSaga() {
    yield all([
        yield takeLatest(types.PROFILE_REQUEST, profileRequestSaga),
        yield takeLatest(types.PROFILE_UPDATE, profileUpdateSaga)
    ]);
}
