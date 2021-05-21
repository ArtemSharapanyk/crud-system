import React, { useContext, useEffect } from 'react';
import {Loader} from '../components/Loader/Loader';
import { HttpContext } from '../hooks/useHttp/HttpContext';
import { DashboardContex } from '../states/Context/DashboardContext';

export const Dashboard = () => {
    const {pullDashboardData, usersCount, profilesUpperEighteen, profilesCount} = useContext(DashboardContex);
    const {load} = useContext(HttpContext);

    useEffect(() => {
        pullDashboardData()
    },[]);

    if(load){
        return <Loader/>
    }

    return(
        <section className="page dashboard-section">
            <div className="page__title">
                Dashboard
            </div>
            <ul className="grid dashboard-section__list-of-special-information">
                <li className='dashboard-section__list-item'>
                    <div className="dashboard-section__list-item-property">
                        Count of registered users:
                        <div className="dashboard-section__list-item-value">
                            {usersCount}
                        </div>
                    </div>
                </li>
                <li className='dashboard-section__list-item'>
                    <div className="dashboard-section__list-item-property">
                        Count of users profiles:
                        <div className="dashboard-section__list-item-value">
                            {profilesCount}
                        </div>
                    </div>
                </li>
                <li className='dashboard-section__list-item'>
                    <div className="dashboard-section__list-item-property">
                        Count of profiles with age upper then 18:
                        <div className="dashboard-section__list-item-value">
                            {profilesUpperEighteen}
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    )
};