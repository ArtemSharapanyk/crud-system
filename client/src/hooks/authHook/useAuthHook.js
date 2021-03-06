import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN, LOG_OUT } from "../../redux/actions/actionTypes";
import { HttpContext } from "../useHttp/HttpContext";
import {url} from '../../../config.js';

let userTokenProperty = 'userToken';


const token = localStorage.getItem(userTokenProperty);

export const useAuthHook = () => {
    const dispatch = useDispatch();
    const {request} = useContext(HttpContext);

    const loginFrontendSession = token => {
        dispatch({
            type: LOGIN,
            payload: token
        });

        const storageValue = {
            token
        };

        localStorage.setItem(userTokenProperty, JSON.stringify(storageValue));
    };

    const refreshToken = async (token) => {
        const tokenObject = JSON.parse(token);
        const response = await request(`${url}/user/refreshToken`, 'GET', null, {
            Authorization: `Bearer ${tokenObject.token}`
        });

        if(response.res.ok){
            loginFrontendSession(response.data.token);
        }
    };

    const logoutFrontendSession = () => {
        localStorage.removeItem(userTokenProperty);

        dispatch({
            type: LOG_OUT
        });
    };

    useEffect(() => {
        if(token){
            refreshToken(token);
        }
    },[])

    return {
        loginFrontendSession, logoutFrontendSession
    }
}