
const INITIAL_STATE = {
    fuga: 999
};

// use optional state at first call of reducer
export default function appReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'HOGE':
            return {fuga: state.fuga + 1};
        default:
            return state;
    }
}
