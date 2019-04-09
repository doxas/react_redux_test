
import {call, put} from 'redux-saga/effects';
import '@babel/polyfill';

// target saga of test
import saga, {getRequest} from '../../src/saga/appSaga.js';
import action from '../../src/action/appAction.js';
import Api from '../../src/api/index.js';

describe('saga/appSaga.js', () => {
    test('default export object is instance of Array', () => {
        expect(saga).toBeInstanceOf(Array);
    });
    test('getRequest at success', () => {
        let generator = getRequest();
        let ret = generator.next();
        expect(ret.value).toEqual(call(Api.getRequest, action.doubleClickRequest().payload));
        let testResponse = {result: 'something response', error: null};
        ret = generator.next(testResponse);
        expect(ret.value).toEqual(put({type: 'RESPONSE_SUCCESS', payload: {result: testResponse.result}}));
    });
    test('getRequest at error', () => {
        let generator = getRequest();
        let ret = generator.next();
        expect(ret.value).toEqual(call(Api.getRequest, action.doubleClickRequest().payload));
        let testResponse = {result: null, error: 'something error'};
        ret = generator.next(testResponse);
        expect(ret.value).toEqual(put({type: 'RESPONSE_FAIL', payload: {error: testResponse.error}}));
    });
});

