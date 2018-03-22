import { takeLatest, all, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './AuthActions';
import * as types from './AuthActionTypes';

const xhr = new XHRProvider();

function* registerSaga(action) {
    try {
        const response = yield call(xhr.get, '/register', {
            username: action.username,
            email: action.email,
            password: action.password
        });

        if (response && response.success) {
            yield put(actions.registerSuccess());
            yield put(push('/login'));
        } else {
            yield put(actions.registerError(response.errors));
        }
    } catch (error) {
        yield put(actions.registerError([error]));
    }
}

function* loginSaga(action) {
    try {
        const response = yield call(xhr.get, '/login', {
            username: action.username,
            password: action.password
        });

        if (response && response.success) {
            yield put(actions.loginSuccess(action.token));
            yield put(push('/'));
        } else {
            yield put(actions.loginError(response.errors));
        }
    } catch (error) {
        yield put(actions.loginError([error]));
    }
}

export function* authRootSaga() {
    yield all([
        yield takeLatest(types.REGISTER_REQUEST, registerSaga),
        yield takeLatest(types.LOGIN_REQUEST, loginSaga)
    ]);
}