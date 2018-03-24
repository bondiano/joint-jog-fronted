import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './AuthActions';
import * as types from './AuthActionTypes';

const xhr = new XHRProvider();

function* loginSaga(action) {
    try {
        const response = yield call(xhr.post, '/user/login', {
            username: action.username,
            password: action.password
        });
        if (response.success) {
            yield window.localStorage.setItem('token', response.data.token);
            yield call(action.historyPush, '/');
            yield put(actions.loginSuccess(response.data.user.username, response.data.user.id));
        } else {
            if (response.status === 400) {
                yield put(actions.loginError('Пользователя с такой комбинацией логина и пароля нет.'));
            } else {
                yield put(actions.loginError('Извините, произошла ошибка. Попробуйте позже.'));
            }
        }
    } catch(err) {
        yield put(actions.loginError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

function* registerSaga(action) {
    try {
        const response = yield call(xhr.post, '/user/register', {
            username: action.username,
            email: action.email,
            password: action.password
        });
        if (response.success) {
            yield call(action.historyPush, '/login');
            yield put(actions.registerSuccess());
        } else {
            if (response.status === 422) {
                if (response.data.payload.length < 2) {
                    if (response.data.payload[0].errorOnField === 'username') {
                        yield put(actions.registerError('Пользователь с таким логином уже есть.'));
                    } else {
                        yield put(actions.registerError('Пользователь с такой электронной почтой уже есть.'));
                    }
                } else {
                    yield put(actions.registerError('Пользователь с такими логином и электронной почтой уже есть.'));
                }
            } else {
                yield put(actions.loginError('Извините, произошла ошибка. Попробуйте позже.'));
            }
        }
    } catch(err) {
        yield put(actions.loginError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

export function* authRootSaga() {
    yield all([
        yield takeLatest(types.LOGIN_REQUEST, loginSaga),
        yield takeLatest(types.REGISTER_REQUEST, registerSaga)
    ]);
}
