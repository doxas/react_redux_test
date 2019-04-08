
// from package
import React from 'react';
import {shallow, mount, render} from 'enzyme';

// target component of test
import App from '../../src/component/app/App.js';

describe('component/app/App.js', () => {
    test('Splitter が含まれるかどうか', () => {
        // Splitter は props としてメソッド（関数）を受け取る。
        // shallow を使ってコンポーネントをレンダリングする場合でも、
        // PropTypes が isRequired な function については、 mock を
        // 使って代替してやらないと「関数が必要なのに指定されてませんよ！」
        // と PropTypes が怒るため、Jest の mock 機能で仮の関数（mock）を
        // 生成して最終的に Splitter.props.onChangeRatio に渡ることになる
        // changeRatio に指定するようにしている。
        let mock = jest.fn();
        let wrapper = shallow(<App changeRatio={mock} />);
        expect(wrapper.find('Splitter').length).toBe(1);
    });
});


