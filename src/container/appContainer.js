
// from package
import React from 'react';
import {connect} from 'react-redux';

// from source
import component from '../component/app/App.js'
import actionCreator from '../action/appAction.js'

// store の state をどのように props に mapping するか
export function mapStateToProps(state, props){
    return {
        value: state.app.value,
        ratio: state.app.ratio,
    };
}

// store の dispatch を伴う関数をどのように props にメソッドとして mapping するか
export function mapDispatchToProps(dispatch){
    return {
        clickContainer: (evt) => {
            evt.preventDefault();
            dispatch(actionCreator.clickChildNode());
        },
        changeRatio: (ratio) => {
            dispatch(actionCreator.mousemoveFromSplitter(ratio));
        },
    };
}

// react-redux.connect でコンポーネントの props に state を関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(component)
