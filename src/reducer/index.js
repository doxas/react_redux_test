
import {combineReducers} from 'redux';

import appReducer from './appReducer.js';

export default combineReducers({
    app: appReducer
});

