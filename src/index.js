import React from 'react';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';
import { createStore, applyMiddleware }  from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
// import saga from './saga';
import App from './app/App';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// sagaMiddleware.run(saga);

render((
        <Provider store={store}>
            <BrowserRouter history={history}>
                <App/>
            </BrowserRouter>
        </Provider>),
    document.getElementById('app')
);
