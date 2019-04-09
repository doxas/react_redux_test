
// from packages
import React                          from 'react';
import {render}                       from 'react-dom';
import {Provider}                     from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware           from 'redux-saga';
import {createLogger}                 from 'redux-logger';
// from source
import reducer      from './reducer/index.js';
import AppContainer from './container/appContainer.js';
import rootSaga     from './saga/index.js';

window.addEventListener('load', () => {
    let loggerMiddleware = createLogger({
        collapsed: true,
        diff: true
    });
    let sagaMiddleware = createSagaMiddleware();
    let store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware, loggerMiddleware)
    );
    sagaMiddleware.run(rootSaga);

    render(
        <Provider store={store}>
            <AppContainer />
        </Provider>
        , document.body.querySelector('#wrapper')
    );
}, false);

