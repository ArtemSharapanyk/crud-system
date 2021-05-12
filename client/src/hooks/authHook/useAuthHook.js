import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN, LOG_OUT } from "../../redux/actions/actionTypes";

let userTokenProperty = 'userToken';
const token = localStorage.getItem(userTokenProperty);

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(token)
        if(token){
            dispatch({
                type: LOGIN,
                payload: JSON.parse(token).token
            })  
        }
    },[])

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

    const logoutFrontendSession = () => {
        localStorage.removeItem(userTokenProperty);

        dispatch({
            type: LOG_OUT
        });
    };

    return {
        loginFrontendSession, logoutFrontendSession
    }
}