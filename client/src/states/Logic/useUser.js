import { useContext } from "react";
import { useDispatch } from "react-redux";
import { HttpContext } from "../../hooks/useHttp/HttpContext";
import { PULL_USER_INFORMATION, PULL_USER_ROLE } from "../../redux/actions/actionTypes";
import {useHistory} from 'react-router-dom';

export default (token, loginFrontend, logoutFrontend) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const {request} = useContext(HttpContext);

    const register = async data => {
        const res = await request('http://localhost:5000/auth/reg', 'POST', data);
        
        if(res.res.ok){
            history.push('/auth/log');
        }
    };

    const login = async data => {
        const dataFromServer = await request('http://localhost:5000/auth/log', 'POST', data);
        
        if(dataFromServer.res.ok){
            loginFrontend(dataFromServer.data.token)
        }
    };

    const logout = () => {
        logoutFrontend()
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

    const updateUserInfo = async data => {
        const response = await request('http://localhost:5000/user/updateUserData', 'POST', data, {
            Authorization: `Bearer ${token}`
        });

        if(response.res.ok){
            getUserData()
        }
    };

    return {
        register, login, logout,
        getUserData, pullUserRole,updateUserInfo
    }
};