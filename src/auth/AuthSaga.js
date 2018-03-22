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
        if (response.success) {
            yield localStorage.setItem('token', response.data.token);
            yield call(history.push, '/');
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

export function* authRootSaga() {
    yield all([
        yield takeLatest(types.LOGIN_REQUEST, loginSaga)
    ]);
}
