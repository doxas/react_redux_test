
import React from 'react';
import {connect} from 'react-redux';

import App from '../component/app/App.js'
import actionCreator from '../action/appAction.js'

// redux の state をどのように Props に変換するか
function mapStateToProps(state){
    return {
        fuga: state.app.fuga
    };
}

// store の dispatch をどのように Props のメソッドとして利用するか
function mapDispatchToProps(dispatch){
    return {
        clicker: () => {
            // action creator を実行してアクション（Pure Object）を生成
            dispatch(actionCreator.hoge());
        }
    };
}

// react-redux.connect でコンポーネントの props に state を関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(App)
