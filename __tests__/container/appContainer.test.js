
// from source
import action from '../../src/action/appAction.js';
import {mapStateToProps} from '../../src/container/appContainer.js';
import {mapDispatchToProps} from '../../src/container/appContainer.js';
import {INITIAL_STATE} from '../../src/reducer/appReducer.js';

describe('container/appContainer.js', () => {
    test('check exists for reducer initial state and mapStateToProps', () => {
        // mapStateToProps は state が更新された際に、Store から state を
        // 受け取って整形した上で返してくるので「整形後に意図した形になっているか」
        // をテストによって確認する。
        // ここでは単に、Reducer 側にある初期ステートと同じ状態に揃っているかを見ている。
        let fromMapStateToProps = mapStateToProps({app: INITIAL_STATE});
        expect(fromMapStateToProps).toEqual(INITIAL_STATE);
    });

    test('check had called dispatch function', () => {
        // ここでは Jest の mock を生成して、これを dispatch メソッドの代わりにコールさせる。
        // mock の引数に渡された内容が正しい action になっているのかをチェックしている。
        let mockFunction = jest.fn();
        mapDispatchToProps(mockFunction).clickRequest({preventDefault: () => {}});
        mapDispatchToProps(mockFunction).clickContainer({preventDefault: () => {}});
        mapDispatchToProps(mockFunction).changeRatio(0.5);
        expect(mockFunction.mock.calls[0]).toEqual([action.doubleClickRequest()]);
        expect(mockFunction.mock.calls[1]).toEqual([action.clickChildNode()]);
        expect(mockFunction.mock.calls[2]).toEqual([action.mousemoveFromSplitter(0.5)]);
    });
});

