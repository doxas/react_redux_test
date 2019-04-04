
# react redux test

test.

## overview

`src/util.js` は React や Redux には直接関係のないユーティリティ。

`src/script.js` がクライアントの実装のエントリポイントとなる。

`src/script.js` では `src/reducer/index.js` が `import` されている。これは複数の reducer を束ねたもので同階層にある `xxxxReducer,js` を `import` している。

```javascript index.js
// redux が持つ combineReducers メソッドをインポート
import {combineReducers} from 'redux';
// reducer の実装をインポート
import appReducer from './appReducer.js';
// このファイルからは combineReducers の戻り値をエクスポートする
// 引数には、オブジェクト構造で reducer に key（以下の例では app）を付与しておく
// ここで与えた key が redux の state のルート直下にキーとしてぶら下がる格好になる
export default combineReducers({
    app: appReducer
});
```

reducer は、redux の Store を生成する際に、引数として与えられる。

このことからも想像できるが、reducer は「神聖なる Store にアクセスすることを許可された特別な存在」である。

reducer は Store にアクセスできるが、reducer 自身がなにか特別な意図を持って Store に働きかけるわけではなく、あくまでも「外部からの干渉」によって Store にアクセスするようになっている。

この外部からの干渉が action である。

action は、どのような意図を持っているのかを `type` というメンバで表現した、一種の手形のようなものである。

```javascript
{
    type: 'なんらかのアクションタイプ'
}
```

reducer はこのような（ピュアなオブジェクトで表現された）action を受け取った場合これを処理しようとする。（これを reducer に対して action を dispatch する、と表現する）

reducer の定義のなかに、該当するアクションタイプを受け取った場合に行うべき処理の定義が存在する場合、reducer は神聖なる領域 Store を「更新のために完全に新しく生成された state」で上書き更新しようとする。

> ※ Store には、state がたくさん詰まっている。Store に出し入れできるのは state だけであり、格納するときも、また引き出すときも、それらは常に state と呼ばれる。

```javascript
export default function reducer(state = {}, action){
    switch(action.type){
        case 'HOGE':
            // アクション名 'HOGE' に対する新しい state を生成する処理
            // 本来の state を直接上書きしてしまうのではなく、完全な新しい
            // ピュアオブジェクトを生成するために Object.assign を使っている
            return Object.assign({}, state, {
                fuga: state.fuga + 1,
            });
        default:
            // 該当するものがない場合 state をそのまま返す
            return state;
    }
}
```

これでめでたく、神聖なる Store に新しい state が与えられ、状態が更新される。

Store の状態が更新されたら、この更新処理をビューに反映させなくてはならない。

これには（component の代表者であるところの） container が活躍する。いわば、神の声を庶民にもわかるように通訳する神官のようなものである。

```javascript
import React from 'react';
import {connect} from 'react-redux';

import App from '../component/app/App.js'
import action from '../action/action.js'

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
            dispatch(action.hoge());
        }
    };
}

// react-redux.connect でコンポーネントの props に state を関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(App)
```

`react-redux` というパッケージが提供する `connect` メソッドは、ふたつの引数にそれぞれ関数を受け取り、戻り値として関数を返してくるので、そこにコンポーネント（ここでは `App` コンポーネント）を与えてコールする。

ここで起こったことを端的に言うと「 `App` は state を props に変換する能力（すなわち神官としての能力）を手に入れた」ことになる。

どのように変換するのかは `mapStateToProps` と `mapDispatchToProps` によって決まる。

また、このように神官の力を手に入れたコンポーネントは **Container Component** と呼ばれる。

> ※ Container Component の配下には、当然その他の子コンポーネントたちが含まれることになるが、こちらは Presentational Components と呼ばれ区別される。



