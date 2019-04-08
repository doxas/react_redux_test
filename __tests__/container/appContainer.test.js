
// target reducer of test
import {mapStateToProps} from '../../src/container/appContainer.js';
import {INITIAL_STATE} from '../../src/reducer/appReducer.js';

describe('container/appContainer.js', () => {
    test('check exists for reducer initial state and mapStateToProps', () => {
        let fromMapStateToProps = mapStateToProps({app: INITIAL_STATE});
        expect(fromMapStateToProps).toEqual(INITIAL_STATE);
    });
});

