
// target reducer of test
import action from '../../src/action/appAction.js';
import reducer, {INITIAL_STATE} from '../../src/reducer/appReducer.js';

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
});

