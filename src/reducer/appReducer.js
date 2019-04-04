
const INITIAL_STATE = {
    value: 999,
    ratio: 0.5,
};

// use optional state at first call of reducer
export default function appReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'CLICK_CONTAINER':
            return Object.assign({}, state, {value: state.value + 1});
        case 'MOUSEMOVE_FROM_SPLITTER':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
