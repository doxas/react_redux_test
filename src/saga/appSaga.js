
// from package
import {call, put, takeEvery} from 'redux-saga/effects';
import '@babel/polyfill';

// from source
import action from '../action/appAction.js';
import Api from '../api/index.js';

// この getRequest は、function* とアスタリスク付きで関数が定義されており
// このような関数を JavaScript では Generator 関数と呼ぶ。
// Generator 関数は当然引数を取ることができ、通常の関数と同じように呼び出すことが
// できるが、saga の仕組み的に「特定の action が発行されたとき」だけに限定して
// Generator 関数は呼び出されることになる（ここで言う `REQUEST_TO`）ので、
// 実質引数に action を取っても意味がなく、要するに以下のようにすることは無意味
// export function* getRequest(action){
//
// つまり、action を引数から取るのではなく、このファイル内で payload の内容までは
// 固定で動作させるべきである。
// export function* getRequest(){
//     let response = yield call(Api.getRequest, 何らかの固定の定数);
export function* getRequest(){
    // 対象の action の payload を取り出す
    let payload = action.doubleClickRequest().payload;
    // 取り出した payload を使って Api.getRequest を実行（非同期）した結果を受けて……
    let response = yield call(Api.getRequest, payload);
    // 非同期で得られた Api.getRequest の結果を元に処理を分岐する
    if(response != null && response.error == null){
        // error じゃなければこっちの action を発行する
        yield put({type: 'RESPONSE_SUCCESS', payload: {
            result: response.result
        }});
    }else if(response != null && response.error != null){
        // error ならこっちの action を発行する
        yield put({type: 'RESPONSE_FAIL', payload: {
            error: response.error
        }});
    }
}

// ここで指定されている action type が watch される状態になり……
// 該当の action が発行された際には第二引数の関数がコールされる
// ここで export している redux-saga.effects.takeEvery の戻り値を
// src/saga/index.js 側で import しており、複数の saga を同時に設定できるようにしている
const saga = [
    takeEvery('REQUEST_TO', getRequest),
];
export default saga;


