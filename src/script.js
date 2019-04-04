
// from packages
import React         from 'react';
import {render}      from 'react-dom';
import {Provider}    from 'react-redux';
import {createStore} from 'redux';
// from source
import reducer from './reducer/index.js';
import App     from './container/container.js';

window.addEventListener('load', () => {
    let store = createStore(reducer);
    render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.body.querySelector('#wrapper')
    );
}, false);

