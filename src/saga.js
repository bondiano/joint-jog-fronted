import { all, call } from 'redux-saga/effects';
import { authRootSaga } from './auth/AuthSaga';
import { eventsRootSaga } from "./events/EventsSaga";
import { profileRootSaga } from "./profile/ProfileSaga";

export default function* rootSaga() {
    yield all([
        call(authRootSaga),
        call(eventsRootSaga),
        call(profileRootSaga)
    ]);
}
