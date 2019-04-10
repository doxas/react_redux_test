
// target reducer of test
import action from '../../src/action/appAction.js';
import reducer, {INITIAL_STATE} from '../../src/reducer/appReducer.js';

// reducer のテストにおいては、指定した action に応じて正しい構造の
// オブジェクト（state にあたるもの）が返されているかを確認する。
// ただし非同期処理については、API を呼び出したあとにどのような
// action を発行するかは appAction.js には定義されていないので、
// 恐らくハードコーディングするしかない。しかしこの場合も、期待して
// いない構造の間違った state が返されていないかを確認することは可能。
// 逆に言うと、ここではあくまでも「state として正しい構造か？」ということしか見ない。

describe('reducer/appReducer.js', () => {
    test('CLICK_CONTAINER', () => {
        expect(reducer(INITIAL_STATE, action.clickChildNode())).toEqual({
            ...INITIAL_STATE,
            value: INITIAL_STATE.value + 1
        });
    });
    test('MOUSEMOVE_FROM_SPLITTER', () => {
        let ratio = 0.25;
        expect(reducer(INITIAL_STATE, action.mousemoveFromSplitter(ratio))).toEqual({
            ...INITIAL_STATE,
            ratio: ratio
        });
    });
    test('RESPONSE_SUCCESS', () => {
        let context = 'test at success';
        expect(reducer(INITIAL_STATE, {
            type: 'RESPONSE_SUCCESS',
            payload: {result: context}
        })).toEqual({
            ...INITIAL_STATE,
            context: context
        });
    });
    test('RESPONSE_SUCCESS at error in response', () => {
        let context = 'test at error';
        expect(reducer(INITIAL_STATE, {
            type: 'RESPONSE_SUCCESS',
            payload: {result: {error: context}}
        })).toEqual({
            ...INITIAL_STATE,
            context: context
        });
    });
    test('RESPONSE_FAIL', () => {
        let context = 'error message';
        expect(reducer(INITIAL_STATE, {
            type: 'RESPONSE_FAIL',
            payload: {error: {message: context}}
        })).toEqual({
            ...INITIAL_STATE,
            context: context
        });
    });
    test('other case', () => {
        expect(reducer(INITIAL_STATE, {type: 'none'})).toEqual(INITIAL_STATE);
    });
});

