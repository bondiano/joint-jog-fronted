import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './EventsActions';
import { profileEventsRequest } from '../profile/ProfileActions';
import * as types from './EventsActionTypes';


import * as mapActions from '../map/MapActions';

const xhr = new XHRProvider();

function* unsubscribeSaga(action) {
    try {
        const response = yield call(xhr.post, '/event/unsub', {
            id: action.id
        });
        if (response.data.success) {
            yield put(actions.unsubscribeEventSuccess());
            yield put(profileEventsRequest(action.username));
        } else {
            yield put(actions.unsubscribeEventError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.unsubscribeEventError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

function* subscribeSaga(action) {
    try {
        const response = yield call(xhr.post, '/event/sub', {
            id: action.id
        });
        if (response.data.success) {
            yield  put(actions.subscribeEventSuccess());
            yield fetchEventSaga({id: action.id});
        } else {
            yield put(actions.unsubscribeEventError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.unsubscribeEventError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

function* fetchEventsSaga() {
    try {
        const response = yield call(xhr.get, '/event/');
        if (response.data.success) {
            yield put(actions.fetchEventsSuccess(response.data.payload));
            const pointsList =  response.data.payload.reduce((acc, event) => {
                if (!event.points.length) {
                    return acc;
                }
                return [...acc, ({
                    id: event._id,
                    title: event.title,
                    latitude: event.points[0].latitude,
                    longitude: event.points[0].longitude
                })];
            }, []);
            yield put(mapActions.setEventsPointOnMap(pointsList));
        } else {
            yield put(actions.fetchEventsError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.fetchEventsError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

function* fetchEventSaga(action) {
    try {
        yield put(mapActions.clearCurrentEventPoints());        
        const response = yield call(xhr.get, `/event/${action.id}`);
        if (response.data.success) {
            yield put(actions.fetchEventSuccess(response.data.payload));
            yield put(mapActions.setCurrentEventPoints(response.data.payload.event.points));
        } else {
            yield put(actions.fetchEventError('Извините, произошла ошибка. Попробуйте позже.'));
        }
    } catch(err) {
        yield put(actions.fetchEventError('Извините, произошла ошибка. Попробуйте позже.'));
    }
}

export function* eventsRootSaga() {
    yield all([
        yield takeLatest(types.UNSUBSCRIBE_EVENT_REQUEST, unsubscribeSaga),
        yield takeLatest(types.SUBSCRIBE_EVENT_REQUEST, subscribeSaga),
        yield takeLatest(types.FETCH_EVENTS_REQUEST, fetchEventsSaga),
        yield takeLatest(types.FETCH_EVENT_REQUEST, fetchEventSaga)
    ]);
}
