
// from packages
import React         from 'react';
import {render}      from 'react-dom';
import {Provider}    from 'react-redux';
import {createStore} from 'redux';
// from source
import reducer from './reducer/reducer.js';
import App     from './container/container.js';

const INITIAL_STATE = {
    fuga: 999
};

window.addEventListener('load', () => {
    let store = createStore(reducer, INITIAL_STATE);
    render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.body.querySelector('#wrapper')
    );
}, false);

