
export default class AppActionCreator {
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
