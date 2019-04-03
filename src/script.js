
import React from 'react';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';

window.addEventListener('load', () => {
    const initialState = {message: 'hello redux.'};

    const store = createStore((initialState) => {
        return {initialState};
    }, initialState);

    const App = (props) => {
        return (
            <div>{props.message}</div>
        );
    };

    const ReduxApp = connect((state) => {
        return {message: state.message};
    })(App);

    render(
        <Provider store={store}>
            <ReduxApp />
        </Provider>
    , document.getElementById('wrapper'));
}, false);

