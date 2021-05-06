import React from 'react';
import {BrowserRouter}     from 'react-router-dom';
import                                        './assets/scss/main.scss';
import PageConatiner from './components/PageContainer/PageConatiner';
import UserState from './states/user/UserState';

export default () => {
    
    return (
        <BrowserRouter>
            <UserState>
                <main className="pages">
                    <div className="wrapper">
                        <PageConatiner/>
                    </div>
                </main>
            </UserState>
        </BrowserRouter>
    )
}