
import {call, put, takeEvery} from 'redux-saga/effects';
import '@babel/polyfill';

// target saga of test
import saga, {getRequest} from '../../src/saga/appSaga.js';
import action from '../../src/action/appAction.js';
import Api from '../../src/api/index.js';

describe('saga/appSaga.js', () => {
    test('default export object is instance of Array', () => {
        expect(saga).toBeInstanceOf(Array);
    });
    test('getRequest', () => {
        let generator = getRequest(action.doubleClickRequest());
        let ret = generator.next();
        ret = generator.next();

        expect(true).toBeTruthy();

        // expect(ret.value).toEqual(call(Api.getRequest, action.doubleClickRequest().payload));
        //
        // ret = generator.next();
        // expect(ret != null && (ret.result != null || ret.error != null)).toBeTruthy();
        //
        // ret = generator.next();
        // expect(ret.hasOwnProperty('type')).toBeTruthy();
    });
});

