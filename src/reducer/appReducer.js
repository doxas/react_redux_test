
export const INITIAL_STATE = {
    value: 999,
    ratio: 0.5,
    context: ''
};

// use optional state at first call of reducer
export default function appReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'CLICK_CONTAINER':
            return Object.assign({}, state, {value: state.value + 1});
        case 'MOUSEMOVE_FROM_SPLITTER':
            return Object.assign({}, state, action.payload);
        case 'RESPONSE_SUCCESS':
            if(action.payload.result.hasOwnProperty('error') === true){
                return Object.assign({}, state, {context: action.payload.result.error});
            }else{
                return Object.assign({}, state, {context: JSON.stringify(action.payload.result)});
            }
        case 'RESPONSE_FAIL':
            let errMessage = action.payload.error.message;
            return Object.assign({}, state, {context: errMessage});
        default:
            return state;
    }
}
