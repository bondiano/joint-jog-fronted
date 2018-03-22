import { all, call } from 'redux-saga/effects';
import { authRootSaga } from './auth/AuthSaga';

export default function* rootSaga() {
    yield all([
        call(authRootSaga)
    ]);
}
