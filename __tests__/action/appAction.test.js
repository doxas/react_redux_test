
// target component of test
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


