
// from package
import React from 'react';
import {shallow, mount, render} from 'enzyme';

// target component of test
import Splitter from '../../src/component/splitter/Splitter.js';

describe('component/splitter/Splitter.js', () => {
    let wrapper;
    let mock = jest.fn();
    beforeAll(() => {
        wrapper = shallow(
            <Splitter
                splitDirection={Splitter.SPLIT_DIRECTION_HORIZONTAL}
                firstChild={<div></div>}
                secondChild={<div></div>}
                onChangeRatio={mock}
                ratio={0.5}
            />
        );
    });
    test('construction in a component', () => {
        expect(wrapper.hasClass('splitter')).toBeTruthy();
        expect(wrapper.hasClass(Splitter.SPLIT_DIRECTION_HORIZONTAL)).toBeTruthy();
        expect(wrapper.children().get(0).props.className).toEqual('inner');
        expect(wrapper.children().get(0).props.style).toEqual({height: '50%'});
        expect(wrapper.children().get(1).props.className).toEqual('split');
        expect(wrapper.children().get(2).props.className).toEqual('inner');
        expect(wrapper.children().get(2).props.style).toEqual({height: '50%'});
    });
});


