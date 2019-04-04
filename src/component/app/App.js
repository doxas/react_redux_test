
import React from 'react';
import Splitter from '../splitter/Splitter.js';
import './App.css';

export default class App extends React.Component {
    render(){
        return (
            <div className='app' onClick={this.props.clicker}>
                <Splitter
                    splitDirection={Splitter.SPLIT_DIRECTION_HORIZONTAL}
                    ratio={0.3}
                    firstChild={<div>{this.props.fuga}</div>}
                    secondChild={<div>{this.props.fuga}</div>}
                />
            </div>
        );
    }
}
