import {createStore,applyMiddleware,compose}      from 'redux';
import thunk                                      from 'redux-thunk';
import {rootReducer}                                from '../reducers/rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export let store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
