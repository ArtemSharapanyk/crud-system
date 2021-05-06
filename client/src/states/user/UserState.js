import React from 'react';
import {useSelector} from 'react-redux';
import {UserContext} from '../userContext';

export default ({children}) => {
    const {isAuth, details} = useSelector(state => state.User);
    
    const register = () => {

    };

    const login = () => {

    };

    const logout = () => {

    };

    const getUserData = {

    };

    return (
        <UserContext.Provider value = {{
            isAuth
        }}>
            {children}
        </UserContext.Provider>
    )

    
};