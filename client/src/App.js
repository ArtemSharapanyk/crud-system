import React from 'react';
import {BrowserRouter}     from 'react-router-dom';
import                                        './assets/scss/main.scss';
import Nav from './components/Nav/Nav';
import PageConatiner from './components/PageContainer/PageConatiner';
import UserState from './states/user/UserState';

export default () => {
    
    return (
        <BrowserRouter>
            <UserState>
                <Nav/>
                <main className="pages">
                    <div className="wrapper">
                        <PageConatiner/>
                    </div>
                </main>
            </UserState>
        </BrowserRouter>
    )
}