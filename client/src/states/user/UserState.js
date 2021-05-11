import React, { useContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useAuthHook from '../../hooks/authHook/useAuthHook';
import useHttp from '../../hooks/useHttp/useHttp';
import { LOGIN, PULL_ALL_USERS, PULL_USER_INFORMATION, PULL_USER_PROFILES, PULL_USER_ROLE } from '../../redux/actions/actionTypes';
import { AlertContext } from '../AlertContext';
import {UserContext} from '../userContext';

export default ({children}) => {
    const dispatch = useDispatch();

    //data from redux state
    const {isAuth, details, token, role, allUsersArray, profiles} = useSelector(state => state.User);
    //end data from state

    const {toggleAlert} = useContext(AlertContext);
    const {request, errorMessage, successesMessage,cleanMessages, load} = useHttp();

    const {loginFrontendSession, logoutFrontendSession} = useAuthHook();


    //helper to message switch(alert)
    const switchMessage = (message,cal, type = 'error') => {
        toggleAlert(2000, message, type);
        cal();
    };

    //message listener, show alertcafter some actions

    useEffect(() => {
        if(successesMessage){
            switchMessage(successesMessage, cleanMessages, 'success')
        }
    }, [successesMessage]);


    useEffect(() => {
        if(errorMessage){
            if(errorMessage === 'Token verify is bad'){
                logoutFrontendSession();
            }
            switchMessage(errorMessage, cleanMessages);
        }
    }, [errorMessage]);

    //user logic

    const userInfo = details;
    
    const register = async data => {
        const res = await request('http://localhost:5000/auth/reg', 'POST', data);
    };

    const login = async data => {
        const dataFromServer = await request('http://localhost:5000/auth/log', 'POST', data);
        
        if(dataFromServer.res.ok){
            loginFrontendSession(dataFromServer.data.token)
        }
    };

    const logout = () => {
        logoutFrontendSession()
    };

    const getUserData = async () => {
        const response = await request('http://localhost:5000/user/getInfo', 'GET', null, {
            Authorization: `Bearer ${token}`,
        });

        if(response.res.ok){
            dispatch({
                type: PULL_USER_INFORMATION,
                payload: response.data
            });
        }
    };

    const pullUserRole = async () => {
        const response = await request('http://localhost:5000/user/role', 'GET', null, {
            Authorization: `Bearer ${token}`
        });

        if(response.res.ok){
            dispatch({
                type: PULL_USER_ROLE,
                payload: response.data.role
            })
        }
    };

    const createProfile = async data => {
        const response = await request('http://localhost:5000/user/createProfile', 'POST', data, {
            Authorization: `Bearer ${token}`
        });
    };


    const getProfiles = async () => {
        const response = await request('http://localhost:5000/user/getProfiles', 'GET', null, {
            Authorization: `Bearer ${token}`
        });

        if(response.res.ok){
            dispatch({
                type:PULL_USER_PROFILES,
                payload: response.data.profiles
            })
        }
    };

    const deleteProfile = async id => {
        const response = await request('http://localhost:5000/user/deleteProfile', 'POST', {id});

        if(response.res.ok){
            getProfiles()
        }
    };

    const updateProfile = async data => {
        const response = await request('http://localhost:5000/user/updateProfile', 'POST', data);

        if(response.res.ok){
            getProfiles()
        }
    };



    //admin logic
    const getAllUsers = async () => {
        const response = await request('http://localhost:5000/user/getAllUsers', 'GET', null);

        if(response.res.ok){
            dispatch({
                type: PULL_ALL_USERS, 
                payload: response.data.users
            });
        }
    };



    //take role of user from server and set to redux state
    useEffect(() => {
        if(token){
            pullUserRole();
        }
    }, [token]);



    return (
        <UserContext.Provider value = {{
            isAuth,register, login, logout,
            getUserData, load,userInfo, role,
            getAllUsers, allUsersArray,createProfile,
            getProfiles, profiles,deleteProfile,
            updateProfile
        }}>
            {children}
        </UserContext.Provider>
    )

    
};