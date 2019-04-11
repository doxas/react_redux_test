
# react redux test

test.

## overview

`src/util.js` は React や Redux には直接関係のないユーティリティ。

`src/script.js` がクライアントの実装のエントリポイントとなる。

`src/script.js` では `src/reducer/index.js` が `import` されている。これは複数の reducer を束ねたもので同階層にある `xxxxReducer.js` を `import` している。

```javascript
// src/reducer/index.js

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

reducer は Store にアクセスできるが、reducer 自身がなにか特別な意図を持って Store に働きかけるわけではなく、あくまでも「外部からの干渉」によって Store に働きかける。

この外部からの干渉が action である。

action は、その干渉がどのような意図を持っているのかを `type` というメンバで表現した、一種の手形のようなもので、これは単なる JavaScript のオブジェクトである。

```javascript
{
    type: 'NANKA_NO_ACTION'
}
```

reducer はこのようなピュアなオブジェクトで表現された action を受け取った際、これを処理しようと試みる。

> ※ これを「reducer に対して action を dispatch する」と表現する

reducer の定義のなかに、該当するアクションタイプを受け取った場合に行うべき処理の定義が存在する場合、reducer は神聖なる領域 Store を「更新のために完全に新しく生成された state」で上書きしようとする。

> ※ Store には、state がたくさん詰まっている。Store に出し入れできるのは state だけであり、格納するときも、また引き出すときも、それらは常に state と呼ばれる。

```javascript
// state の初期値は reducer が初期化されたときに自然に store に格納されるように、
// reducer のデフォルト引数として渡してしまう方法が用いられる
const INITIAL_STATE = {
    value: 0
};

export default function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'NANKA_NO_ACTION':
            // アクション名 'NANKA_NO_ACTION' に対する新しい state を生成し返す
            // 本来の state を直接上書きしてしまうのではなく、完全な新しい
            // ピュアオブジェクトを生成するために Object.assign を使っている
            return Object.assign({}, state, {
                value: state.value + 1,
            });
        default:
            // 該当するものがない場合 state をそのまま返す
            return state;
    }
}
```

これでめでたく、神聖なる Store に新しい state が与えられ、状態が更新される。

Store の状態が更新されたら、続いてはここで更新された内容をビューに反映させなくてはならない。

これには（component の代表者であるところの） container が活躍する。いわば、神の声を庶民にもわかるように通訳する神官のようなものである。

```javascript
// from package
import React from 'react';
import {connect} from 'react-redux';

// from source
import component from '../component/app/App.js'
import actionCreator from '../action/appAction.js'

// store の state をどのように props に mapping するか
function mapStateToProps(state){
    return {
        value: state.app.value,
    };
}

// store の dispatch を伴う関数をどのように props にメソッドとして mapping するか
function mapDispatchToProps(dispatch){
    return {
        clickContainer: (evt) => {
            evt.preventDefault();
            dispatch(actionCreator.clickChildNode());
        },
    };
}

// react-redux.connect でコンポーネントの props に state を関連付ける
export default connect(mapStateToProps, mapDispatchToProps)(component)
```

`react-redux` というパッケージが提供する `connect` メソッドは、ふたつの引数にそれぞれ関数を受け取り、戻り値として関数を返してくるので、そこにコンポーネント（ここでは `App` コンポーネント）を与えてコールする。

ここで起こったことを端的に言うと「 `App` は state を props に変換する能力（すなわち神官としての能力）を手に入れた」ことになる。

どのように変換するのかは `mapStateToProps` と `mapDispatchToProps` によって決まる。

また、このように神官の力を手に入れたコンポーネントは **Container Component** と呼ばれる。

> ※ Container Component の配下には、当然その他の子コンポーネントたちが含まれることになるが、こちらは Presentational Components と呼ばれ区別される。

## 非同期処理

reducer へと action が dispatch される際に、その間に割り込んでくるのが middleware である。

middleware は一切設定されていなくても問題なく動作するようになっているが、非同期処理（多くはネットワーク越しの通信）が必要になる場合、action -> middleware -> reducer というように、間に一度クッションとして middleware が挟まる。

middleware は action を監視し、特定の action が発行された場合に限りそれをフックして動作する、という挙動を可能にする。（実際にはすべての action を見ている）

また、通信した結果などの非同期処理の完了を待ち、自らが新しい action を実行することができる。この仕組みのおかげで、通信を行った結果如何によって最終的に reducer に渡る action を差し替えることができるようになる。

## ユニットテスト

redux 実装のユニットテストを考える場合、実際にはユニットテストを行うこと（つまりチェック機構が正しく機能すること）を考慮した実装になっているのか、ということが重要。（これは redux 実装に限らないだろうが……）

基本的にすべてのソースコードは漏れなくテストされることが好ましいが、action が単なるオブジェクト生成器になっている場合、これは正直「単にオブジェクトの構造をふたつのファイルに手動で書き、それを見比べている」ということに過ぎず、あまり意味をなさない。

それよりも、定義されている action が正しく利用され、その結果 reducer が意図したとおりに動作し、Store が正しく更新されているのかということを重点にチェックしたほうがよい。

またコンポーネント内で state を個別に持たない、ということを極力心がけることで、コンポーネントはまさに単なる部品となりロジックが分離された構造になる。

middleware がいる場合、action は saga などのソースでも発行されることがあるため、その点のチェックがやや煩雑になる。これは実装でカバーできるかどうか検討が必要。




