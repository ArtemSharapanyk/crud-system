import { useContext } from "react";
import { useDispatch } from "react-redux";
import { HttpContext } from "../../hooks/useHttp/HttpContext";
import { PULL_USER_PROFILES } from "../../redux/actions/actionTypes";

export default (token) => {
    const {request} = useContext(HttpContext);
    const dispatch  = useDispatch();

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

    return {
        createProfile, getProfiles, deleteProfile, updateProfile
    }
}