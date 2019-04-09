
export default class AppActionCreator {
    static doubleClickRequest(){
        return {
            type: 'REQUEST_TO',
            payload: {
                target: 'other server'
            }
        };
    }
    static clickChildNode(){
        return {
            type: 'CLICK_CONTAINER',
        };
    }
    static mousemoveFromSplitter(ratio){
        return {
            type: 'MOUSEMOVE_FROM_SPLITTER',
            payload: {
                ratio: ratio
            }
        };
    }
}
