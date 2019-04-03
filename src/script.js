
// from packages
import React         from 'react';
import {render}      from 'react-dom';
import {Provider}    from 'react-redux';
import {createStore} from 'redux';
// from source
import reducer from './reducer.js';
import App     from './conteiner.js';

window.addEventListener('load', () => {
    const store = createStore(reducer);
    render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('wrapper')
    );
}, false);

