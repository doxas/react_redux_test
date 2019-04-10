
// from package
import React from 'react';
import {shallow, mount, render} from 'enzyme';

// target component of test
import Splitter from '../../src/component/splitter/Splitter.js';

describe('component/splitter/Splitter.js', () => {
    // Splitter の shallowWrapper
    let wrapper;
    // Splitter の実インスタンス用
    let instance;
    // onChangeRatio に仕掛ける mock
    let onChangeRatioMock = jest.fn();
    // まず最初に shallowWrapper を生成し、実インスタンスを取得しておく
    beforeAll(() => {
        wrapper = shallow(
            <Splitter
                splitDirection={Splitter.SPLIT_DIRECTION_HORIZONTAL}
                firstChild={<div></div>}
                secondChild={<div></div>}
                onChangeRatio={onChangeRatioMock}
                ratio={0.5}
            />
        );
        instance = wrapper.instance();
    });
    test('static な定数の構成と値が正しいかどうか', () => {
        expect(Splitter.SPLIT_DIRECTION_HORIZONTAL).toBe('horizontal');
        expect(Splitter.SPLIT_DIRECTION_VERTICAL).toBe('vertical');
        expect(Splitter.SPLIT_DIRECTIONS).toBeInstanceOf(Array);
        expect(Splitter.SPLIT_DIRECTIONS.length).toBe(2);
        expect(Splitter.SPLIT_DIRECTIONS[0]).toBe(Splitter.SPLIT_DIRECTION_HORIZONTAL);
        expect(Splitter.SPLIT_DIRECTIONS[1]).toBe(Splitter.SPLIT_DIRECTION_VERTICAL);
    });
    test('Splitter の DOM 構造が正しいかどうか', () => {
        expect(wrapper.hasClass('splitter')).toBeTruthy();
        expect(wrapper.hasClass(Splitter.SPLIT_DIRECTION_HORIZONTAL)).toBeTruthy();
        expect(wrapper.children().at(0).props().className).toEqual('inner');
        expect(wrapper.children().at(0).props().style).toEqual({height: '50%'});
        expect(wrapper.children().at(1).props().className).toEqual('split');
        expect(wrapper.children().at(2).props().className).toEqual('inner');
        expect(wrapper.children().at(2).props().style).toEqual({height: '50%'});
    });
    test('Splitter.generateRatio が正しい結果を返しているか', () => {
        expect(instance.generateRatio(Splitter.SPLIT_DIRECTION_HORIZONTAL, 0.5)).toEqual({
            first: {height: '50%'},
            second: {height: '50%'}
        });
        expect(instance.generateRatio(Splitter.SPLIT_DIRECTION_VERTICAL, 0.5)).toEqual({
            first: {width: '50%'},
            second: {width: '50%'}
        });
    });
    test('Splitter.mouseDown が正しく動作しているか', () => {
        // マウスイベントをエミュレートするための仮のオブジェクト
        let mouseEvent = {
            clientX: 50,
            clientY: 50,
            preventDefault: () => {}
        }
        // addEventListener が呼ばれた場合をエミュレートするために、登録された
        // Listener をオブジェクトに確保しておき、任意に呼び出せるようにしておく
        let addMap = {};
        let removeMap = {};
        window.addEventListener = jest.fn((event, listener) => {
            // イベント名をキーにして保持
            addMap[event] = listener;
        });
        window.removeEventListener = jest.fn((event, listener) => {
            // イベント名をキーにして保持
            removeMap[event] = listener
        });
        // ref の中身もエミュレートする必要があるので、コンポーネントの内部で
        // 使われている メソッドやその戻り値を準備しておく
        instance.refWrapper.current = {getBoundingClientRect: () => {
            return {
                left: 0,
                top: 0,
                height: 100,
                width: 100
            };
        }};
        // まず一度該当のメソッドを呼ぶ
        instance.mouseDown();
        // mousemove に登録された関数に対して疑似マウスイベントを渡し実行する
        addMap.mousemove(mouseEvent);
        // 網羅的にチェックするために props を差し替えてもう一度呼んでおく
        wrapper.setProps({splitDirection: Splitter.SPLIT_DIRECTION_VERTICAL});
        addMap.mousemove(mouseEvent);
        // mouseup のほうも実行しておく
        addMap.mouseup(mouseEvent);
        // ここまではすべて事前の準備で、以下からその結果をチェックしていく
        // onChangeRatio が合計２回呼び出されているかどうか
        expect(onChangeRatioMock).toHaveBeenCalledTimes(2);
        // それぞれの呼び出しにおいて mock に渡された引数の値が正しいかどうか
        expect(onChangeRatioMock.mock.calls[0][0]).toBe(0.5);
        expect(onChangeRatioMock.mock.calls[1][0]).toBe(0.5);
        // removeEventListener は正しく呼び出されたかどうか
        expect(Object.keys(removeMap).length).toBe(2);
    });
});


