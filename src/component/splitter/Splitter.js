
import React from 'react';
import './Splitter.css';
import Util from '../../util.js';

export default class Splitter extends React.Component {
    render(){
        let classNames = ['splitter'];
        classNames.push(this.props.splitDirection);
        let firstRatio = Math.floor(Util.Math.saturate(this.props.ratio, 0.0, 1.0) * 100);
        let secondRatio = 100 - firstRatio;
        let first  = {};
        let second = {};
        if(this.props.splitDirection === 'horizontal'){
            first.height  = `${firstRatio}%`;
            second.height = `${secondRatio}%`;
        }else{
            first.width  = `${firstRatio}%`;
            second.width = `${secondRatio}%`;
        }
        return (
            <div className={classNames.join(' ')}>
                <div className='inner' style={first}>{this.props.firstChild}</div>
                <div className='split'></div>
                <div className='inner' style={second}>{this.props.secondChild}</div>
            </div>
        );
    }
}
