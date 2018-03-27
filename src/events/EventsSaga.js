import { takeLatest, all, put, call } from 'redux-saga/effects';

import XHRProvider from '../utils/XHRProvider';

import * as actions from './EventsActions';
import * as types from './EventsActionTypes';

import * as mapActions from '../map/MapActions';

const xhr = new XHRProvider();

function* unsubscribeSaga(action) {
    try {
        const response = yield call(xhr.post, '/event/unsub', {
            id: action.id
        });
        if (response.success) {
            yield  put(actions.unsubscribeEventSuccess());
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
                if (!event.title 
                    || !event.points.length
                    || !event.points[0].latitude 
                    || !event.points[0].longitude) {
                        return acc;
                    } else {
                        return [...acc, ({
                            id: event._id,
                            title: event.title,
                            latitude: event.points[0] && event.points[0].latitude,
                            longitude: event.points[0] && event.points[0].longitude
                        })];
                    }
            }, []);
            yield put(mapActions.setEventsPointOnMap(pointsList));
        } else {
            yield put(actions.fetchEventsError('Извините, произошла ошибка. Попробуйте позже.'));              
        }
    } catch(err) {
        yield put(actions.fetchEventsError('Извините, произошла ошибка. Попробуйте позже.'));  
    }
}

export function* eventsRootSaga() {
    yield all([
        yield takeLatest(types.UNSUBSCRIBE_EVENT, unsubscribeSaga),
        yield takeLatest(types.FETCH_EVENTS_REQUEST, fetchEventsSaga)
    ]);
}
