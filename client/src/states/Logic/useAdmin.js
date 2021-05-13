import { useContext } from "react";
import { useDispatch } from "react-redux";
import { HttpContext } from "../../hooks/useHttp/HttpContext";
import { PULL_ALL_USERS } from "../../redux/actions/actionTypes";

export default (token, logoutFrontend) => {
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

    const deleteUser = async id => {
        const response = await request('http://localhost:5000/user/deleteUser', 'POST', {id}, {
            Authorization: `Bearer ${token}`
        });

        const {idOfDeletedUser,idOfActionCreator} = response.data;
    
        if(response.res.ok){
            if(idOfDeletedUser !== idOfActionCreator){
                getAllUsers();
            }else{
                logoutFrontend()
            }
        }
    };

    const updateUserInfoAdmin = async (id, data) => {
        const response = await request('http://localhost:5000/user/updateUser', 'POST', {id, data});

        if(response.res.ok){
            getAllUsers();
        }
    };
 
    return {
        getAllUsers, deleteUser, updateUserInfoAdmin
    }

}