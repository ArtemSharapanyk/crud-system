import './assets/scss/main.scss';
import 'regenerator-runtime/runtime';
import '../setUpTest';
// base imports
import React                                   from 'react';
import ReactDOM                                from 'react-dom';
import {Provider}                              from 'react-redux';
import App                                     from './App';
import {store}                                 from './redux/store/store';
//redux

let apllication = (
    <Provider store={store} >
        <App/>
    </Provider>
)


ReactDOM.render(apllication, document.getElementById('root'));