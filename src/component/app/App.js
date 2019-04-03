
import React from 'react';
import './App.css';

export default class App extends React.Component {
    render(){
        return (
            <div className='app' onClick={this.props.clicker}>{this.props.fuga}</div>
        );
    }
}
