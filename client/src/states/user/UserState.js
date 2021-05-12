import React, { useContext, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useAuthHook from '../../hooks/authHook/useAuthHook';
import { HttpContext } from '../../hooks/useHttp/HttpContext';
import {UserContext} from '../Context/userContext';
import useAdmin from '../Logic/useAdmin';
import useProfile from '../Logic/useProfile';
import useUser from '../Logic/useUser';

export default ({children}) => {
    const {isAuth, details, token, role, allUsersArray, profiles} = useSelector(state => state.User);

    const {errorMessage} = useContext(HttpContext);

    //user logic
    const {loginFrontendSession, logoutFrontendSession} = useAuthHook();

    const {register, login, logout, getUserData, pullUserRole, updateUserInfo } = useUser(token,loginFrontendSession, logoutFrontendSession);

    const userInfo = details;
    

    //profile logic
    const {createProfile,getProfiles,deleteProfile,updateProfile} = useProfile(token);

    //admin logic
    const {getAllUsers,deleteUser,updateUserInfoAdmin} = useAdmin();



    //take role of user from server and set to redux state
    useEffect(() => {
        if(token){
            pullUserRole();
        }
    }, [token]);


    //end session when token is not avaible 
    useEffect(() => {
        if(errorMessage){
            if(errorMessage === 'Token verify is bad'){
                logoutFrontendSession();
            }
        }
    }, [errorMessage]);




    return (
        <UserContext.Provider value = {{
            isAuth,register, login, logout,
            getUserData,userInfo, role,
            getAllUsers, allUsersArray,createProfile,
            getProfiles, profiles,deleteProfile,
            updateProfile,updateUserInfo,deleteUser,
            updateUserInfoAdmin
        }}>
            {children}
        </UserContext.Provider>
    )

    
};