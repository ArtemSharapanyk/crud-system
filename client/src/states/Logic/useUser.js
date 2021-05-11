import { useContext } from "react";
import { useDispatch } from "react-redux";
import useAuthHook from "../../hooks/authHook/useAuthHook";
import { HttpContext } from "../../hooks/useHttp/HttpContext";
import { PULL_USER_INFORMATION, PULL_USER_ROLE } from "../../redux/actions/actionTypes";

export default (token, loginFrontend, logoutFrontend) => {
    const dispatch = useDispatch();
    const {request} = useContext(HttpContext);

    const register = async data => {
        const res = await request('http://localhost:5000/auth/reg', 'POST', data);
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

    return {
        register, login, logout,
        getUserData, pullUserRole,
    }
};