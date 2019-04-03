
import React from 'react';
import './App.css';
import Splitter from '../splitter/Splitter.js';

export default class App extends React.Component {
    render(){
        return (
            <div className='app' onClick={this.props.clicker}>
                <Splitter
                    splitDirection='horizontal'
                    ratio={0.3}
                    firstChild={<div>{this.props.fuga}</div>}
                    secondChild={<div>{this.props.fuga}</div>}
                />
            </div>
        );
    }
}
