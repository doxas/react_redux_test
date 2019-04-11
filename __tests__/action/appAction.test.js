
// from source
import action from '../../src/action/appAction.js';

describe('action/appAction.js', () => {
    test('clickChildNode', () => {
        let ret = action.clickChildNode();
        // 一見冗長に見えるが……
        // actionCreator が type メンバを持つオブジェクトを返しているか
        // を正しくテストすることは意味があるので一応やる
        expect(ret).toMatchObject({
            type: 'CLICK_CONTAINER'
        });
    });
    test('mousemoveFromSplitter', () => {
        let ratio = 0.25;
        let ret = action.mousemoveFromSplitter(ratio);
        // これもやっぱり一見冗長に見えるが……
        // 引数に与えた値が変化せずに返ってくること、オブジェクトが
        // payload などの属性を持っていることを確かめているので一応意味はある……のか……
        expect(ret).toMatchObject({
            type: 'MOUSEMOVE_FROM_SPLITTER',
            payload: {
                ratio: ratio
            }
        });
    });
});

// まだ非同期な処理が実装されていないのでこれで済んでるが
// 場合により書き足す可能性が出ることも考えられるので一応
// このファイル自体は残しておく

// おそらく、ActionCreator を「ただオブジェクト返すマン」として
// 運用することに意味がある気がするので、本当に単にオブジェクトを
// 返すだけで一切のロジックを持たないのであれば、テスト書いても
// ただ手間が増えるだけで意味が薄いから、その場合は不要かもしれない


