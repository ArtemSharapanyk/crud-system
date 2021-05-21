import React, { useContext } from 'react';
import { UserContext } from '../../states/Context/userContext';
import {Switch, Route,Redirect} from 'react-router-dom';
import {CreateProfilePage} from '../../pages/CreateProfilePage';
import {Register} from '../../pages/Register';
import {Login} from '../../pages/Login';
import {AllProfilesPage} from '../../pages/AllProfilesPage';
import {UserInfo} from '../../pages/UserInfo';
import {AllUsers} from '../../pages/AllUsers';
import {Dashboard} from '../../pages/Dashboard';



export const PageContainer = () => {
    const {isAuth,role} = useContext(UserContext);
     
    if(isAuth){
        return (
            <Switch>
                <Route path='/user/createProfile'>
                    <CreateProfilePage/>
                </Route>
                <Route path='/user/userInfo'>
                    <UserInfo/>
                </Route>
                {role === 'ADMIN' ? 
                    <Route path='/users/allUsers'>
                        <AllUsers/>
                    </Route>
                :
                    null
                }

                {role === 'ADMIN' ?
                    <Route path='/dashboard'>
                        <Dashboard/>
                    </Route>
                    :
                        null
                }
                <Route path='/user/profiles'>
                    <AllProfilesPage/>
                </Route>
                <Redirect to='/user/createProfile'/>
            </Switch>
        )
    }else{
        return (
            
                <Switch>
                    <Route path="/auth/reg">
                        <Register/>
                    </Route>
                    <Route path="/auth/log">
                        <Login/>
                    </Route>
                    <Redirect to='/auth/reg' />
                </Switch>
        )
    }
};