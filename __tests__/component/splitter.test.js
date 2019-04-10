
// from package
import React from 'react';
import {shallow, mount, render} from 'enzyme';

// target component of test
import Splitter from '../../src/component/splitter/Splitter.js';

describe('component/splitter/Splitter.js', () => {
    let wrapper;
    let instance;
    let onChangeRatioMock = jest.fn();
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
    test('static properties', () => {
        expect(Splitter.SPLIT_DIRECTION_HORIZONTAL).toBe('horizontal');
        expect(Splitter.SPLIT_DIRECTION_VERTICAL).toBe('vertical');
        expect(Splitter.SPLIT_DIRECTIONS).toBeInstanceOf(Array);
        expect(Splitter.SPLIT_DIRECTIONS.length).toBe(2);
        expect(Splitter.SPLIT_DIRECTIONS[0]).toBe(Splitter.SPLIT_DIRECTION_HORIZONTAL);
        expect(Splitter.SPLIT_DIRECTIONS[1]).toBe(Splitter.SPLIT_DIRECTION_VERTICAL);
    });
    test('construction in a component', () => {
        expect(wrapper.hasClass('splitter')).toBeTruthy();
        expect(wrapper.hasClass(Splitter.SPLIT_DIRECTION_HORIZONTAL)).toBeTruthy();
        expect(wrapper.children().at(0).props().className).toEqual('inner');
        expect(wrapper.children().at(0).props().style).toEqual({height: '50%'});
        expect(wrapper.children().at(1).props().className).toEqual('split');
        expect(wrapper.children().at(2).props().className).toEqual('inner');
        expect(wrapper.children().at(2).props().style).toEqual({height: '50%'});
    });
    test('Splitter.generateRatio', () => {
        expect(instance.generateRatio(Splitter.SPLIT_DIRECTION_HORIZONTAL, 0.5)).toEqual({
            first: {height: '50%'},
            second: {height: '50%'}
        });
        expect(instance.generateRatio(Splitter.SPLIT_DIRECTION_VERTICAL, 0.5)).toEqual({
            first: {width: '50%'},
            second: {width: '50%'}
        });
    });
    test('Splitter.mouseDown', () => {
        let mouseEvent = {
            clientX: 50,
            clientY: 50,
            preventDefault: () => {}
        }
        let addMap = {};
        let removeMap = {};
        window.addEventListener = jest.fn((event, listener) => {
            addMap[event] = listener;
        });
        window.removeEventListener = jest.fn((event, listener) => {
            removeMap[event] = listener
        });
        instance.refWrapper.current = {getBoundingClientRect: () => {
            return {
                left: 0,
                top: 0,
                height: 100,
                width: 100
            };
        }};
        instance.mouseDown();
        addMap.mousemove(mouseEvent);
        addMap.mouseup(mouseEvent);
        expect(onChangeRatioMock).toHaveBeenCalledTimes(1);
        expect(onChangeRatioMock.mock.calls[0][0]).toBe(0.5);
        expect(Object.keys(removeMap).length).toBe(2);
    });
});


