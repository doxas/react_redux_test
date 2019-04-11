
// from package
import React from 'react';
import {shallow, mount, render} from 'enzyme';

// from source
import App from '../../src/component/app/App.js';

describe('component/app/App.js', () => {
    let mock = jest.fn();
    test('Splitter が含まれるかどうか', () => {
        // Splitter は props としてメソッド（関数）を受け取る。
        // これは省略されることを許可されていないので mock を使って代替してやらないと
        // 「関数が必要なのに指定されてませんよ！」と PropTypes が怒るため、Jest の mock 機能で
        // 仮の関数（mock）を生成して最終的に Splitter.props.onChangeRatio に渡ることになる
        // changeRatio に指定するようにしている。
        // App.js の render メソッドをよーく観察すればわかるが、他のプロパティは省略できるか、
        // あるいはそのままなにかしらの値が渡るようになっており、onChangeRatio のところだけが
        // mock を使わないと undefined が渡ってしまう構造になっている。
        let wrapper = shallow(<App changeRatio={mock} />);
        // Splitter はわざわざ実態を import しなくても名前で一致確認できる
        expect(wrapper.find('Splitter').length).toBe(1);
    });

    test('App 自身がクリックされたときの props.clickContainer の呼び出し', () => {
        // App 側では、メソッドが「呼び出されているかどうか」だけをテストする。
        // 呼び出されている場合にどのような挙動になるべきなのかは、実際には App の
        // 中身ではなく appReducer.js 側にあるため、そちらでテストするのが正しい。
        let clickContainerMock = jest.fn();
        let wrapper = shallow(<App changeRatio={mock} clickContainer={clickContainerMock} />);
        let wrap = wrapper.find('.app');
        wrap.simulate('click');
        expect(clickContainerMock).toHaveBeenCalled();
    });

    // 上記のように shallow をそれぞれのテストブロックのなかで行ってもよいが、
    // 最初に一度だけ実行しておくようにしたければ beforeAll を使えばよい。
    // 変数のスコープを describe のブロック全体になるようにして宣言し、そこに
    // beforeAll 内で shallowWrapper を取得すればよい。
});


