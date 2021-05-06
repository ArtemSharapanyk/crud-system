import React, { useContext } from 'react'
import { UserContext } from '../../states/userContext';
import Auth from '../../pages/Auth';
import {Switch, Route,Redirect} from 'react-router-dom';
import CreateProfilePage from '../../pages/CreateProfilePage';

export default () => {
    const {isAuth} = useContext(UserContext);

   
    if(false){
        return (
            <Switch>
                <Route path='/user/createProfile'>
                    <CreateProfilePage/>
                </Route>
                <Redirect to='/user/createProfile'/>
            </Switch>
        )
    }else{
        return (
            
                <Switch>
                    <Route path="/auth">
                        <Auth/>
                    </Route>
                    <Redirect to='/auth' />
                </Switch>
        )
    }
};