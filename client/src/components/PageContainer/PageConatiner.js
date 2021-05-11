import React, { useContext } from 'react'
import { UserContext } from '../../states/userContext';
import {Switch, Route,Redirect} from 'react-router-dom';
import CreateProfilePage from '../../pages/CreateProfilePage';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import AllProfilesPage from '../../pages/AllProfilesPage';
import UserInfo from '../../pages/UserInfo';
import AllUsers from '../../pages/AllUser';


export default () => {
    const {isAuth,role} = useContext(UserContext);
     
    if(isAuth){
        return (
            <Switch>
                <Route path='/user/createProfile'>
                    <CreateProfilePage/>
                </Route>
                {role === 'ADMIN' ? 
                    <Route path='/user/profiles'>
                        <AllProfilesPage/>
                    </Route>
                :
                    null
                }
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