import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { url } from "../../../config";
import { HttpContext } from "../../hooks/useHttp/HttpContext";
import { PULL_USER_PROFILES } from "../../redux/actions/actionTypes";

export default (token) => {
    const {request} = useContext(HttpContext);
    const dispatch  = useDispatch();

    const history = useHistory();

    const createProfile = async data => {
        const response = await request(`${url}/user/createProfile`, 'POST', data, {
            Authorization: `Bearer ${token}`
        });

        if(response.res.ok){
            history.push('/user/profiles');
        }
    };

    const getProfiles = async () => {
        const response = await request(`${url}/user/getProfiles`, 'GET', null, {
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
        const response = await request(`${url}/user/deleteProfile`, 'POST', {id});

        if(response.res.ok){
            getProfiles()
        }
    };

    const updateProfile = async data => {
        const response = await request(`${url}/user/updateProfile`, 'POST', data);

        if(response.res.ok){
            getProfiles()
        }
    };

    return {
        createProfile, getProfiles, deleteProfile, updateProfile
    }
}