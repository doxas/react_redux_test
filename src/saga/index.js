
// from package
import {all} from 'redux-saga/effects';
import '@babel/polyfill';

// from source
import appSaga from './appSaga.js';

export default function* rootSaga(){
    yield all([
        appSaga,
    ]);
}


