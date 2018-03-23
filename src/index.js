import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware }  from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import rootSaga from './saga';
import App from './app/App';
import history from './history'

import axios from 'axios';
window.axios = axios;

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);


sagaMiddleware.run(rootSaga);

render((
        <Provider store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>),
    document.getElementById('app')
);
