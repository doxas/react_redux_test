
import React from 'react';
import PropTypes from 'prop-types';
import './Splitter.css';
import Util from '../../util.js';

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
     * 0.0 ～ 1.0 の数値をパーセンテージ単位の割合いに変換する
     * @param {string} direction - 分割する方向
     * @param {number} [ratio=0.5] - 元となる正規化された係数
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
            case 'vertical':
                first.width  = `${firstRatio}%`;
                second.width = `${secondRatio}%`;
                break;
            case 'horizontal':
                first.height  = `${firstRatio}%`;
                second.height = `${secondRatio}%`;
                break;
        }
        return {
            first: first,
            second: second
        };
    }

    render(){
        let classNameArray = ['splitter', this.props.splitDirection];
        let joinedClassName = classNameArray.join(' ');
        let ratio = this.generateRatio(this.props.splitDirection, this.props.ratio);
        return (
            <div className={joinedClassName}>
                <div className='inner' style={ratio.first}>{this.props.firstChild}</div>
                <div className='split'></div>
                <div className='inner' style={ratio.second}>{this.props.secondChild}</div>
            </div>
        );
    }
}

Splitter.propTypes = {
    splitDirection: PropTypes.oneOf([
        Splitter.SPLIT_DIRECTION_HORIZONTAL,
        Splitter.SPLIT_DIRECTION_VERTICAL
    ]).isRequired,
    ratio:          PropTypes.number,
    firstChild:     PropTypes.node.isRequired,
    secondChild:    PropTypes.node.isRequired
};
