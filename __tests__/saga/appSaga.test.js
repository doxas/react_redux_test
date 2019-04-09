
// from package
import {call, put, takeEvery} from 'redux-saga/effects';
import '@babel/polyfill';

// from source
import saga, {getRequest} from '../../src/saga/appSaga.js';
import action from '../../src/action/appAction.js';
import Api from '../../src/api/index.js';

// saga を利用した非同期処理のテストでは、実際に通信結果がどうなるか、ということについては
// 無視しつつ、仮にうまくいったとしたらどうなるか、うまくいかなかったとしたらどうなるか、
// ということをユニットテストによって確かめる必要がある。
// この「結果がどうなったかを仮の結果を使って指定しつつテストする」を実現するために、
// JavaScript の Generator 関数の仕組みを利用している。

describe('saga/appSaga.js', () => {
    test('export default されている saga が配列に入っているか', () => {
        expect(saga).toBeInstanceOf(Array);
        expect(saga.length).toBe(1);
    });
    test('配列に入っている saga が正しい構造をしているか', () => {
        expect(saga[0]).toEqual(takeEvery('REQUEST_TO', getRequest));
    });
    test('getRequest が成功した場合の挙動が正しいか', () => {
        // Generator 関数を生成する
        let generator = getRequest();

        // 最初の yield まで実行し、yield の右辺の式の結果を変数 ret に受ける。
        // Generator.next() の戻り値は {value: any, done: boolean} というオブジェクトになっている。
        // つまり以下の next の戻り値の value が、appSaga.getRequest 内に書かれている call の戻り値
        // であり、同じ条件で生成した call の戻り値との toEqual で比較してテストしている。
        let ret = generator.next();
        expect(ret.value).toEqual(call(Api.getRequest, action.doubleClickRequest().payload));

        // また、Generator.next() は、引数に何かを与えるとそれを「直近の yield の戻り値」として
        // 使えるという機能がある。これにより、上記の call がどのような結果になったのかを
        // 擬似的に作ったオブジェクトなどで代替させ、続く次の yield までの処理を実行できる。
        let testResponse = {result: 'something response', error: null};
        ret = generator.next(testResponse);
        expect(ret.value).toEqual(put({
            type: 'RESPONSE_SUCCESS',
            payload: {result: testResponse.result}
        }));

        // Generator 関数が最後まで実行されたことになっているかを確認
        ret = generator.next();
        expect(ret.done).toBeTruthy();
    });
    test('getRequest がエラーになった場合の挙動が正しいか', () => {
        let generator = getRequest();
        let ret = generator.next();
        expect(ret.value).toEqual(call(Api.getRequest, action.doubleClickRequest().payload));
        let testResponse = {result: null, error: 'something error'};
        ret = generator.next(testResponse);
        expect(ret.value).toEqual(put({
            type: 'RESPONSE_FAIL',
            payload: {error: testResponse.error}
        }));
        ret = generator.next();
        expect(ret.done).toBeTruthy();
    });
});

