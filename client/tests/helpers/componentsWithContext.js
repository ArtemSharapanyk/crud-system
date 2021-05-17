import React from 'react';
import { Provider } from 'react-redux';
import HttpState from '../../src/hooks/useHttp/useHttp';
import AlertState from '../../src/states/Alert/AlertState';
import UserState from '../../src/states/user/UserState';
import {store} from '../../src/redux/store/store';
import Dashboard from '../../src/states/Dashboard/DashboardState'; 


export default (Component, isDashboard = false) => {
    if(!isDashboard){
        return  ( <Provider store={store}>
                    <AlertState>
                        <HttpState>
                            <UserState>
                                <Component/>
                            </UserState>
                        </HttpState>
                    </AlertState>
                   </Provider>
                )
    }else{
        return  ( <Provider store={store}>
                    <AlertState>
                        <HttpState>
                            <Dashboard>
                                <Component/>
                            </Dashboard>
                        </HttpState>
                    </AlertState>
                  </Provider>
                )
    }
};