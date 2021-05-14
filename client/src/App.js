import React from 'react';
import {BrowserRouter}     from 'react-router-dom';
import Alert from './components/Alert/Alert';
import Nav from './components/Nav/Nav';
import PageConatiner from './components/PageContainer/PageConatiner';
import UseHttp from './hooks/useHttp/useHttp';
import AlertState from './states/Alert/AlertState';
import DashboardState from './states/Dashboard/DashboardState';
import UserState from './states/User/UserState';

export default () => {
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
                                    <PageConatiner/>
                                </div>
                            </main>
                        </UserState>
                    </DashboardState>
                </UseHttp>
            </AlertState>
        </BrowserRouter>
    )
}