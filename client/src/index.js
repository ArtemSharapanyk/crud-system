import 'regenerator-runtime/runtime';
// base imports
import React                                   from 'react';
import ReactDOM                                from 'react-dom';
import {Provider}                              from 'react-redux';
import {App}                                     from './App';
import {store}                                 from './redux/store/store';
//redux

let application = (
    <Provider store={store} >
        <App/>
    </Provider>
);


ReactDOM.render(application, document.getElementById('root'));