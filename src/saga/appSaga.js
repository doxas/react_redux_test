
import {call, put, takeEvery} from 'redux-saga/effects';
import Api from '../api/index.js';
import '@babel/polyfill';

function* getRequest(action){
    // Api.getRequest の結果を受けて……
    let {result, error} = yield call(Api.getRequest, action.payload);
    if(error == null){
        // error じゃなければこっちの action を発行する
        yield put({type: 'RESPONSE_SUCCESS', payload: {
            result: result
        }});
    }else{
        // error ならこっちの action を発行する
        yield put({type: 'RESPONSE_FAIL', payload: {
            err: error
        }});
    }
}

// ここで指定されている action type が watch される状態になり……
// 該当の action が発行された際には第二引数の関数がコールされる
// ここで export している redux-saga.effects.takeEvery の戻り値を
// src/saga/index.js 側で import しており、複数の saga を同時に設定できるようにしている
const saga = takeEvery('REQUEST_TO', getRequest);
export default saga;


