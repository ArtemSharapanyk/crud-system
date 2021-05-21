import React from 'react';
import {BrowserRouter}     from 'react-router-dom';
import                                        './assets/scss/main.scss';
import {Alert} from './components/Alert/Alert';
import {Nav} from './components/Nav/Nav';
import {PageContainer} from './components/PageContainer/PageContainer';
import {UseHttp} from './hooks/useHttp/useHttp';
import {AlertState} from './states/Alert/AlertState';
import {DashboardState} from './states/Dashboard/DashboardState';
import {UserState} from './states/User/UserState';

export const App = () => {
    return (
        <BrowserRouter>
            <AlertState>
                <UseHttp>
                    <DashboardState>
                        <UserState>
                            <Alert/>
                            <Nav/>
                            <main className="pages">
                                <div className="wrapper">
                                    <PageContainer/>
                                </div>
                            </main>
                        </UserState>
                    </DashboardState>
                </UseHttp>
            </AlertState>
        </BrowserRouter>
    )
}