import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './AuthActions';
import * as types from './AuthActionTypes';

import history from '../history';

const xhr = new XHRProvider();

function* loginSaga(action) {
    try {
        const response = yield call(xhr.post, '/user/login', {
            username: action.username,
            password: action.password
        });
        if (response) {
            yield call(localStorage.setItem, 'token', response.payload.token);
            yield put(actions.loginSuccess(response.payload.user.username, response.payload.user.id));
            yield call(history.push, '/');
            yield call(console.log, 'success');
        } else {
            yield put(actions.loginError('Пользователя с такой комбинацией логина и пароля нет.'));
            yield call(console.log, 'error unknown user');
        }
    } catch (error) {
        yield put(actions.loginError('Извините, произошла ошибка. Попробуйте позже.'));
        yield call(console.log, error.message);
    }
}

export function* authRootSaga() {
    yield all([
        yield takeLatest(types.LOGIN_REQUEST, loginSaga)
    ]);
}
