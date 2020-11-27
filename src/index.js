// base imports
import React                                   from 'react';
import ReactDOM                                from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider}                              from 'react-redux';
import asyncDispatchFunc                       from 'redux-thunk';
import rootReducer                             from './redux/reducers/rootReducer';
import App                                     from './App';
//redux-dev-tool
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

    }) : compose;


let store = createStore(rootReducer,composeEnhancers(applyMiddleware(asyncDispatchFunc)));


let apllication = (
    <Provider store={store} >
        <App/>
    </Provider>
)


ReactDOM.render(apllication, document.getElementById('root'));