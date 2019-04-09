
// from package
import React from 'react';

// from source
import Splitter from '../splitter/Splitter.js';

// current css
import './App.css';

export default class App extends React.Component {
    render(){
        return (
            <div className='app' onClick={this.props.clickContainer} onDoubleClick={this.props.clickRequest}>
                <Splitter
                    splitDirection={Splitter.SPLIT_DIRECTION_HORIZONTAL}
                    firstChild={<div>{this.props.context}</div>}
                    secondChild={<div>{this.props.value}</div>}
                    onChangeRatio={this.props.changeRatio}
                    ratio={this.props.ratio}
                />
            </div>
        );
    }
}
