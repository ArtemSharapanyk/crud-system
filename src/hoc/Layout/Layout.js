import React, { Component } from 'react';

export default class Layout extends Component{
    render(){
        return (
            <div className="app">
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}