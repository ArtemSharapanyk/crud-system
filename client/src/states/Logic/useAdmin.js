import { useContext } from "react";
import { useDispatch } from "react-redux";
import { HttpContext } from "../../hooks/useHttp/HttpContext";
import { PULL_ALL_USERS } from "../../redux/actions/actionTypes";

export default () => {
    const {request} = useContext(HttpContext);
    const dispatch  = useDispatch();

    const getAllUsers = async () => {
        const response = await request('http://localhost:5000/user/getAllUsers', 'GET', null);

        if(response.res.ok){
            dispatch({
                type: PULL_ALL_USERS, 
                payload: response.data.users
            });
        }
    };

    return {
        getAllUsers
    }

}