
// use optional state at first call of reducer
export default function reducer(state, action){
    switch(action.type){
        case 'HOGE':
            return {fuga: state.fuga + 1};
        default:
            return state;
    }
}
