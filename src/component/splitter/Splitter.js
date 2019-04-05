
// from package
import React from 'react';
import PropTypes from 'prop-types';

// from source
import Util from '../../util.js';

// current css
import './Splitter.css';

export default class Splitter extends React.Component {
    /**
     * 水平方向
     * @type {string}
     */
    static get SPLIT_DIRECTION_HORIZONTAL(){return 'horizontal';}
    /**
     * 垂直方向
     * @type {string}
     */
    static get SPLIT_DIRECTION_VERTICAL()  {return 'vertical';}
    /**
     * スプリッタを設定できる向き
     * @type {Array.<string>}
     */
    static get SPLIT_DIRECTIONS(){return [Splitter.SPLIT_DIRECTION_HORIZONTAL, Splitter.SPLIT_DIRECTION_VERTICAL];}

    /**
     * @constructor
     */
    constructor(props){
        super(props);

        // initial properties =================================================
        // this.hoge = null;

        // create refs ========================================================
        this.refWrapper = React.createRef();

        // self binding =======================================================
        this.mouseDown = this.mouseDown.bind(this);
    }

    /**
     * 0.0 ～ 1.0 の数値をパーセンテージ単位の割合いに変換する
     * @param {string} direction - 分割する方向
     * @param {number} [ratio=0.5] - 正規化された係数（0.0 ~ 1.0）
     * @return {object}
     * @property {object} first - 最初の要素の割合いを表すパーセンテージの文字列
     * @property {object} second - ふたつ目の要素の割合いを表すパーセンテージの文字列
     */
    generateRatio(direction, ratio = 0.5){
        let firstRatio = Math.floor(Util.Math.saturate(ratio, 0.0, 1.0) * 100);
        let secondRatio = 100 - firstRatio;
        let first  = {};
        let second = {};
        switch(direction){
            case Splitter.SPLIT_DIRECTION_VERTICAL:
                first.width  = `${firstRatio}%`;
                second.width = `${secondRatio}%`;
                break;
            case Splitter.SPLIT_DIRECTION_HORIZONTAL:
                first.height  = `${firstRatio}%`;
                second.height = `${secondRatio}%`;
                break;
        }
        return {
            first: first,
            second: second
        };
    }

    /**
     * onmousedown
     * @param {MouseEvent} evt
     */
    mouseDown(evt){
        let wrapper = this.refWrapper.current;
        let moveListener = (evt) => {
            evt.preventDefault();
            let bound = wrapper.getBoundingClientRect();
            let x = Math.max(evt.clientX - bound.left, 0);
            let y = Math.max(evt.clientY - bound.top, 0);
            let ratio = null;
            if(this.props.splitDirection === Splitter.SPLIT_DIRECTION_HORIZONTAL){
                ratio = y / bound.height;
            }else{
                ratio = x / bound.width;
            }
            this.props.onChangeRatio(ratio);
        };
        let upListener = () => {
            window.removeEventListener('mousemove', moveListener);
            window.removeEventListener('mouseup', upListener);
        };
        window.addEventListener('mousemove', moveListener, false);
        window.addEventListener('mouseup', upListener, false);
    }

    render(){
        let classNameArray = ['splitter', this.props.splitDirection];
        let joinedClassName = classNameArray.join(' ');
        let ratio = this.generateRatio(this.props.splitDirection, this.props.ratio);
        return (
            <div ref={this.refWrapper} className={joinedClassName}>
                <div className='inner' style={ratio.first}>{this.props.firstChild}</div>
                <div className='split' onMouseDown={this.mouseDown}></div>
                <div className='inner' style={ratio.second}>{this.props.secondChild}</div>
            </div>
        );
    }
}

/**
 * @prop {string} splitDirection - SPLIT_DIRECTIONS で得られるいずれかの文字列で指定する分割方向
 * @prop {number} ratio - 0.0 ～ 1.0 で指定する分割時の割合い
 * @prop {Node} firstChild - 最初の要素
 * @prop {Node} secondChild - ふたつ目の要素
 * @prop {function} onChangeRatio - マウスが動いた際に求めた ratio を引数に受け取る関数
 */
Splitter.propTypes = {
    splitDirection: PropTypes.oneOf([
        Splitter.SPLIT_DIRECTION_HORIZONTAL,
        Splitter.SPLIT_DIRECTION_VERTICAL
    ]).isRequired,
    firstChild:     PropTypes.node.isRequired,
    secondChild:    PropTypes.node.isRequired,
    onChangeRatio:  PropTypes.func.isRequired,
    ratio:          PropTypes.number,
};

