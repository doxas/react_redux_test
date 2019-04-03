
import React from 'react';
import {connect} from 'react-redux';

import App from './component/app/App.js'
import action from './action.js'

function mapStateToProps(state){
    return state;
}

// argument 'dispatch' from store
function mapDispatchToProps(dispatch){
    return {
        clicker: () => {
            // get 'action' from 'call of action creator'
            dispatch(/* action */ action.hoge() /* action */);
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
