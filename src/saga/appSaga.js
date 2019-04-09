
// from package
import {call, put, takeEvery} from 'redux-saga/effects';
import '@babel/polyfill';

// from source
import action from '../action/appAction.js';
import Api from '../api/index.js';

// この getRequest は、よく見るとわかるが `function*` とアスタリスク付きで関数が
// 定義されており、このような関数を JavaScript では Generator 関数と呼ぶ。
// Generator 関数は当然引数を取ることができ、通常の関数と同じように呼び出すことが
// できるが、saga の仕組み的に「特定の action が発行されたとき」だけに限定して
// Generator 関数が呼び出されることになる（ここでは `REQUEST_TO` が対象）ので、
// 実質引数に action を取っても意味がなく、要するに以下のようにすることは無意味。
// export function* getRequest(action){ // ← 引数で action を受け取ろうとしている
//
// つまり、action を引数から取るのではなく、このファイル内で payload の内容までは
// 固定で動作させるべきであって、そのためにファイル冒頭で action も import している。
//
// 要するにユニットテスト的な観点では、ひとつの Generator 関数を複数のケースで呼び出し、
// 引数に応じて挙動を分けるとかそういう実装はするべきではなく、対象の関数は常に共通した
// 挙動をするように設計することが好ましい。
// その文脈で言うと、以下の getRequest 関数は action.doubleClickRequest で発行される
// アクション、つまり `REQUEST_TO` 専用とみなすことができるし、他のアクションに対して
// この関数が反応するようにすべきではない。そうすることで、影響範囲をより狭く限定できる。
export function* getRequest(){
    // 対象の action の payload を取り出す
    let payload = action.doubleClickRequest().payload;
    // 取り出した payload を使って Api.getRequest を実行（非同期）した結果を受けて……
    let response = yield call(Api.getRequest, payload);
    // 非同期で得られた Api.getRequest の結果を元に処理を分岐する
    if(response != null && response.error == null){
        // error じゃなければこっちの action を発行する
        yield put({
            type: 'RESPONSE_SUCCESS',
            payload: {result: response.result}
        });
    }else if(response != null && response.error != null){
        // error ならこっちの action を発行する
        yield put({
            type: 'RESPONSE_FAIL',
            payload: {error: response.error}
        });
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


