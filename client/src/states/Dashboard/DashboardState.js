import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../../config';
import { HttpContext } from '../../hooks/useHttp/HttpContext';
import { PULL_DASHBOARD_INFO } from '../../redux/actions/actionTypes';
import { DashboardContex } from '../Context/DashboardContext';

export default ({children}) => {
    const dispatch = useDispatch();
    const {usersCount,profilesCount,profilesUpperEighteen} = useSelector(state => state.Dashboard);

    const {request} = useContext(HttpContext);

    const pullDashboardData = async () => {
        const response = await request(`${url}/dashboard/info`, 'GET');

        if(response.res.ok){
            dispatch({
                type: PULL_DASHBOARD_INFO,
                payload: response.data
            })
        }
    };

    return (
        <DashboardContex.Provider value={{
            pullDashboardData,usersCount, profilesCount,
            profilesUpperEighteen
        }} >
            {children}
        </DashboardContex.Provider>
    )
}