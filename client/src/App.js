import React from 'react';
import {BrowserRouter}     from 'react-router-dom';
import                                        './assets/scss/main.scss';
import Alert from './components/Alert/Alert';
import Nav from './components/Nav/Nav';
import PageConatiner from './components/PageContainer/PageConatiner';
import AlertState from './states/Alert/AlertState';
import UserState from './states/user/UserState';

export default () => {
    return (
        <BrowserRouter>
            <AlertState>
                <UserState>
                    <Alert/>
                    <Nav/>
                    <main className="pages">
                        <div className="wrapper">
                            <PageConatiner/>
                        </div>
                    </main>
                </UserState>
            </AlertState>
        </BrowserRouter>
    )
}