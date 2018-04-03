import React from 'react';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { createStore, applyMiddleware }  from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import popupMiddlewere from './popup/PopupMiddlewere';
import rootSaga from './saga';
import App from './app/App';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(popupMiddlewere, sagaMiddleware))
);


sagaMiddleware.run(rootSaga);

render((
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>),
    document.getElementById('app')
);

serviceWorker.register();